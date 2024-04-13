const asyncHandler = require("express-async-handler");
const MovieTiming = require("../models/timingModel");
const Seats = require("../models/SeatsModel");

// Create movie timing
const createMovieTiming = asyncHandler(async (req, res) => {
  const { movie, time } = req.body;
  try {
    const existingMovie = await MovieTiming.findOne({
      movie: movie,
      time: time,
    });

    if (!existingMovie) {
      const existingSeat = await Seats.findOne({
        movie: movie,
        screeningTime: time,
      });

      if (!existingSeat) {
        const movieTiming = await MovieTiming.create(req.body);

        const totalSeats = 50;
        const seatsForTime = Array.from({ length: totalSeats }, (_, index) => ({
          id: index + 1,
          isBooked: false,
          screeningTime: time,
          movie: movie,
        }));

        await Seats.insertMany(seatsForTime);

        res
          .status(200)
          .json({
            success: true,
            message: "Screening time added successfully",
          });
      }
    } else {
      res.status(201).json({ message: "Movie with this already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get all movie timing
const getAllMovieTiming = asyncHandler(async (req, res) => {
  try {
    const movieTiming = await MovieTiming.find();
    res.json(movieTiming);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get all movie timing
const getTiming = asyncHandler(async (req, res) => {
  try {
    const movieTiming = await MovieTiming.findById(req.params.id);
    res.json(movieTiming);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Delete movie timing
const deleteMovieTiming = asyncHandler(async (req, res) => {
  const { id, movie, time } = req.params;

  try {
    const movieTiming = await MovieTiming.findByIdAndDelete(id);
    if (!movieTiming) {
      return res.status(404).json({ message: "Movie Timing Not found" });
    }
    await Seats.deleteMany({ movie : movie, screeningTime: time });
    res.json({ message: "Movie Timing and associated seats deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = {
  createMovieTiming,
  getAllMovieTiming,
  deleteMovieTiming,
  getTiming
};

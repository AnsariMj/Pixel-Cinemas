const asyncHandler = require("express-async-handler");
const Seats = require("../models/SeatsModel");
const User = require("./../models/user");

//get status

const getStatus = asyncHandler(async (req, res) => {
  try {
    const { movie, time } = req.params;
    const bookedSeats = await Seats.find({
      movie: movie,
      screeningTime: time,
      isBooked: true,
    });
    res.json(bookedSeats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching booked seats" });
  }
});

//get all seats

const getAllSeats = asyncHandler(async (req, res) => {
  try {
    const seats = await Seats.find();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching seat status" });
  }
});

//update seats status

const updateSeatStatus = asyncHandler(async (req, res) => {
  // Extract necessary data from the request
  const { selectedSeats, price } = req.body;
  const { movie, time } = req.params;
  try {
    // Validate that selectedSeats is provided and is an array
    if (!selectedSeats || !Array.isArray(selectedSeats)) {
      return res.status(400).json({ error: "Invalid selectedSeats data" });
    }

    const user = await User.findById(req.user._id);

    if (user)
       user.details.push({
          movie: movie,
          screeningTime: time,
          id: { $in: selectedSeats },
          price : price,
          date : new Date()
      });

      await user.save();

    // Update the status of selected seats to booked
    await Seats.updateMany(
      { id: { $in: selectedSeats }, movie: movie, screeningTime: time },
      { isBooked: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error during booking:", error);
    res.status(500).json({ error: "Error during booking" });
  }
});

//get seats of particular movie of specific screen time

const getSpecificSeats = asyncHandler(async (req, res) => {
  try {
    const { movie, time } = req.params;
    const seats = await Seats.find({ movie: movie, screeningTime: time });
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getAllSeats,
  getStatus,
  updateSeatStatus,
  getSpecificSeats,
};

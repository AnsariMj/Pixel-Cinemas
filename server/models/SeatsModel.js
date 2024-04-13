const mongoose = require("mongoose");

const seatsSchema = new mongoose.Schema({
  id: Number,
  isBooked: Boolean,
  screeningTime: String,
  movie: String,
});

const Seats = mongoose.model("Seats", seatsSchema);

module.exports = Seats;

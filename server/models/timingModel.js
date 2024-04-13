const mongoose = require("mongoose");

const timingSchema = new mongoose.Schema({
    movie : String,
    time : String,
    seats : Object,
    sold : Object,
    available : Object,
});

const Timing = mongoose.model("Timing", timingSchema);

module.exports = Timing;

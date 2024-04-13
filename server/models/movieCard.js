const mongoose = require("mongoose");

const movieCardSchema = new mongoose.Schema({
   data: {
      title: {
         type: String,
         required: true
      },
      releaseDate: {
         type: String,
         required: true
      },
      cast: {
         type: String,
         required: true
      },
      director: {
         type: String,
         required: true
      },
      duration: {
         type: String,
       },
      genre: {
         type: String,
         required: true
      },
      format: {
         type: String,
         required: true
      },
      description: {
         type: String,
         required: true
      },
      link: {
         type: String,
         required: true
      },
      type:{
         type: String,
         required: true
      },
      startTime : String,
      endTime : String,
      banner : String,
   },
   photo: [],

});

const MovieCard = mongoose.model("MovieCard", movieCardSchema);

module.exports = MovieCard;

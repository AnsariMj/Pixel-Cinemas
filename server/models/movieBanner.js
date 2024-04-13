const mongoose = require("mongoose");

const movieBannerSchema = new mongoose.Schema({
  bannerTitle: {
    type: String,
    unique: true
  },
  bannerImage: {
    type: String
  }

});

const MovieBanner = mongoose.model("MovieBanner", movieBannerSchema);

module.exports = MovieBanner;

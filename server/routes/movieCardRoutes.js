const express = require("express");
const {
  BinarySearch,
  QuickSort,
  createMovieCard,
  updateMovieCard,
  deleteMovieCard,
  getAllMovieCard,
  getMovieCard,
  Movie,
} = require("../controllers/movieCardCtrl");

const router = express.Router();
const { upload } = require("../utils/multer");
const { isAuthenticated, isAdmin } = require("../middleware/authorization");




router.get('/searchMovie', BinarySearch)
router.get('/searchGenre', QuickSort)

router.post(
  "/add-movie",
  upload.single("photo"),
  isAuthenticated,
  isAdmin,
  createMovieCard
);

router.put("/update-movie/:id", updateMovieCard);
router.delete("/delete-movie/:id", isAuthenticated, isAdmin, deleteMovieCard);
router.get("/get-all-movie", getAllMovieCard);
router.get("/get-movie/:id", getMovieCard);
router.get("/search", Movie);

module.exports = router;

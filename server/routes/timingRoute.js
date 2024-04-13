const express = require("express");
const { createMovieTiming, getAllMovieTiming, deleteMovieTiming, getTiming } = require("../controllers/TimingCtrl");
const {isAuthenticated, isAdmin} = require("../middleware/authorization");
const router = express.Router();

router.post("/create-timing", createMovieTiming);
router.delete("/delete-timing/:movie/:time/:id",isAuthenticated,isAdmin, deleteMovieTiming);
router.get("/get-timing", getAllMovieTiming);
router.get("/get-timing/:id", isAuthenticated, getTiming);

module.exports = router;
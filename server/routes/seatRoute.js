const express = require("express");
const { getAllSeats, getStatus, updateSeatStatus, getSpecificSeats } = require("../controllers/seatCtrl");
const{ isAuthenticated} = require("../middleware/authorization");
const router = express.Router();

router.put("/update-seats-status/:movie/:time",isAuthenticated,updateSeatStatus );
router.get("/get-status/:movie/:time", getStatus);
router.get("/get-seats", getAllSeats);
router.get("/specific-seats/:movie/:time", getSpecificSeats);

module.exports = router;

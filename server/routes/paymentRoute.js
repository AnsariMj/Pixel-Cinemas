const express = require("express");
const router = express.Router();



const { khaltiPayment } = require("./../controllers/payment");
router.post("/khalti", khaltiPayment);

module.exports = router;

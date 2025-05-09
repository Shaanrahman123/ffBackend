const express = require("express");
const router = express.Router();
const passengerDetailsController = require("../controllers/passengerDetails.controller");

// Save passenger and flight details
router.post("/", passengerDetailsController.savePassengerDetails);

// Get all passenger details (admin only)
router.get("/", passengerDetailsController.getAllPassengerDetails);

// Get passenger details by booking reference
// router.get(
//   "/:bookingReference",
//   passengerDetailsController.getPassengerDetailsByReference
// );

module.exports = router;

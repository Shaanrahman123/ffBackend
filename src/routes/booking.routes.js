const express = require("express");
const bookingController = require("../controllers/booking.controller");

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

//base url
//   /api/booking
router.post("/create", authMiddleware, bookingController.createBooking);

router.get("/single/:id", authMiddleware, bookingController.getSingleBooking);
router.get("/history/user", authMiddleware, bookingController.getUserBookingHistory);

module.exports = router;

const mongoose = require("mongoose");

const flightBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pnr:String,
  },
  {
    timestamps: true,
  }
);

const FlightBooking = mongoose.model("flightbooking", flightBookingSchema);

module.exports = FlightBooking;

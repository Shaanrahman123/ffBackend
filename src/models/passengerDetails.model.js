const mongoose = require("mongoose");

const passengerDetailsSchema = new mongoose.Schema({
  bookingReference: { type: String },
  passengers: [
    {
      type: { type: String, enum: ["ADT", "CHD", "INF"], required: true },
      title: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      gender: { type: String, enum: ["Male", "Female"], required: true },
      dob: { type: Date, required: true },
      passportNumber: { type: String, required: true },
      passportExpiry: { type: Date, required: true },
      passportIssuingCountry: {
        countryCode: { type: String, required: true },
        countryName: { type: String, required: true },
      },
    },
  ],
  contactInfo: {
    email: { type: String, required: true },
    phoneNumber: { type: String },
  },
  flights: {
    onward: {
      carrier: { type: String, required: true },
      flightNumber: { type: String, required: true },
      departure: {
        location: { type: String, required: true },
        terminal: { type: String },
        date: { type: Date, required: true },
        time: { type: String, required: true },
      },
      arrival: {
        location: { type: String, required: true },
        terminal: { type: String },
        date: { type: Date, required: true },
        time: { type: String, required: true },
      },
      duration: { type: String },
      distance: { type: Number },
    },
    return: {
      carrier: { type: String },
      flightNumber: { type: String },
      departure: {
        location: { type: String },
        terminal: { type: String },
        date: { type: Date },
        time: { type: String },
      },
      arrival: {
        location: { type: String },
        terminal: { type: String },
        date: { type: Date },
        time: { type: String },
      },
      duration: { type: String },
      distance: { type: Number },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PassengerDetails", passengerDetailsSchema);

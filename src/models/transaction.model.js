const mongoose = require("mongoose");

// Assuming the User model is imported if needed
// const User = require("./path/to/User");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure "User" model is correctly defined and imported
    },
    merchantTransactionId: String,
    reservationId: String,
    amount: String,
    currency: String,
    status: {
      type: String,
      enum: ["pending", "success", "cancel", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema); 

module.exports = Transaction;

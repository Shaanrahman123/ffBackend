const { default: axios } = require("axios");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const { api } = require("../common/const");
const Buffer = require("buffer").Buffer;

exports.createTransaction = async (req, res) => {
  try {
    const userId = req?.user?.id || "6789f4438c60265589a9b470"; // Assuming the JWT contains the user ID in the `_id` field
    // console.log(req.user)

    const { amount, reservationId } = req.body;

    const merchantTransactionId = "FFT" + Date.now();
    const currency = "AUD";

    const data = {
      merchantTransactionId,
      amount,
      currency: currency,
      successUrl: `http://localhost:5173/flight/reviewbooking/ValidatingPayment/${reservationId}`,
      cancelUrl: `http://localhost:8000/api/transaction/cancel/${reservationId}`,
      errorUrl: `http://localhost:5173/ticket/failed/${reservationId}`,
      // successUrl: `https://firstflightfrontendren.vercel.app/flight/reviewbooking/ValidatingPayment/${reservationId}`,
      // cancelUrl: `http://localhost:8000/api/transaction/cancel/${reservationId}`,
      // errorUrl: `https://firstflightfrontendren.vercel.app/ticket/failed/${reservationId}`,
    };

    // Prepare basic auth header value
    const username = "First_Flight_API_Dev";
    const password = "M36W7RNCuOL^i9pmUZ2PlVAlLoiHM!";
    const authString = `${username}:${password}`; // Combine username and password
    const authHeader = "Basic " + Buffer.from(authString).toString("base64"); // Base64 encode the string

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
        "X-Signature":
          "UG2ohD9zXaC8401/fKW2PpnW3CKtIw6VlagvDoxbycfl0OnSkdnbohKtmU4vHskrio6+OaxSFo7ubzrVLf/aZg==",
      },
    };
    // console.log(api.paymentGateWayUrl)
    // console.log(config)

    const response = await axios.post(`${api.paymentGateWayUrl}`, data, config);

    // console.log(response);

    // return;

    // const existingUser = await User.findById({ userId });

    // Proceed to create a new Transaction
    const newTransaction = new Transaction({
      userId,
      merchantTransactionId,
      reservationId,
      amount,
      currency,
    });

    // Save the new Transaction to the database
    const savedTransaction = await newTransaction.save();

    // console.log(response.data)
    // return;

    res.status(201).send({
      statusCode: 201,
      message: "create transaction successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.successTransaction = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const transaction = await Transaction.findOneAndUpdate(
      { reservationId: reservationId },
      { status: "success", updatedAt: new Date() },
      { new: true } // This option returns the updated document
    );

    if (!transaction) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Transaction not found" });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.failedTransaction = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const transaction = await Transaction.findOneAndUpdate(
      { reservationId: reservationId },
      { status: "cancel", updatedAt: new Date() },
      { new: true } // This option returns the updated document
    );

    if (!transaction) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Transaction not found" });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.errorTransaction = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const transaction = await Transaction.findOneAndUpdate(
      { reservationId: reservationId },
      { status: "failed", updatedAt: new Date() },
      { new: true } // This option returns the updated document
    );

    if (!transaction) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Transaction not found" });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

require("dotenv").config();
const Enquiry = require("../models/contact.model");
const User = require("../models/user.model");

// Add a new testimonial
const enquiry = async (req, res) => {
  const { firstName, lastName, phone, email, message, date } = req.body;

  const userId = req.user.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const newEnquiry = new Enquiry({
      firstName,
      lastName,
      phone,
      message,
      date,
      email,
    });

    const enquiry = await newEnquiry.save();

    res.status(200).json({
      status: 200,
      message: "enquiry sent successfully",
      enquiry,
    });
  } catch (err) {
    console.error("Error adding enquiry:", err.message);
    res.status(500).send("Server error");
  }
};

// Get all testimonials
const getAllEnquiry = async (req, res) => {
  try {
    const sorted = { createdAt: -1 };
    const enquiry = await Enquiry.find().sort(sorted);
    if (enquiry.length === 0) {
      return res.status(404).json({ message: "No enquiry found" });
    }
    res.status(200).json({
      status: 200,
      message: "All enquiries",
      enquiry,
    });
  } catch (err) {
    console.error("Error retrieving testimonials:", err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { enquiry, getAllEnquiry };

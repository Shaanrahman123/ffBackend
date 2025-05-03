const Testimonial = require("../models/testimonial.model");
const User = require("../models/user.model");

// Add a new testimonial
const addTestimonial = async (req, res) => {
  const { name, date, email, message } = req.body;

  try {
    const newTestimonial = new Testimonial({
      name,
      message,
      date,
      email,
    });

    const testimonial = await newTestimonial.save();

    res.status(200).json({
      status: 200,
      message: "Testimonial added successfully",
      testimonial,
    });
  } catch (err) {
    console.error("Error adding testimonial:", err.message);
    res.status(500).send("Server error");
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
   const sorted = { createdAt: -1 };
    const testimonials = await Testimonial.find().sort(sorted);
    if (testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials found" });
    }
    res.status(200).json({
      status: 200,
      message: "All testimonials",
      testimonials,
    });
  } catch (err) {
    console.error("Error retrieving testimonials:", err.message);
    res.status(500).send("Server error");
  }
};

//Delete a testimonial
const deleteTestimonial = async (req, res) => {
  const testimonialId = req.params.id;
  const userId = req.user.id;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const testimonial = await Testimonial.findByIdAndDelete(testimonialId);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Testimonial deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting testimonial:", err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { addTestimonial, getAllTestimonials, deleteTestimonial };

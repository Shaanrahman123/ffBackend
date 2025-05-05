const Testimonial = require("../models/testimonial.model");
const User = require("../models/user.model");

// Add a new testimonial
const addTestimonial = async (req, res) => {
  const { name, email, message } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newTestimonial = new Testimonial({
      name,
      email,
      message,
      date: new Date(),
      status: "pending",
    });

    const testimonial = await newTestimonial.save();

    res.status(200).json({
      status: 200,
      message: "Testimonial submitted and pending approval",
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
    const { status } = req.query;
    const filter = status ? { status } : { status: "approved" }; // default to approved
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

    if (testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    res.status(200).json({
      status: 200,
      message: "Testimonials retrieved",
      testimonials,
    });
  } catch (err) {
    console.error("Error retrieving testimonials:", err.message);
    res.status(500).send("Server error");
  }
};
const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {}; // default to approved
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

    if (testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    res.status(200).json({
      status: 200,
      message: "Testimonials retrieved",
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
  // const userId = req.user.id;

  try {
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

const updateTestimonialStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "approved" or "rejected"
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      status: 200,
      message: `Testimonial ${status} successfully`,
      testimonial,
    });
  } catch (err) {
    console.error("Error updating status:", err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  addTestimonial,
  getAllTestimonials,
  getAllTestimonialsAdmin,
  deleteTestimonial,
  updateTestimonialStatus,
};

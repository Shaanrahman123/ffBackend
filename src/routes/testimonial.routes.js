const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addTestimonial,
  getAllTestimonials,
  getAllTestimonialsAdmin,
  deleteTestimonial,
  updateTestimonialStatus,
} = require("../controllers/testimonial.controller");

router.post("/", authMiddleware, addTestimonial);

router.get("/", getAllTestimonials);
router.get("/adminAll", getAllTestimonialsAdmin);

router.delete("/:id", authMiddleware, deleteTestimonial);
router.put("/:id/status", authMiddleware, updateTestimonialStatus); // admin only

module.exports = router;

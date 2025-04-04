const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addTestimonial,
  getAllTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

router.post("/", addTestimonial);

router.get("/", getAllTestimonials);

//router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;

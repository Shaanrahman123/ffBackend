const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { enquiry, getAllEnquiry } = require("../controllers/contact.controller");

router.post("/", authMiddleware, enquiry);

router.get("/", getAllEnquiry);

module.exports = router;

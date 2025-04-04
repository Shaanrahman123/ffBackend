

const express = require('express');
const userController = require('../controllers/user.controller');

const {authMiddleware, isAdminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();



//base url
//   /api/users
router.post("/registration",  userController.userRegistration);
router.post("/login", userController.userLogin);
router.post("/verifyotp", userController.verifyOtp);

router.get("/profile", authMiddleware, userController.getUserProfile);








module.exports = router;

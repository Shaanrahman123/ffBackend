

const express = require('express');
const bookingController = require('../controllers/booking.controller');
const staticDataController = require('../controllers/staicData.controller');
const adminController = require('../controllers/admin.controller');

const {authMiddleware, isAdminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();



//base url
//   /api/admin

router.get("/alluser/booking",authMiddleware,isAdminMiddleware, bookingController.getAllBookings);

router.put("/update/markup/discount/:id" ,authMiddleware, isAdminMiddleware, staticDataController.updateMarkUpAndDiscount)

router.get("/dashboard/counts" , authMiddleware, isAdminMiddleware, bookingController.getAllCountBookingandUsers);


router.get("/alluser/list", authMiddleware, isAdminMiddleware, adminController.getAllUserList);


module.exports = router;

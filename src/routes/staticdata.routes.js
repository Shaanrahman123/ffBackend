

const express = require('express');
const staticDataController = require('../controllers/staicData.controller');

const router = express.Router();


//base url
//   /api/staticdata


router.get("/airlinelist",  staticDataController.getAirlineDetails);
router.get("/airportlist", staticDataController.getAirportListDevelopment);
//for production 
// router.get("/airportlist", staticDataController.getAirportListProduction);
router.get("/airportlist/all", staticDataController.getAllAirportList);
router.get("/markup/discount", staticDataController.getMarkUpAndDiscount);

module.exports = router;



const express = require('express');
const flightController = require('../controllers/flight.controller');


const router = express.Router();


//base url
//   /api/flight


router.get("/oauthtoken",  flightController.oAuthToken);
router.post("/searchflight/oneway", flightController.searchFlightOneWay);
router.post("/searchflight/return", flightController.searchFlightReturn);
router.post("/price", flightController.priceFlight);
router.get("/initiateworkbench", flightController.initiateWorkBench);
router.post("/addoffer", flightController.addOffer);
router.post("/addtraveler", flightController.addTraveler);
router.post("/commitreservation",  flightController.commitReservation)
router.get("/retrievepnr", flightController.retrievePnr);



module.exports = router;

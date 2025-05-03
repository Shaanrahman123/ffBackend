const express = require("express");
const router = express.Router();

const {
  addTopRouteFlight,
  getTopRoutes,
  deleteTopRoute,
} = require("../controllers/topFlightRoute.controller");

router.post("/", addTopRouteFlight);
router.get("/", getTopRoutes);
router.delete("/:id", deleteTopRoute);

module.exports = router;

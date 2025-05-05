const TopRoute = require("../models/topFlightRoute.model");

// Add top route flights
const addTopRouteFlight = async (req, res) => {
  const { tripData } = req.body;
  // console.log(tripData);
  try {
    if (!Array.isArray(tripData)) {
      return res.status(400).json({ message: "tripData must be an array" });
    }

    const newTopRoute = new TopRoute({ tripData });
    const saved = await newTopRoute.save();

    res.status(200).json({
      status: 200,
      message: "Top route flights added successfully",
      topRoute: saved,
    });
  } catch (error) {
    console.error("Error adding top route flights:", error.message);
    res.status(500).send("Server error");
  }
};

// Get all top route flights
const getTopRoutes = async (req, res) => {
  try {
    const routes = await TopRoute.find().sort({ createdAt: -1 });

    if (routes.length === 0) {
      return res.status(404).json({ message: "No top route flights found" });
    }

    res.status(200).json({
      status: 200,
      message: "All top route flights",
      routes,
    });
  } catch (error) {
    console.error("Error retrieving top route flights:", error.message);
    res.status(500).send("Server error");
  }
};

// Delete by document ID
const deleteTopRoute = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await TopRoute.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Top route not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Top route deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting top route:", error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { addTopRouteFlight, getTopRoutes, deleteTopRoute };

const mongoose = require("mongoose");

const flighttopRouteSchema = new mongoose.Schema({
  type: { type: String, required: true }, // domestic or international
  from: { type: Object, required: true },
  to: { type: Object, required: true },
  icon: { type: String, default: "PlaneTakeoff" },
});

const topRouteSchema = new mongoose.Schema(
  {
    tripData: [flighttopRouteSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopRoute", topRouteSchema);

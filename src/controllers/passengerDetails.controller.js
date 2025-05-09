const PassengerDetails = require("../models/passengerDetails.model");
// const { v4: uuidv4 } = require("uuid");

// Save passenger and flight details
exports.savePassengerDetails = async (req, res) => {
  try {
    const { passengers, contactInfo, selectedFlight } = req.body;

    if (!passengers || !contactInfo || !selectedFlight) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // const bookingReference = uuidv4();

    const passengerDetails = new PassengerDetails({
      //   bookingReference,
      passengers,
      contactInfo,
      flights: {
        onward: {
          carrier: selectedFlight.Onward.flights[0].carrier,
          flightNumber: selectedFlight.Onward.flights[0].number,
          departure: {
            location: selectedFlight.Onward.flights[0].Departure.location,
            terminal: selectedFlight.Onward.flights[0].Departure.terminal,
            date: selectedFlight.Onward.flights[0].Departure.date,
            time: selectedFlight.Onward.flights[0].Departure.time,
          },
          arrival: {
            location: selectedFlight.Onward.flights[0].Arrival.location,
            terminal: selectedFlight.Onward.flights[0].Arrival.terminal,
            date: selectedFlight.Onward.flights[0].Arrival.date,
            time: selectedFlight.Onward.flights[0].Arrival.time,
          },
          duration: selectedFlight.Onward.flights[0].duration,
          distance: selectedFlight.Onward.flights[0].distance,
        },
        return: selectedFlight.Return
          ? {
              carrier: selectedFlight.Return.flights[0].carrier,
              flightNumber: selectedFlight.Return.flights[0].number,
              departure: {
                location: selectedFlight.Return.flights[0].Departure.location,
                terminal: selectedFlight.Return.flights[0].Departure.terminal,
                date: selectedFlight.Return.flights[0].Departure.date,
                time: selectedFlight.Return.flights[0].Departure.time,
              },
              arrival: {
                location: selectedFlight.Return.flights[0].Arrival.location,
                terminal: selectedFlight.Return.flights[0].Arrival.terminal,
                date: selectedFlight.Return.flights[0].Arrival.date,
                time: selectedFlight.Return.flights[0].Arrival.time,
              },
              duration: selectedFlight.Return.flights[0].duration,
              distance: selectedFlight.Return.flights[0].distance,
            }
          : null,
      },
    });

    await passengerDetails.save();

    res.status(201).json({
      success: true,
      message: "Passenger details saved successfully",
      //   bookingReference,
    });
  } catch (error) {
    console.error("Error saving passenger details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save passenger details",
      error: error.message,
    });
  }
};

// Get all passenger details (for admin)
exports.getAllPassengerDetails = async (req, res) => {
  try {
    const passengerDetails = await PassengerDetails.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: passengerDetails.length,
      data: passengerDetails,
    });
  } catch (error) {
    console.error("Error fetching passenger details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch passenger details",
      error: error.message,
    });
  }
};

// Get passenger details by booking reference
// exports.getPassengerDetailsByReference = async (req, res) => {
//   try {
//     const { bookingReference } = req.params;

//     const passengerDetails = await PassengerDetails.findOne({
//       bookingReference,
//     });

//     if (!passengerDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: passengerDetails,
//     });
//   } catch (error) {
//     console.error("Error fetching passenger details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch passenger details",
//       error: error.message,
//     });
//   }
// };

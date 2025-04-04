const User = require("../models/user.model");



exports.getAllUserList = async(req, res) =>{

    try{

        const page = parseInt(req.query.page) || 1; // Get current page, default is 1
        const pageSize = parseInt(req.query.limit) || 50; // Get page size, default is 10
        const skip = (page - 1) * pageSize; // Calculate skip for pagination

        const aggregation = [
            {
              $lookup: {
                from: "flightbookings", // The collection name in MongoDB for userBookings
                localField: "_id", // Field in 'user' collection to match with 'userBooking'
                foreignField: "userId", // Field in 'userBooking' collection to match with 'user'
                as: "bookinghistory", // Output array that will store matched booking history
              },
            },
            { $sort: { createdAt: -1 } }, // Sort by createdAt in descending order
            { $skip: skip }, // Apply pagination skip
            { $limit: pageSize }, // Apply pagination limit
            {
                $project: {
                    otpExpiry: 0,  // Include name field in the result
                    profilePic: 0,
                    isEmailVerified: 0,                  
                    otp: 0, // Include email field in the result
                //   createdAt: 1, // Include createdAt field in the result
                //   flightbookings: 1, // Include flightbookings (from lookup)
                },
            },
          ];

          const usersWithBookings = await User.aggregate(aggregation);

          // Count the total number of users for pagination info
         const totalCount = await User.countDocuments();

         res.status(200).send(
            {
                data: usersWithBookings,
                page,
                pageSize,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
         })

    } catch (err) {
        const errorMsg = err.message || "Unknown error";
        res.status(500).send({ statusCode: 500, message: errorMsg });
      }

}
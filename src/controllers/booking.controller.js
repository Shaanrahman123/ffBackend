
const FlightBooking = require("../models/flightBooking.model");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");

exports.createBooking = async (req, res) => {
  const userId = req.user.id; // Assuming the JWT contains the user ID in the `_id` field
  // console.log(req.user)
  try {
    const {} = req.body;

    // Proceed to create a new user
    const booking = new FlightBooking({
      userId,
      ...req.body
    });

    // Save the new user to the database
    const savedBooking = await booking.save();

    // await sendEmail(subject, savedUser.email, otpMailTemplate(savedUser));


    res.status(201).send({
      statusCode: 201,
      message: "Booking successfully",
      data: "Ok",
    });
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};



exports.getSingleBooking = async (req, res) => {

    const { id } = req.params; // Extracting the ID from the URL
    try {

        const booking = await FlightBooking.findById(id);
    if (!booking) {
      return res.status(404).json({statusCode: 404, message: "Booking not found" });
    }        
        res.status(200).send({
            statusCode: 200,
            message: "Booking  fetch successfully",
            data: booking,
          });
        } catch (err) {
          const errorMsg = err.message || "Unknown error";
          res.status(500).send({ statusCode: 500, message: errorMsg });
        }
}



exports.getUserBookingHistory = async (req, res) =>{

    try{

    const userId = req.user.id;

    const page = req.query.page || 1;
    const limit = req.query.limit || 50;
    const sorted = { createdAt: -1 };
    const query = {
        userId:userId
    }

    const booking= await exports.BookingServices(page,limit,sorted, query)

    // console.log(booking);
    if(booking.data.length===0){
       return res.status(404).send({
            statusCode: 404,
            message : "No booking found for this criteria",
    })

    }

    res.status(200).send({
        statusCode: 200,
        message : "Booking  fetch successfully",
        pagination  :booking.pagination,
        data : booking.data,
      });
    } catch (err) {
      const errorMsg = err.message || "Unknown error";
      res.status(500).send({ statusCode: 500, message: errorMsg });
    }

}

//only admin
exports.getAllBookings = async (req, res) =>{

  try{


  const page = req.query.page || 1;
  const limit = req.query.limit || 50;
  const sorted = { createdAt: -1 };
  const query = {
      // userId:userId
  }

  const booking= await exports.BookingServices(page,limit,sorted, query)

  // console.log(booking);
  if(booking.data.length===0){
     return res.status(404).send({
          statusCode: 404,
          message : "No booking found for this criteria",
  })

  }

  res.status(200).send({
      statusCode: 200,
      message : "Booking  fetch successfully",
      pagination  :booking.pagination,
      data : booking.data,
    });
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }

}


exports.BookingServices = async (page,limit,sorted,query) => {

    try{
        const skip = (page-1) *  limit;

      const data= await  FlightBooking.find(query)
      .sort(sorted)
      .skip(skip)
      .limit(limit)
      .lean();

      // Get the total count for pagination metadata
    const totalCount = await FlightBooking.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    // Create the pagination object
    const pagination = {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
      };
        return {data, pagination}
    }catch (error) {
    throw new Error(error.message);
  }

}



exports.getAllCountBookingandUsers = async (req, res) =>{

  try{

    const totalBooking = await FlightBooking.countDocuments();
    const totalUser = await User.countDocuments({isAdmin: false})
    const totalSuccessTransaction = await Transaction.countDocuments({status :"success"});
    const totalTransaction = await Transaction.countDocuments();

    const data={
      totalBooking,
      totalUser,
      totalTransaction,
      totalSuccessTransaction
    }

  res.status(200).send({
    statusCode: 200,
    message : "Booking, user, and transaction counts retrieved successfully.",
    data : data,
  });
} catch (err) {
  const errorMsg = err.message || "Unknown error";
  res.status(500).send({ statusCode: 500, message: errorMsg });
}

}
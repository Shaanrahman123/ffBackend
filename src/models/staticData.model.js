const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema(
  {
    airlineName: String,
    airlineCode: String,
  });

  const airportSchema = new mongoose.Schema(
    {
      id: String,
      code: String,
      AirportCode: String,
      name: String,
      CityCode: String,
      CountryCode: String,
      CountryName: String,
      state: String,
    });

    const markupanddiscount = new mongoose.Schema({
      markup:Number,
      discount:{
        onward:Number,
        return:Number
      }
    })

  const AirlineData = mongoose.model('airlinelist', airlineSchema);
  const AirportData = mongoose.model('airportlist', airportSchema);
  const MarkUpDiscount = mongoose.model("markupdiscount", markupanddiscount);
  
module.exports = {  AirlineData, AirportData, MarkUpDiscount };

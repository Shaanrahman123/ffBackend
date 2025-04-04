
exports.credentials = {
  grant_type: process.env.GRANT_TYPE,
  username: process.env.TP_USERNAME,
  password: process.env.TP_PASSWORD,
  client_id: process.env.TP_CLIENT_ID,
  client_secret: process.env.TP_CLIENT_SECRET,
  scope:process.env.OPENID,
  XAUTH_TRAVELPORT_ACCESSGROUP:process.env.TP_XAUTH_TRAVELPORT_ACCESSGROUP,
  TP_ACCEPT_VERSION:process.env.TP_ACCEPT_VERSION
};

const baseURL=process.env.TP_BASEURL;
const paymentbaseurl=process.env.PAYMENT_BASEURL;
const paymentapikey=process.env.PAYMENT_APIKEY;


exports.api = {
  //Common Token
  tokenURL:
    "https://oauth.pp.travelport.com/oauth/oauth20/token",
    //search url
    flightSearchUrl:
    `${baseURL}/catalog/search/catalogproductofferings`,
    //price url
    priceUrl:
    `${baseURL}/price/offers/buildfromcatalogproductofferings`,
    //initiateWorkBench url
    initiateWorkBenchUrl:
    `${baseURL}/book/session/reservationworkbench`,
    // addOffer
    addOffer:
    `${baseURL}/book/airoffer/reservationworkbench`,
    //addTraveler
    addTraveler:
    `${baseURL}/book/traveler/reservationworkbench`,
    //commitReservation
    commitReservation:
    `${baseURL}/book/reservation/reservations`,
  

    //payment gateWayUrl
    paymentGateWayUrl :
    `${paymentbaseurl}/api/v3/transaction/${paymentapikey}/debit`



};
exports.responseFlags = {
  ACTION_COMPLETE: 200,
  ACTION_FAILED: 500,
};

exports.responseMessages = {
  ACTION_COMPLETE: "Successful",
  ACTION_FAILED: "Something went wrong.Please try again",
};

exports.activeStatus = {
  IN_ACTIVE: 0,
  ACTIVE: 1,
  ARCHIVE:2
};



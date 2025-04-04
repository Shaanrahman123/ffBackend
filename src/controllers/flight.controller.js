const { default: axios } = require("axios");
const qs = require("qs"); // Required for URL-encoded data
const { api, credentials } = require("../common/const");

exports.oAuthToken = async (req, res) => {
  try {
    // Prepare the data in URL-encoded format
    const data = qs.stringify({
      grant_type: credentials.grant_type,
      username: credentials.username,
      password: credentials.password,
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      scope: credentials.scope,
    });

    // Set the headers to indicate that the content is in x-www-form-urlencoded format
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    // Send the POST request
    const response = await axios.post(`${api.tokenURL}`, data, config);

    // Prepare the response object
    // console.log(response)

    res.status(200).send({
      statusCode: 200,
      message: "Token generate successfully.",
      data: response.data,
    });
  } catch (err) {
    // Handle errors (You can customize the error response as needed)
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

//searchFlightOneWay
exports.searchFlightOneWay = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.tptoken;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };
    // console.log(api.flightSearchUrl)

    const response = await axios.post(`${api.flightSearchUrl}`, data, config);

    // console.log(response?.data?.CatalogProductOfferingsResponse?.Result?.Error);
    if (response.data.CatalogProductOfferingsResponse.Result.Error) {
      const errorMessage =
        response?.data?.CatalogProductOfferingsResponse?.Result?.Error[0]
          ?.Message;

      return res.status(200).send({
        statusCode: 200,
        message: errorMessage,
      });
    }
    console.log(
      response?.data?.CatalogProductOfferingsResponse?.ReferenceList[1]
        ?.Product[0]?.PassengerFlight,
      "response"
    );

    let responseData = response?.data;

    let responseReformed = [];
    // console.log(response.data)

    //helper function

    function helperFlight(code) {
      let itemFlight;
      const responseFlight =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList?.[0]
          ?.Flight;
      responseFlight?.forEach((item) => {
        if (item.id === code) {
          itemFlight = item;
          // break;
        }
      });
      return itemFlight;
    }

    function helperProduct(code) {
      let itemProduct;
      const responseProduct =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList?.[1]
          ?.Product;
      responseProduct?.forEach((item, index) => {
        if (item?.id === code) {
          itemProduct = item;
        }
      });
      return itemProduct;
    }
    function helperTermsAndCondition(code) {
      let itemTandC;
      const responseTermsAndCondition =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList?.[2]
          .TermsAndConditions;
      responseTermsAndCondition?.forEach((item, index) => {
        if (item?.id === code) {
          itemTandC = item;
        }
      });
      return itemTandC;
    }
    function helperBrandOption(code) {
      let brandOption;
      const responseBrand =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList[3]?.Brand;
      responseBrand?.forEach((item, index) => {
        if (item?.id === code) {
          brandOption = item;
        }
      });
      return brandOption;
    }

    responseData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.CatalogProductOffering?.forEach(
      (item, index) => {
        item.ProductBrandOptions?.forEach((innerItem, innerIndex) => {
          let tempObj = {
            flights: innerItem.flightRefs?.map((item, index) => {
              return helperFlight(item);
            }),
            productsoption: innerItem?.ProductBrandOffering?.map(
              (item, index) => {
                return {
                  ...item,
                  fareType: helperProduct(item.Product[0]?.productRef),
                  Brand: helperBrandOption(item?.Brand?.BrandRef),
                  TermsAndConditions: helperTermsAndCondition(
                    item?.TermsAndConditions?.termsAndConditionsRef
                  ),
                };
              }
            ),
            orderId: item?.id,
          };

          responseReformed.push(tempObj);
        });
      }
    );

    const CatalogProductOfferingsId =
      responseData?.CatalogProductOfferingsResponse?.CatalogProductOfferings
        ?.Identifier?.value;
    // console.log("responseReformed",responseData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.Identifier?.value);
    res.status(200).send({
      statusCode: 200,
      message: "Search flight successfully.",
      CatalogProductOfferingsId: CatalogProductOfferingsId,
      data: responseReformed,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

//searchFlightReturn

exports.searchFlightReturn = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.tptoken;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };
    // console.log(api.flightSearchUrl)

    const response = await axios.post(`${api.flightSearchUrl}`, data, config);

    // console.log(response?.data?.CatalogProductOfferingsResponse?.Result?.Error);
    if (response.data.CatalogProductOfferingsResponse.Result.Error) {
      const errorMessage =
        response?.data?.CatalogProductOfferingsResponse?.Result?.Error[0]
          ?.Message;

      return res.status(200).send({
        statusCode: 200,
        message: errorMessage,
      });
    }

    let responseData = response?.data;

    let responseReformed = [];
    // console.log(response.data)

    //helper function

    function helperFlight(code) {
      let itemFlight;
      const responseFlight =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList?.[0]
          ?.Flight;
      responseFlight?.forEach((item) => {
        if (item.id === code) {
          itemFlight = item;
          // break;
        }
      });
      return itemFlight;
    }

    function helperProduct(code) {
      let itemProduct;
      const responseProduct =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList?.[1]
          ?.Product;
      responseProduct?.forEach((item, index) => {
        if (item?.id === code) {
          itemProduct = item;
        }
      });
      return itemProduct;
    }
    function helperTermsAndCondition(code) {
      let itemTandC;
      const responseTermsAndCondition =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList?.[2]
          .TermsAndConditions;
      responseTermsAndCondition?.forEach((item, index) => {
        if (item?.id === code) {
          itemTandC = item;
        }
      });
      return itemTandC;
    }
    function helperBrandOption(code) {
      let brandOption;
      const responseBrand =
        responseData?.CatalogProductOfferingsResponse?.ReferenceList[3]?.Brand;
      responseBrand?.forEach((item, index) => {
        if (item?.id === code) {
          brandOption = item;
        }
      });
      return brandOption;
    }

    responseData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.CatalogProductOffering?.forEach(
      (item, index) => {
        item.ProductBrandOptions?.forEach((innerItem, innerIndex) => {
          let tempObj = {
            flights: innerItem.flightRefs?.map((item, index) => {
              return helperFlight(item);
            }),
            productsoption: innerItem?.ProductBrandOffering?.map(
              (item, index) => {
                return {
                  ...item,
                  fareType: helperProduct(item.Product[0]?.productRef),
                  Brand: helperBrandOption(item?.Brand?.BrandRef),
                  TermsAndConditions: helperTermsAndCondition(
                    item?.TermsAndConditions?.termsAndConditionsRef
                  ),
                };
              }
            ),
            orderId: item?.id,
          };

          responseReformed.push(tempObj);
        });
      }
    );

    const CatalogProductOfferingsId =
      responseData?.CatalogProductOfferingsResponse?.CatalogProductOfferings
        ?.Identifier?.value;
    // console.log("responseReformed",responseData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.Identifier?.value);
    res.status(200).send({
      statusCode: 200,
      message: "Search flight successfully.",
      CatalogProductOfferingsId: CatalogProductOfferingsId,
      data: responseReformed,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.priceFlight = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.tptoken;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };

    // console.log(`${api.priceUrl}`)
    const response = await axios.post(`${api.priceUrl}`, data, config);

    res.status(200).send({
      statusCode: 200,
      message: "Refetch flight successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.initiateWorkBench = async (req, res) => {
  try {
    const data = {
      ReservationID: {
        "@type": "ReservationID",
      },
    };
    const token = req.headers.tptoken;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };

    const response = await axios.post(
      `${api.initiateWorkBenchUrl}`,
      data,
      config
    );

    res.status(200).send({
      statusCode: 200,
      message: "initiate work bench flight successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.addOffer = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.tptoken;
    const reservationIdDevKit = req.headers.reservationiddevkit;
    // console.log(req.headers)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };
    // console.log(data)
    //  console.log(`${api.addOffer}/${reservationIdDevKit}/offers/buildfromcatalogproductofferings`)
    const response = await axios.post(
      `${api.addOffer}/${reservationIdDevKit}/offers/buildfromcatalogproductofferings`,
      data,
      config
    );

    res.status(200).send({
      statusCode: 200,
      message: "add offer flight successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.addTraveler = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.tptoken;
    const reservationIdDevKit = req.headers.reservationiddevkit;
    // console.log(req.headers)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };
    //  console.log(`${api.addOffer}/${reservationIdDevKit}/offers/buildfromcatalogproductofferings`)
    const response = await axios.post(
      `${api.addTraveler}/${reservationIdDevKit}/travelers`,
      data,
      config
    );

    res.status(200).send({
      statusCode: 200,
      message: "add traveler flight successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.commitReservation = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.tptoken;
    const reservationIdDevKit = req.headers.reservationiddevkit;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };

    // console.log(`${api.commitReservation}/${reservationIdDevKit}`);
    // console.log(config);
    const response = await axios.post(
      `${api.commitReservation}/${reservationIdDevKit}`,
      data,
      config
    );

    // console.log(response)
    res.status(200).send({
      statusCode: 200,
      message: "commit reservation flight successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

exports.retrievePnr = async (req, res) => {
  try {
    // const data=req.body;
    const token = req.headers.tptoken;
    const PNRDevKit = req.headers.pnr;
    // console.log(req.headers)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        XAUTH_TRAVELPORT_ACCESSGROUP: `${credentials.XAUTH_TRAVELPORT_ACCESSGROUP}`,
        "Accept-Version": `${credentials.TP_ACCEPT_VERSION}`,
        "Content-Version": `${credentials.TP_ACCEPT_VERSION}`,
      },
    };
    //  console.log(`${api.commitReservation}`)
    const response = await axios.get(
      `${api.commitReservation}/${PNRDevKit}?detailViewInd=true`,
      config
    );

    res.status(200).send({
      statusCode: 200,
      message: "retrieve pnr successfully.",
      data: response.data,
    });
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data
      : err.message || "Unknown error";
    res.status(500).send({ statusCode: 500, message: errorMsg });
  }
};

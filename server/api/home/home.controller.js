const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:ipAddress/geo", getGeoInfo);

// Route
async function getGeoInfo(req, res, next) {
  try {
    const ipAddress = req.params.ipAddress;

    const apiUrl = `https://ipinfo.io/${ipAddress}/geo`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    const { ip, city, region, country, loc } = data;

    const geoInfo = {
      ip,
      city,
      region,
      country,
      location: loc,
    };
    console.log(geoInfo);

    res.json(geoInfo);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving geo information:", error);
    res.status(500).json({ error: "Failed to retrieve geo information" });
  }
}

module.exports = router;

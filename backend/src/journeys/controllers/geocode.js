const axios = require("axios");

const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

async function reverseGeocode(req, res) {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing coordinates" });
    }
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    const response = await axios.get(nominatimUrl, {
      headers: { "User-Agent": "journey-planner-app" },
    });
    const address = response.data.address;

    return res.status(200).json(address);
  } catch (error) {
    console.error(error);
  }
}

async function autocomplete(req, res) {
  try {
    const { search } = req.query;
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&format=json&apiKey=${GEOAPIFY_KEY}`
    );
    const results = response.data.results;
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { reverseGeocode, autocomplete };

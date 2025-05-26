const express = require("express");
const { requireAuth } = require("@clerk/express");
const {
  getJourneys,
  getJourneyById,
  updateJourney,
  createJourney,
} = require("../controllers/journeyController");
const { reverseGeocode, autocomplete } = require("../controllers/geocode");

const router = express.Router();

router.get("/api/journeys", requireAuth(), getJourneys);
router.get("/api/journeys/:id", requireAuth(), getJourneyById);
router.get("/api/reverse-geocode", requireAuth(), reverseGeocode);
router.get("/api/autocomplete", requireAuth(), autocomplete);
router.patch("/api/journeys/:id", requireAuth(), updateJourney);
router.post("/api/journeys", requireAuth(), createJourney);
module.exports = router;

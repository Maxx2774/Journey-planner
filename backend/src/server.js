require("dotenv").config();
const express = require("express");
const cors = require("cors");
const journeyRoutes = require("./journeys/routes/journeyRoutes");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(journeyRoutes);

app.listen(3000);

module.exports = app;

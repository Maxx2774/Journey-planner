const express = require("express");
const router = express.Router();
const { createUserByClerk } = require("../webhooks/UserWebhooks");

router.post("/api/clerk/webhooks", createUserByClerk);

module.exports = router;

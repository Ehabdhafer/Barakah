// routes/index.js
const express = require("express");
const { join } = require("path");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

module.exports = router;

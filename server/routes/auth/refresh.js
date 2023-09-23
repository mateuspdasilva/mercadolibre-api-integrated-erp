// routes/user-info.js
const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/AuthController.js");

router.get("/", AuthController.refreshToken);

module.exports = router;

// routes/user-info.js
const express = require("express");
const router = express.Router();
const UsersController = require("../../controllers/UsersController.js");

router.get("/", UsersController.createTestUser);

module.exports = router;

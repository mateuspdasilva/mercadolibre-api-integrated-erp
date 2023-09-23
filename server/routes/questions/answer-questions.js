// routes/user-info.js
const express = require("express");
const router = express.Router();
const QuestionsController = require("../../controllers/QuestionsController.js");

router.get("/", QuestionsController.answerQuestion);

module.exports = router;

const express = require("express");
const router = express.Router();
const Categories = require("../../controllers/CategoriesController");

router.get("/", Categories.listAllCategories);

module.exports = router;

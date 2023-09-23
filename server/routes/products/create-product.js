const express = require("express");
const router = express.Router();
const Product = require("../../controllers/Products.js");

const productsController = new Product();

router.get("/", async (req, res) => {
  await productsController.createNewProduct(req, res);
});

module.exports = router;
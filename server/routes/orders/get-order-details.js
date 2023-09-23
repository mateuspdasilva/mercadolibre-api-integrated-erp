// routes/user-info.js
const express = require("express");
const router = express.Router();
const OrdersController = require("../../controllers/OrdersController.js");

router.get("/", OrdersController.getOrderById);

module.exports = router;

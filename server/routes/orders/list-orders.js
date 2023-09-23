const express = require("express");
const router = express.Router();
const OrdersController = require("../../controllers/OrdersController.js");

router.get("/", OrdersController.listAllOrders);

module.exports = router;

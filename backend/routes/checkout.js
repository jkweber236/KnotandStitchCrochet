const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkout");

router.post("/", checkoutController.handleCheckout);

module.exports = router;

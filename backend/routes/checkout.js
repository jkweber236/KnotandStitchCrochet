const express = require('express');
const router = express.Router();

const checkoutController = require('../controllers/checkout');

router.post('/checkout', checkoutController.handleCheckout);

module.exports = router;

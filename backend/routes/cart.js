const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
// const checkJwt = require('../middleware/authMiddleware');

router.get('/', cartController.getCartByUserId); // Get cart by userId
router.post('/', cartController.addToCart); // Add product to cart

module.exports = router;

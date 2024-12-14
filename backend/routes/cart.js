const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/:id", cartController.getCartById); // Get cart by Id
// router.post("/", cartController.addToCart); // Add product to cart
router.post("/", cartController.createNewCart);
router.post("/:id", cartController.addToCart);

router.delete("/:cartId/:itemId", cartController.removeFromCart);

module.exports = router;

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/:userId", cartController.getCartByUser);
router.post("/:id", cartcontroller.addToCart);
router.delete("/:id", cartController.removeFromCart);
router.put("/:id", cartController.updateItemQuantity);

module.exports = router;

const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all items in the user's cart
const getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("cart")
      .findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const product = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("cart")
      .updateOne(
        { userId: userId },
        {
          $push: { items: product }, // Add the product to the cart
        },
        { upsert: true } // Create a new cart if one doesn't exist
      );

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const cart = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("cart")
      .updateOne(
        { userId: userId },
        { $pull: { items: { _id: new ObjectId(productId) } } }
      );

    if (cart.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity of a product in the cart
const updateItemQuantity = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    const cart = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("cart")
      .updateOne(
        { userId: userId, "items._id": new ObjectId(productId) },
        { $set: { "items.$.quantity": quantity } }
      );

    if (cart.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json({ message: "Cart item quantity updated", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCartByUser, addToCart, removeFromCart, updateItemQuantity };

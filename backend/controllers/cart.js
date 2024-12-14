// const Cart = require("../models/cartModel");
const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// Get cart by Auth0 userId
const getCartById = async (req, res) => {
  const { id } = req.params;

  try {
    const objectId = new ObjectId(id);

    const response = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("carts")
      .findOne({ _id: objectId });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "cart not found" });
    }
  } catch (error) {
    console.error("Error fetching cart by ID:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Add product to user's cart
const addToCart = async (req, res) => {
  const { id } = req.params; // Get the user ID (cart ID)
  const { productId, quantity } = req.body; // Get product ID and quantity from the request body

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ error: "Product ID and quantity are required" });
  }

  try {
    const cart = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("carts")
      .findOne({ _id: new ObjectId(id) });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.items.findIndex(
      (item) => item.item.toString() === productId
    );

    if (productIndex !== -1) {
      // Product exists in cart, update the quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // Product does not exist, add a new item
      cart.items.push({ item: productId, quantity });
    }

    // Save the updated cart back to the database
    const updateResponse = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("carts")
      .updateOne({ _id: new ObjectId(id) }, { $set: { items: cart.items } });

    if (updateResponse.modifiedCount > 0) {
      res.status(200).json({ message: "Item added to cart successfully" });
    } else {
      res.status(500).json({ error: "Failed to update cart" });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

const createNewCart = async (req, res) => {
  const newCart = {
    items: [],
    createdAt: new Date(),
  };

  try {
    const response = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("carts")
      .insertOne(newCart);

    if (response.acknowledged) {
      res.status(201).json({ insertedId: response.insertedId });
    } else {
      res.status(500).json({ error: "Error inserting cart" });
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Failed to create cart" });
  }
};

const removeFromCart = async (req, res) => {
  const { cartId, itemId } = req.params;

  try {
    const cart = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("carts")
      .findOne({ _id: new ObjectId(cartId) });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove the item from the cart
    const updatedItems = cart.items.filter(
      (item) => item.item.toString() !== itemId
    );

    // Update the cart in the database
    const updateResponse = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("carts")
      .updateOne(
        { _id: new ObjectId(cartId) },
        { $set: { items: updatedItems } }
      );

    if (updateResponse.modifiedCount > 0) {
      res.status(200).json({ message: "Item removed from cart successfully" });
    } else {
      res.status(500).json({ error: "Failed to update cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

module.exports = { createNewCart, getCartById, addToCart, removeFromCart };

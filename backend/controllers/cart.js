const Cart = require('../models/cartModel');

// Get cart by Auth0 userId
const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.sub; // Auth0 user ID from the token

    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add product to user's cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
    unique: true,  
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);

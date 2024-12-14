// controllers/checkoutController.js
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

const handleCheckout = async (req, res) => {
  console.log(req.body);
  
  try {
    const token = req.body.token;
    
    const customer = await stripe.customers.create({
      email: "geekygautam1997@gmail.com",
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: 1000,
      description: "Test Purchase using express and Node",
      currency: "USD",
      customer: customer.id,
    });

    res.json({
      data: "success",
    });
  } catch (error) {
    console.error(error);
    res.json({
      data: "failure",
    });
  }
};

module.exports = { handleCheckout };

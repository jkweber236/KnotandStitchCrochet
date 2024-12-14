const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

const handleCheckout = async (req, res) => {
  console.log(req.body);

  try {
    const token = req.body.token;

    const customer = await stripe.customers.create({
      email: token.billing_details.email,
      source: token.id,
      address: {
        line1: token.billing_details.address.line1,
        line2: token.billing_details.address.line2,
        city: token.billing_details.address.city,
        state: token.billing_details.address.state,
        postal_code: token.billing_details.address.postal_code,
        country: token.billing_details.address.country,
      },
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
    res.status(500).json({
      data: "failure",
    });
  }
};

module.exports = { handleCheckout };

const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const products = req.body.newProducts;
  const orderId = req.body.orderId;
  console.log(products);
  const line_items = products.map((item) => {
    return {
      price_data: {
        currency: "ron",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: parseInt(item.price * 100),
      },
      quantity: item.orderedQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success?data=${encodeURIComponent(JSON.stringify(orderId))}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const products = req.body.products;
  const orderId = req.body.orderId;
  const customerData = req.body.customerData;
  const shippingAddress = req.body.shippingAddress;
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
    success_url: `${
      process.env.CLIENT_URL
    }/checkout-success?data=${encodeURIComponent(JSON.stringify(orderId))}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    // customer_email: customerData.email,
    // payment_intent_data: {
    //   shipping: {
    //     name: customerData.surname + " " + customerData.name,
    //     address: {
    //       line1: shippingAddress.street,
    //       city: shippingAddress.city,
    //       state: shippingAddress.county,
    //       postal_code: shippingAddress.postalCode,
    //       line2: shippingAddress.otherInfo,
    //       country: "RO",
    //     },
    //   },
    // },
  });

  res.send({ url: session.url });
});

module.exports = router;

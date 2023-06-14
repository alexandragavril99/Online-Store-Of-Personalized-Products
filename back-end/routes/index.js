const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const productRouter = require("./product");
const favoriteRouter = require("./favorite");
const cartRouter = require("./cart");
const stripeRouter = require("./stripe");
const orderRouter = require("./order");

router.use("/user", userRouter);
router.use("/", authRouter);
router.use("/product", productRouter);
router.use("/favorite", favoriteRouter);
router.use("/cart", cartRouter);
router.use("/stripe", stripeRouter);
router.use("/order", orderRouter);

module.exports = router;

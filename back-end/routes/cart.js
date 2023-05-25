const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.post("/addProductToCart/:id", cartController.addProductToCart);

module.exports = router;

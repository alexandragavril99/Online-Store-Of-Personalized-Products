const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.post("/addProductToCart/:id", cartController.addProductToCart);
router.get("/getProductsFromCart", cartController.getProductsFromCart);
router.delete(
  "/reduceProductFromCart/:id",
  cartController.reduceProductFromCart
);
router.delete(
  "/deleteProductFromCart/:id",
  cartController.deleteProductFromCart
);
router.put(
  "/updateProductQuantityFromCart/:id",
  cartController.updateProductQuantityFromCart
);
router.delete(
  "/removeAllProductsFromCart",
  cartController.removeAllProductsFromCart
);

module.exports = router;

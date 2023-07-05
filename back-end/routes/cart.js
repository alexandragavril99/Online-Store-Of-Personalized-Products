const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const multer = require("multer");

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/online-store-app/public/product_pictures");
  },
  filename: async function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: store,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/addProductToCart/:id",
  upload.single("image"),
  cartController.addProductToCart
);
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

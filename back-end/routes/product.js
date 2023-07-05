const express = require("express");
const router = express.Router();
const productController = require("../controllers").product;
const multer = require("multer");
const ProductSchema = require("../models/product");

// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

// router.post("/upload", upload.single("image"), async (req, res) => {
//   const base64Image = req.file.buffer.toString("base64");
//   const product = {
//     name: req.body.name,
//     image: "data:image/jpg;base64," + base64Image,
//     price: req.body.price,
//     quantity: req.body.quantity,
//     description: req.body.description,
//     label: req.body.label,
//   };

//   ProductSchema.create(product)
//     .then((response) => {
//       res.status(201).send({ message: "Product added.", item: response });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send({ message: error.message });
//     });
// });

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

router.post("/addProduct", upload.single("image"), productController.addProduct);

router.get("/getAllProducts", productController.getAllProducts);

module.exports = router;

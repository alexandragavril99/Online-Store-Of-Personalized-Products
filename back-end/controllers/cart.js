const CartSchema = require("../models/cart");
const ProductSchema = require("../models/product");
const jwt = require("jsonwebtoken");
const cookiesToObject = require("../utils/functions");
const { ObjectId } = require("mongodb");

const controller = {
  addProductToCart: async (req, res) => {
    const productId = req.params.id;
    const productDocument = await ProductSchema.findOne({
      _id: new ObjectId(productId),
    });

    if (productDocument) {
      if (req.headers.cookie) {
        const cookieObject = cookiesToObject(req.headers.cookie);
        if (cookieObject.jwt) {
          const userId = jwt.verify(
            cookieObject.jwt,
            process.env.JWT_SECRET
          ).id;

          const cartProduct = await CartSchema.findOne({
            userId: userId,
            productId: productId,
          });

          if (cartProduct) {
            cartProduct.quantity++;
            CartSchema.updateOne(cartProduct)
              .then((newProduct) => {
                console.log(newProduct);
                res.status(200).send(newProduct);
                return;
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send(err);
                return;
              });
          } else {
            const response = await CartSchema.create({
              userId: userId,
              productId: productId,
              quantity: 1,
            });

            res
              .status(200)
              .send({ message: "Product added to cart.", item: response });
            return;
          }
        }
        res.status(403).send({ message: "Token invalid." });
        return;
      }
      res.status(403).send({ message: "Token is missing." });
      return;
    }
    res.status(400).send({ message: "Product not found." });
    return;
  },
};

module.exports = controller;

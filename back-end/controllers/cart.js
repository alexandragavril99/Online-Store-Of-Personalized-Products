const CartSchema = require("../models/cart");
const ProductSchema = require("../models/product");
const jwt = require("jsonwebtoken");
const cookiesToObject = require("../utils/functions");
const { ObjectId } = require("mongodb");

const controller = {
  addProductToCart: async (req, res) => {
    console.log(req.body);
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
            if (req.body.quantity) {
              cartProduct.quantity += Number(req.body.quantity);
            } else {
              cartProduct.quantity++;
            }
            if (req.body.personalization) {
              cartProduct.personalization = req.body.personalization;
            }
            cartProduct
              .save()
              .then((newProduct) => {
                console.log(newProduct);
                res.status(200).send(newProduct);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send(err);
              });
          } else {
            let quantity = 1;
            if (req.body.quantity) {
              quantity = req.body.quantity;
            }
            let personalization = null;
            if (req.body.personalization) {
              personalization = req.body.personalization;
            }
            const response = await CartSchema.create({
              userId: userId,
              productId: productId,
              quantity: quantity,
              personalization: personalization,
            });
            res
              .status(200)
              .send({ message: "Product added to cart.", item: response });
          }
        } else {
          res.status(403).send({ message: "Token invalid." });
        }
      } else {
        res.status(403).send({ message: "Token is missing." });
      }
    } else {
      res.status(400).send({ message: "Product not found." });
    }
  },

  getProductsFromCart: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        const cartProducts = await CartSchema.find({
          userId: userId,
        });

        const productIds = cartProducts.map(
          (cartProduct) => cartProduct.productId
        );

        const products = await ProductSchema.find({ _id: { $in: productIds } });

        const cartProductsComplete = cartProducts.map((cartProduct) => {
          const product = products.find((product) =>
            product._id.equals(cartProduct.productId)
          );
          return {
            _id: cartProduct._id,
            product: product,
            orderedQuantity: cartProduct.quantity,
            personalization: cartProduct.personalization,
          };
        });
        res.status(200).send(cartProductsComplete);
      } else {
        res.status(403).send({ message: "Token invalid." });
      }
    } else {
      res.status(403).send({ message: "Token is missing." });
    }
  },

  reduceProductFromCart: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        const cartProduct = await CartSchema.findOne({
          _id: new ObjectId(req.params.id),
          userId: userId,
        });

        if (cartProduct) {
          cartProduct.quantity--;
          if (cartProduct.quantity > 0) {
            cartProduct
              .save()
              .then((newProduct) => {
                res.status(200).send(newProduct);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send(err);
              });
          } else {
            await CartSchema.deleteOne({
              _id: new ObjectId(req.params.id),
              userId: userId,
            });

            res.status(200).send({ message: "Product deleted from cart." });
          }
        } else {
          res.status(404).send({ message: "Cart product not found." });
        }
      } else {
        res.status(403).send({ message: "Token invalid." });
      }
    } else {
      res.status(403).send({ message: "Token is missing." });
    }
  },

  deleteProductFromCart: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        const cartProduct = await CartSchema.findOne({
          _id: new ObjectId(req.params.id),
          userId: userId,
        });

        if (cartProduct) {
          await CartSchema.deleteOne({
            _id: new ObjectId(req.params.id),
            userId: userId,
          });

          res.status(200).send({ message: "Product deleted from cart." });
        } else {
          res.status(404).send({ message: "Cart product not found." });
        }
      } else {
        res.status(403).send({ message: "Token invalid." });
      }
    } else {
      res.status(403).send({ message: "Token is missing." });
    }
  },

  updateProductQuantityFromCart: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;
        const cartProduct = await CartSchema.findOne({
          _id: new ObjectId(req.params.id),
          userId: userId,
        });
        if (cartProduct) {
          cartProduct.quantity = req.body.orderedQuantity;
          cartProduct
            .save()
            .then((item) => {
              res.status(200).send({ message: "Product updated.", item: item });
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } else {
          res.status(404).send({ message: "Cart product not found." });
        }
      } else {
        res.status(403).send({ message: "Token invalid." });
      }
    } else {
      res.status(403).send({ message: "Token is missing." });
    }
  },

  removeAllProductsFromCart: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        await CartSchema.deleteMany({
          userId: userId,
        });

        res.status(200).send({ message: "Products deleted from cart." });
        return;
      } else {
        res.status(403).send({ message: "Token invalid." });
      }
    } else {
      res.status(403).send({ message: "Token is missing." });
    }
  },
};

module.exports = controller;

const { ObjectId } = require("mongodb");
const FavoriteSchema = require("../models/favorite");
const ProductSchema = require("../models/product");
const cookiesToObject = require("../utils/functions");
const jwt = require("jsonwebtoken");

const controller = {
  addToFavorites: async (req, res) => {
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

          const response = await FavoriteSchema.create({
            userId: userId,
            productId: productId,
          });

          res
            .status(200)
            .send({ message: "Product added to favorites.", item: response });
          return;
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

  deleteFromFavorites: async (req, res) => {
    const favoriteId = req.params.id;
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        await FavoriteSchema.deleteOne({
          _id: new ObjectId(favoriteId),
          userId: userId,
        });

        res
          .status(200)
          .send({ message: "Product deleted from favorites list." });
        return;
      }
      res.status(403).send({ message: "Token invalid." });
      return;
    }
    res.status(403).send({ message: "Token is missing." });
    return;
  },

  deleteProductFromFavorites: async (req, res) => {
    const productId = req.params.id;
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        await FavoriteSchema.deleteOne({
          productId: productId,
          userId: userId,
        });

        res
          .status(200)
          .send({ message: "Product deleted from favorites list." });
        return;
      }
      res.status(403).send({ message: "Token invalid." });
      return;
    }
    res.status(403).send({ message: "Token is missing." });
    return;
  },

  getFavorites: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        const favoriteProductList = await FavoriteSchema.find({
          userId: userId,
        });

        const productList = [];
        await Promise.all(
          favoriteProductList.map(async (item) => {
            await ProductSchema.findOne({
              _id: new ObjectId(item.productId),
            }).then((product) => {
              const favoriteProduct = {
                id: item.id,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image.toString("base64"),
                quantity: product.quantity,
                isFavorite: true,
              };
              productList.push(favoriteProduct);
            });
          })
        );

        res.status(200).send(productList);
        return;
      }
      res.status(403).send({ message: "Token invalid." });
      return;
    }
    res.status(403).send({ message: "Token is missing." });
    return;
  },
};

module.exports = controller;

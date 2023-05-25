const ProductSchema = require("../models/product");
const FavoriteSchema = require("../models/favorite");
const cookiesToObject = require("../utils/functions");
const jwt = require("jsonwebtoken");

const controller = {
  getAllProducts: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;
        const products = await ProductSchema.find({});
        const productList = [];

        await Promise.all(
          products.map(async (product) => {
            const productId = product._id.toString();
            await FavoriteSchema.findOne({
              userId: userId,
              productId: productId,
            }).then((favorite) => {
              const fullProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image.toString("base64"),
                quantity: product.quantity,
                isFavorite: favorite ? true : false,
              };
              productList.push(fullProduct);
            });
          })
        );

        productList
          ? res.status(200).send(productList)
          : res.status(500).send(error);
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

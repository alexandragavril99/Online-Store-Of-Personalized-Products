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
                description: product.description,
                image: product.image.toString("base64"),
                quantity: product.quantity,
                isFavorite: favorite ? true : false,
                label: product.label,
                personalization:
                  favorite && favorite.personalization
                    ? favorite.personalization
                    : null,
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

  addProduct: async (req, res) => {
    const product = {
      name: req.body.name,
      image: `${req.file.filename}`,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      label: req.body.label,
    };

    ProductSchema.create(product)
      .then((response) => {
        res.status(201).send({ message: "Product added.", item: response });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: error.message });
      });
  },
};

module.exports = controller;

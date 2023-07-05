const jwt = require("jsonwebtoken");
const ProductSchema = require("../models/product");
const { ObjectId } = require("mongodb");
const FeedbackSchema = require("../models/feedback");
const cookiesToObject = require("../utils/functions");
const UserSchema = require("../models/user");

const controller = {
  addFeedback: async (req, res) => {
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

          const user = await UserSchema.findOne({
            _id: new ObjectId(userId),
          });

          const response = await FeedbackSchema.create({
            userId: userId,
            productId: productId,
            feedback: req.body.feedback,
            rating: req.body.rating,
            date: new Date(),
          });

          res
            .status(200)
            .send({ message: "Feedback added.", item: response, user: user });
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

  getFeedbackById: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const feedbackList = await FeedbackSchema.find({
          productId: req.params.id,
        });

        const feedbackListComplete = [];
        await Promise.all(
          feedbackList.map(async (item) => {
            await UserSchema.findOne({
              _id: new ObjectId(item.userId),
            }).then((user) => {
              const feedback = {
                id: item.id,
                product: item.productId,
                feedback: item.feedback,
                rating: item.rating,
                userId: item.userId,
                userFirstName: user.firstName,
                userLastName: user.lastName,
                date: item.date,
              };
              feedbackListComplete.push(feedback);
            });
          })
        );
        res.status(200).send(feedbackListComplete);
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

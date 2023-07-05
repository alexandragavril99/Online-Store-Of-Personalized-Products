const jwt = require("jsonwebtoken");
const OrderSchema = require("../models/order");
const cookiesToObject = require("../utils/functions");
const { ObjectId } = require("mongodb");

const controller = {
  createOrder: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;
        const order = {
          userId: userId,
          surname: req.body.surname,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          street: req.body.street,
          county: req.body.county,
          city: req.body.city,
          postalCode: req.body.postalCode,
          otherInfo: req.body.otherInfo,
          products: req.body.products,
          totalPrice: req.body.totalPrice,
          status: "Done",
          date: new Date(),
        };

        const response = await OrderSchema.create(order);
        res.status(200).send({ message: "Order created.", item: response });
        return;
      }
      res.status(403).send({ message: "Token invalid." });
      return;
    }
    res.status(403).send({ message: "Token is missing." });
    return;
  },

  updateOrderSuccess: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;
        const order = await OrderSchema.findOne({
          _id: new ObjectId(req.params.id),
          userId: userId,
        });

        if (order) {
          order.status = "Completed";
          try {
            const savedOrder = await order.save();
            res
              .status(200)
              .send({ message: "Order updated.", item: savedOrder });
          } catch (error) {
            res.status(500).send(error);
          }
        } else {
          res.status(404).send({ message: "Order not found." });
        }
      } else {
        res.status(403).send({ message: "Token invalid." });
      }
    } else {
      res.status(403).send({ message: "Token is missing." });
    }
  },

  getOrderById: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;
        const order = await OrderSchema.find({
          _id: new ObjectId(req.params.id),
          userId: userId,
        });

        if (order) {
          res.status(200).send(order);
          return;
        } else {
          res.status(404).send({ message: "Order not found." });
          return;
        }
      }
      res.status(403).send({ message: "Token invalid." });
      return;
    }
    res.status(403).send({ message: "Token is missing." });
    return;
  },

  getOrdersById: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;
        const orders = await OrderSchema.find({
          userId: userId,
        }).sort({ date: -1 });

        if (orders) {
          res.status(200).send(orders);
          return;
        } else {
          res.status(404).send({ message: "Order not found." });
          return;
        }
      }
      res.status(403).send({ message: "Token invalid." });
      return;
    }
    res.status(403).send({ message: "Token is missing." });
    return;
  },
};

module.exports = controller;

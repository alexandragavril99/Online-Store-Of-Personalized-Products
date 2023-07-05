const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const cookiesToObject = require("../utils/functions");
const jwt = require("jsonwebtoken");

const controller = {
  register: async (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      isAdmin: req.body.isAdmin,
    };

    UserSchema.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    })
      .then((response) => {
        res.status(201).send({ message: "User added.", item: response });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: error.message });
      });
  },

  getUser: async (req, res) => {
    if (req.headers.cookie) {
      const cookieObject = cookiesToObject(req.headers.cookie);
      if (cookieObject.jwt) {
        const userId = jwt.verify(cookieObject.jwt, process.env.JWT_SECRET).id;

        const user = await UserSchema.findOne({ _id: new ObjectId(userId) });
        res.status(200).send(user);
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

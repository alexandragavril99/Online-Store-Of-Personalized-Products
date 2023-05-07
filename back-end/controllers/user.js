const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");

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
};

module.exports = controller;

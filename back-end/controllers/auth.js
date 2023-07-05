const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");

const controller = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Empty email or password.");
      res.status(400).send({ message: "Empty email or password." });
      return;
    }

    const user = await UserSchema.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("User not found. Incorrect email or password.");
      res
        .status(401)
        .send({ message: "User not found. Incorrect email or password." });
      return;
    }

    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
    console.log("Successful login", token, user);
    res.status(200).send({ token, user });
  },

  logout: async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).send({ message: "Logged out!" });
  },
};

module.exports = controller;

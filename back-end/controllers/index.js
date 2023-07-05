const user = require("./user");
const auth = require("./auth");
const product = require("./product");
const favorite = require("./favorite");
const cart = require("./cart");
const order = require("./order");
const feedback = require("./feedback");

const controllers = {
  user,
  auth,
  product,
  favorite,
  cart,
  order,
  feedback,
};

module.exports = controllers;

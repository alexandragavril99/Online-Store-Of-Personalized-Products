const user = require("./user");
const auth = require("./auth");
const product = require("./product");
const favorite = require("./favorite");
const cart = require("./cart");
const order = require("./order");

const controllers = {
  user,
  auth,
  product,
  favorite,
  cart,
  order,
};

module.exports = controllers;

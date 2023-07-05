const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  surname: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  street: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  county: { type: String },
  city: { type: String },
  otherInfo: {
    type: String,
  },
  products: {
    type: Array,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  label: {
    type: [String],
  },
});

module.exports = mongoose.model("Product", productSchema);

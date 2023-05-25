const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
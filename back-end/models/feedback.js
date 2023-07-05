const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);

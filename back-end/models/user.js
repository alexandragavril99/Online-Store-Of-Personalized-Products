const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);

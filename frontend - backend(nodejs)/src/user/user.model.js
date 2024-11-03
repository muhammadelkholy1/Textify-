const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Name is too short"],
    maxlength: [50, "Name is too long"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,

  },
});

module.exports = mongoose.model("User", userSchema);

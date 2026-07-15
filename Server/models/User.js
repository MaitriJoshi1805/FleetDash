const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Name is Required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true,"Email is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail,"Invalid Email"],
    },

    password: {
      type: String,
      required: [true,"Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User",userSchema);
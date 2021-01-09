const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
      trim: true,
    },
    wishlist: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
)
module.exports = mongoose.model("User", userSchema)

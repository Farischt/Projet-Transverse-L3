const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 24,
      text: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },

    category: {
      type: ObjectId,
      ref: "Category",
    },

    quantity: {
      type: Number,
    },

    sold: {
      type: Number,
      default: 0,
    },

    images: {
      type: Array,
    },

    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

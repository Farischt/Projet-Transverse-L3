const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 24,
      // text: true,
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
      text: true,
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

    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
)

// productSchema.indexes({ description: "text", slug: "index" })
const Product = mongoose.model("Product", productSchema)

Product.on("index", (err) => {
  if (err) console.error(err) // error occurred during index creation
})

module.exports = Product

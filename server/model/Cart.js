const mongoose = require("mongoose")
const { modelName } = require("./Product")
const { ObjectId } = mongoose.Schema

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        userQuantity: Number,
        price: Number,
      },
    ],

    cartTotal: {
      type: Number,
    },

    totalAfterDiscount: {
      type: Number,
    },

    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart

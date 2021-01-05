const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        userQuantity: Number,
      },
    ],

    paymentIntent: {},

    orderStatus: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Cancelled", "Completed"],
    },

    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)
module.exports = Order

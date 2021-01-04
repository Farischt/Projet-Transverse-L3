const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Name is required",
      minlength: [5, "Too Short"],
      maxlength: [18, "Too Long"],
    },

    expiry: {
      type: Date,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
      min: 5,
      max: 95,
    },
  },

  { timestamps: true }
)

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon

const Coupon = require("../model/Coupon")
const { createCouponValidation } = require("../helpers/couponValidation")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

//? Create a coupon
module.exports.create = async (req, res) => {
  // Coupon Validation
  const { error } = createCouponValidation(req.body.coupon)
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message })

  const { title } = req.body.coupon
  try {
    // We first check if a coupon with the same title already exist or not
    const couponCheck = await Coupon.findOne({ title: title })
    if (couponCheck)
      return res
        .status(400)
        .json({ errorMessage: "A coupon with the same name already exist" })

    // Now we can create the new coupon
    let newCoupon = await new Coupon(req.body.coupon).save()
    res.json(newCoupon)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Remove a coupon
module.exports.removeCoupon = async (req, res) => {
  const { couponId } = req.params

  // We first check if the id is a mongoose.Types.ObjectId
  if (!ObjectId.isValid(couponId))
    return res.status(400).json({ errorMessage: "coupon id is not valid " })

  try {
    const deletedCoupon = await Coupon.findOneAndRemove({
      _id: couponId,
    })
    if (!deletedCoupon)
      return res.status(400).json({
        errorMessage: "No coupon removed because your coupon Id is invalid",
      })
    res.json(deletedCoupon)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? List all coupons
module.exports.list = async (req, res) => {
  try {
    const coupons = await Coupon.find()
    if (!coupons.length)
      return res.status(404).json({ errorMessage: "No coupons found" })
    res.json(coupons)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

require("dotenv").config()
// const Card = require("../model/Card")
const Product = require("../model/Product")
const Coupon = require("../model/Coupon")
const Cart = require("../model/Cart")

const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY)

module.exports.createPaymentIntent = async (req, res) => {
  try {
    // Cart check
    const userCart = await Cart.findOne({ orderedBy: req.session.userId })
    if (!userCart)
      return res.status(400).json({ errorMessage: "No cart found" })

    // Coupon check
    const totalAmount =
      userCart.totalAfterDiscount < userCart.cartTotal
        ? userCart.totalAfterDiscount
        : userCart.cartTotal

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "eur",
    })

    // Increment sold and decrement quantity

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

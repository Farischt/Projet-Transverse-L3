const Cart = require("../model/Cart")
const Product = require("../model/Product")
const Coupon = require("../model/Coupon")
const Order = require("../model/Order")
const { isValidObjectId } = require("mongoose")
const User = require("../model/User")

//? Save cart

module.exports.userCart = async (req, res) => {
  // need a cart verification here
  const { cart } = req.body

  try {
    // We check if the user already has a registrated cart in db
    let existingCart = await Cart.findOne({ orderedBy: req.session.userId })
    // If we find one we remove it
    if (existingCart) existingCart.remove()

    // Now we want to push all the element from req.body.cart to a new variable products in order to add additional field to each products
    let verifiedProducts = []
    for (let i = 0; i < cart.length; i++) {
      // We don't trust client side sent price, so we get the product price from db
      let { price } = await Product.findById(cart[i]._id).select("price")
      if (!price)
        return res.status(500).json({
          errorMessage: "Error occured when trying to verify product price",
        })

      let productWithNewFields = {
        product: cart[i]._id,
        userQuantity: cart[i].userQuantity,
        price: price,
      }
      verifiedProducts.push(productWithNewFields)
    }

    // We now calculate the real total price
    let verifiedCartTotalPrice = 0
    for (let i = 0; i < verifiedProducts.length; i++) {
      verifiedCartTotalPrice =
        verifiedCartTotalPrice +
        verifiedProducts[i].userQuantity * verifiedProducts[i].price
    }

    let newCart = await new Cart({
      products: verifiedProducts,
      cartTotal: verifiedCartTotalPrice,
      totalAfterDiscount: verifiedCartTotalPrice,
      orderedBy: req.session.userId,
    }).save()

    res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message })
  }
}

// ? Read a specific cart

module.exports.readCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({
      orderedBy: req.session.userId,
    }).populate("products.product")

    if (!userCart)
      return res.status(404).json({ errorMessage: "No cart saved in database" })

    const { products, cartTotal, totalAfterDiscount } = userCart

    res.json({ products, cartTotal, totalAfterDiscount })
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Delete cart

module.exports.deleteCart = async (req, res) => {
  try {
    const removedCart = await Cart.findOneAndRemove({
      orderedBy: req.session.userId,
    })

    if (!removedCart)
      return res.status(404).json({ errorMessage: "No cart found" })

    res.json(removedCart)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Apply coupon

module.exports.applyCouponToCart = async (req, res) => {
  const { coupon } = req.body
  if (typeof coupon !== "string")
    return res.status(400).json({ errorMessage: "Invalid body type" })

  try {
    // Cart check
    const cart = await Cart.findOne({ orderedBy: req.session.userId }).populate(
      "products.product",
      "_id name price"
    )
    if (!cart) return res.status(404).json({ errorMessage: "No cart found" })

    // Coupon check
    const validCoupon = await Coupon.findOne({ title: coupon })
    if (!validCoupon)
      return res.status(400).json({ errorMessage: "Invalid coupon name" })

    // Expiry check
    const expiry = new Date(validCoupon.expiry)
    if (expiry.getTime() - Date.now() <= 0)
      return res.status(400).json({ errorMessage: "Coupon expired" })

    // Apply discount
    let totalAfterDiscount = (
      cart.cartTotal -
      (cart.cartTotal * validCoupon.discount) / 100
    ).toFixed(2)

    const newCartWithDiscount = await Cart.findOneAndUpdate(
      { orderedBy: req.session.userId },
      { totalAfterDiscount: parseInt(totalAfterDiscount) },
      { new: true }
    )

    res.json(newCartWithDiscount.totalAfterDiscount)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

// ? Create order

module.exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse

  try {
    // Cart check and destructur products
    const { products } = await Cart.findOne({ orderedBy: req.session.userId })
    if (!products.length)
      return res.status(400).json({ errorMessage: "No cart found " })

    // Decrement quantity and increment sold
    const bulkOption = products.map((element) => {
      return {
        updateOne: {
          filter: { _id: element.product._id },
          update: {
            $inc: {
              quantity: -element.userQuantity,
              sold: +element.userQuantity,
            },
          },
        },
      }
    })
    await Product.bulkWrite(bulkOption, {})

    // Creating a new order model
    await new Order({
      products,
      paymentIntent,
      orderedBy: req.session.userId,
    }).save()

    res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? List all orders for a specific user

module.exports.listOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({
      orderedBy: req.session.userId,
    })
      .populate("products.product")
      .sort({ createdAt: -1 })
    if (!userOrders.length)
      return res.status(400).json({ errorMessage: "No order available" })

    res.json(userOrders)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

// ? get wish list

module.exports.wishList = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate("wishlist")
    if (!user) return res.status(400).json({ errorMessage: "user not found" })

    const { wishlist } = user
    if (!wishlist.length)
      return res.status(400).json({ errorMessage: "Wishlist is empty" })

    res.json(wishlist)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

// ? Add to wishlist

module.exports.addToWishList = async (req, res) => {
  const { productId } = req.params

  if (!isValidObjectId(productId))
    return res.status(400).json({ errorMessage: "Invalid product id type" })

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.session.userId },
      { $addToSet: { wishlist: productId } }
    )

    if (!user)
      return res
        .status(400)
        .json({ errorMessage: "Nothing happened, user not found" })

    res.json({ ok: true })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? remove product from wishlist

module.exports.removeFromWishList = async (req, res) => {
  const { productId } = req.params

  if (!isValidObjectId(productId))
    return res.status(400).json({ errorMessage: "Invalid product id type" })

  try {
    const product = await Product.findById(productId)
    if (!product)
      return res.status(400).json({ errorMessage: "invalid product id" })

    const user = await User.findOneAndUpdate(
      { _id: req.session.userId },
      { $pull: { wishlist: productId } }
    )

    if (!user) return res.status(400).json({ errorMessage: "No user found " })

    res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

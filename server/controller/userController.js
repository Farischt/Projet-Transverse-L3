const User = require("../model/User")
const Cart = require("../model/Cart")
const Product = require("../model/Product")

module.exports.userCart = async (req, res) => {
  const { cart } = req.body

  try {
    const user = await User.findById(req.session.userId)
    if (!user)
      return res.status(401).json({ errorMessage: "Authentification needed" })
    // We check if the user already has a registrated cart in db
    let existingCart = await Cart.findOne({ orderedBy: user._id })
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

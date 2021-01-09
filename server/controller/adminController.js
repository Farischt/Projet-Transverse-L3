const Order = require("../model/Order")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

// ? get all orders

module.exports.orders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("orderedBy", "name email")
      .sort({ createdAt: -1 })
    if (!orders.length)
      return res
        .status(404)
        .json({ errorMessage: "No order available for the moment" })

    res.json(orders)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

// ? update order status

module.exports.orderStatus = async (req, res) => {
  const { orderId } = req.params
  const { newOrderStatus } = req.body
  const validOrderStatus = [
    "Not processed",
    "Processing",
    "Cancelled",
    "Completed",
  ]

  if (!ObjectId.isValid(orderId))
    return res.status(400).json({ errorMessage: "Invalid order id type" })
  if (!validOrderStatus.includes(newOrderStatus))
    return res.status(400).json({ errorMessage: "Invalid order status" })

  try {
    const orderToUpdate = await Order.findById(orderId)
    if (!orderToUpdate)
      return res.status(404).json({
        errorMessage: "Order not found, make sure your order id is valid",
      })
    if (orderToUpdate.orderStatus === newOrderStatus)
      return res.status(400).json({
        errorMessage:
          "Your new order status is the same as the current order status",
      })

    orderToUpdate.orderStatus = newOrderStatus
    await orderToUpdate.save()
    res.json({ ok: true })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

const Order = require("../model/Order")
const mongoose = require("mongoose")
const Product = require("../model/Product")
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

module.exports.grossSalesPerMonth = async (req, res) => {
  const validStatus = ["Completed", "Not processed", "Processing"]

  try {
    const result = await Order.aggregate([
      {
        $match: {
          orderStatus: { $in: validStatus },
          createdAt: {
            $gte: new Date("2021-01-01T00:00:00.000Z"), // Year 2021
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: {
                $toDate: { $multiply: ["$paymentIntent.created", 1000] },
              },
            },
            year: {
              $year: {
                $toDate: { $multiply: ["$paymentIntent.created", 1000] },
              },
            },
          },
          grossSales: { $sum: "$paymentIntent.amount" },
        },
      },
      { $sort: { "paymentIntent.created": -1 } },
    ])

    if (!result.length)
      return res
        .status(400)
        .json({ errorMessage: "No available data to sum your gross sales" })

    res.json(result)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

module.exports.outOfStock = async (req, res) => {
  try {
    const soonOutOfStocks = await Product.find({
      quantity: { $lte: 10 },
    })
      .sort({ quantity: 1 })
      .limit(10)

    if (!soonOutOfStocks.length)
      return res
        .status(400)
        .json({ errorMessage: "No products are soon out of stocks" })

    res.json(soonOutOfStocks)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errorMessage: err.message })
  }
}

const slugify = require("slugify")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
// Model
const Product = require("../model/Product")
const User = require("../model/User")
// Helper
const { createProductValidation } = require("../helpers/productValidation")

//? Create:
module.exports.create = async (req, res) => {
  const { error } = createProductValidation(req.body)
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message })

  const { name } = req.body
  req.body.slug = slugify(name)

  // We try to find a product with the same slug
  try {
    const uniqueCheck = await Product.findOne({ slug: req.body.slug })
    if (uniqueCheck)
      return res.status(400).json({ errorMessage: "Name already exist" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }

  // Now we can create and save the new product
  try {
    const newProduct = await new Product(req.body).save()
    res.json(newProduct)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

module.exports.read = async (req, res) => {
  const { slug } = req.params

  try {
    const product = await Product.findOne({ slug: slug }).populate("category")
    if (!product)
      return res.status(400).json({ errorMessage: "No such product" })
    res.json(product)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? List all:
module.exports.listAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(100)
      .populate("category")
      .sort({ createdAt: -1 })
    if (!products)
      return res.status(400).json({ errorMessage: "No available products" })
    res.json(products)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? List with limit and sort:
module.exports.list = async (req, res) => {
  const { sort, limit, order } = req.body
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(parseInt(limit))
      .sort([[sort, order]])

    if (!products.length)
      return res
        .status(400)
        .json({ errorMessage: "No product find for your criteras" })

    res.json(products)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Remove:
module.exports.remove = async (req, res) => {
  const { slug } = req.params

  try {
    const deletedProduct = await Product.findOneAndDelete({ slug: slug })
    if (!deletedProduct)
      return res.status(400).json({ errorMessage: "Invalid product slug" })
    res.json(deletedProduct)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Total number of products
module.exports.productsTotal = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount()

    if (!total || total === 0)
      return res.status(400).json({ errorMessage: "No available products" })

    res.json(total)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? List with pagination:
module.exports.listPagination = async (req, res) => {
  const { sort, page, order } = req.body
  const currentPage = page || 1
  const productsPerPage = 6

  try {
    const products = await Product.find({})
      .skip((currentPage - 1) * productsPerPage)
      .populate("category")
      .sort([[sort, order]])
      .limit(productsPerPage)

    if (!products.length)
      return res
        .status(400)
        .json({ errorMessage: "No product find for your criteras" })

    res.json(products)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Rating:
module.exports.rate = async (req, res) => {
  const { productId } = req.params
  const { star } = req.body

  // We first check if the id is a mongoose.Types.ObjectId
  if (!ObjectId.isValid(productId))
    return res.status(400).json({ errorMessage: "product id is not valid " })

  // We check if the star is a number inbetween 0 and 5
  if (parseInt(star) < 0 || parseInt(star) > 5 || isNaN(parseInt(star)))
    return res
      .status(400)
      .json({ errorMessage: "Rating must be a number in beetwen 0 and 5" })

  try {
    // We look for the product
    const product = await Product.findById(productId)
    if (!product)
      return res
        .status(404)
        .json({ errorMessage: "No product matching the id" })

    // We check if the user already rated or not
    let existingRating = product.ratings.find(
      (element) => element.postedBy.toString() === req.session.userId
    )

    // Query options
    const options = { new: true }

    // If the user has not rated yet, we create a rating
    if (!existingRating) {
      let newRating = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: {
            ratings: { star: parseInt(star), postedBy: req.session.userId },
          },
        },
        options
      )
      res.json(newRating)
    }

    // Else we update the rating only if the rating is different
    else if (existingRating && existingRating.star != parseInt(star)) {
      await Product.updateOne(
        { ratings: { $elemMatch: existingRating } },
        { $set: { "ratings.$.star": parseInt(star) } },
        options
      )
      res.send("ok")
    } else res.status(403).json({ errorMessage: "Forbidden action" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Related products:
module.exports.listRelated = async (req, res) => {
  const { productId } = req.params

  // We first check if the id is a mongoose.Types.ObjectId
  if (!ObjectId.isValid(productId))
    return res.status(400).json({ errorMessage: "product id is not valid " })

  try {
    const product = await Product.findById(productId)
    if (!product)
      return res.status(404).json({ errorMessage: "product not found" })

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(3)
      .populate("category")
    // .populate("postedBy", "_id name");
    if (!relatedProducts)
      return res
        .status(404)
        .json({ errorMessage: "No product matching your query" })

    res.json(relatedProducts)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errorMessage: err.message })
  }
}

//? Search filters:

//! search based on a keyword
const querySearch = async (req, res, query) => {
  // Field validation
  if (typeof query !== "string")
    return res
      .status(400)
      .json({ errorMessage: "Query field must be a valid string" })

  try {
    // Search in db based on text index
    const products = await Product.find({
      $text: { $search: query },
    })
      .populate("category", "_id name")
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(12)

    if (!products.length)
      return res
        .status(404)
        .json({ errorMessage: "No product found for your query" })

    res.json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: err.message })
  }
}

//! search based on a range of prices
const priceSearch = async (req, res, query) => {
  // Field validation
  if (
    !Array.isArray(query) ||
    query.length !== 2 ||
    isNaN(parseInt(query[0])) ||
    isNaN(parseInt(query[1]))
  )
    return res
      .status(400)
      .json({ errorMessage: "Price range must an array of two integers" })

  try {
    // Query based on price field
    const products = await Product.find({
      price: { $gte: parseInt(query[0]), $lte: parseInt(query[1]) },
    })
      .populate("category", "_id name")
      .populate("postedBy", "_id name")
      .sort({ price: 1 })
      .limit(12)

    if (!products.length)
      return res
        .status(404)
        .json({ errorMessage: "No product found for your query" })

    res.json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: err.message })
  }
}

//! Search based on a category
const categorySearch = async (req, res, query) => {
  // Field validation
  if (!ObjectId.isValid(query))
    return res
      .status(400)
      .json({ errorMessage: "Query field must be a valid category id" })

  try {
    const products = await Product.find({ category: query })
      .populate("category", "_id name")
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(12)

    if (!products.length)
      return res
        .status(404)
        .json({ errorMessage: "No product found for your query" })

    res.json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: err.message })
  }
}

//! Search based on rating
const ratingSearch = (req, res, query) => {
  // field validation
  if (isNaN(parseInt(query)) || parseInt(query) < 0 || parseInt(query) > 5)
    return res.status(400).json({
      errorMessage: "Query field must be a valid integer in beetween 0 and 5",
    })

  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: parseInt(query) } },
  ]).exec(async (error, aggregates) => {
    if (error)
      return res.status(500).json({ errorMessage: "Something went wrong" })
    const products = await Product.find({ _id: aggregates })
      .populate("category", "_id name")
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(12)

    if (!products.length)
      return res
        .status(404)
        .json({ errorMessage: "No product found for your query" })

    res.json(products)
  })
}

//! Main method
module.exports.searchWithFilters = async (req, res) => {
  const { query, type } = req.body
  if (query && type === "keyword") {
    await querySearch(req, res, query)
  }
  // query is an array of prices
  else if (query && type === "price") {
    await priceSearch(req, res, query)
  }
  // query is an category id
  else if (query && type === "category") {
    await categorySearch(req, res, query)
  }
  // query is an integer, star rating
  else if (query && type === "rating") {
    await ratingSearch(req, res, query)
  }
  // if we have no valid filter
  else {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a valid filter" })
  }
}

const slugify = require("slugify");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Model
const Product = require("../model/Product");
// Helper
const { createProductValidation } = require("../helpers/productValidation");

//? Create:
module.exports.create = async (req, res) => {
  const { error } = createProductValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  const { name } = req.body;
  req.body.slug = slugify(name);

  // We try to find a product with the same slug
  try {
    const uniqueCheck = await Product.findOne({ slug: req.body.slug });
    if (uniqueCheck)
      return res.status(400).json({ errorMessage: "Name already exist" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  // Now we can create and save the new product
  try {
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

module.exports.read = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug: slug }).populate("category");
    if (!product)
      return res.status(400).json({ errorMessage: "No such product" });
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//? List all:
module.exports.listAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(100)
      .populate("category")
      .sort({ createdAt: -1 });
    if (!products)
      return res.status(400).json({ errorMessage: "No available products" });
    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//? List with limit and sort:
module.exports.list = async (req, res) => {
  const { sort, limit, order } = req.body;
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(parseInt(limit))
      .sort([[sort, order]]);

    if (!products.length)
      return res
        .status(400)
        .json({ errorMessage: "No product find for your criteras" });

    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//? Remove:
module.exports.remove = async (req, res) => {
  const { slug } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ slug: slug });
    if (!deletedProduct)
      return res.status(400).json({ errorMessage: "Invalid product slug" });
    res.json(deletedProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//? Total number of products
module.exports.productsTotal = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();

    if (!total || total === 0)
      return res.status(400).json({ errorMessage: "No available products" });

    res.json(total);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//? List with pagination:
module.exports.listPagination = async (req, res) => {
  const { sort, page, order } = req.body;
  const currentPage = page || 1;
  const productsPerPage = 3;

  try {
    const products = await Product.find({})
      .skip((currentPage - 1) * productsPerPage)
      .populate("category")
      .sort([[sort, order]])
      .limit(productsPerPage);

    if (!products.length)
      return res
        .status(400)
        .json({ errorMessage: "No product find for your criteras" });

    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

const slugify = require("slugify");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Model
const Product = require("../model/Product");
// Helper
const { createProductValidation } = require("../helpers/productValidation");

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
    res.status(500).json({ errorMessage: err.message });
  }
};

module.exports.list = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    if (!products)
      return res.status(400).json({ errorMessage: "No available products" });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
};

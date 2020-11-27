const slugify = require("slugify");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Model
const Product = require("../model/Product");

module.exports.create = async (req, res) => {
  const { name, description, price, quantity, category, images } = req.body;
  // Validation to do here
  req.body.slug = slugify(name);
  try {
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
};

// Dependencies
const Category = require("../model/Category");
const slugify = require("slugify");
// Helpers
const {
  createCategoryValidation,
} = require("../helpers/categoryValidation.js");

//! CREATE A CATEGORY
module.exports.create = async (req, res) => {
  const { name } = req.body;
  // We validate the inputs
  const { error } = createCategoryValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  try {
    const check = await Category.findOne({ name: name });
    if (check)
      return res.status(400).json({ errorMessage: "Category already exist" });
  } catch (err) {
    console.log(err);
  }

  // We create a new category and we save it in db
  try {
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//! LIST ALL CATEGORIES
module.exports.list = async (req, res) => {
  try {
    // We get all the categories from db
    const categories = await Category.find({}).sort({ createdAt: -1 });

    // If nothing is found
    if (categories.length === 0)
      return res.status(400).json({
        errorMessage:
          "No category found, make sure to create at least one category first",
      });

    // otherwise we return the categories in an array
    res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//! READ A CATEGORY
module.exports.read = async (req, res) => {
  try {
    // db query
    const category = await Category.find({ slug: req.params.slug });

    // If category is empty
    if (category.length === 0)
      return res.status(400).json({
        errorMessage: "No category found, make sure your slug exists",
      });

    // otherwise we send the category
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
};

//! REMOVE A CATEGORY
module.exports.remove = async (req, res) => {
  try {
    // we query the db
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });

    // if false, it means nothing was found in db, slug is invalid
    if (!deletedCategory)
      return res.status(400).json({
        errorMessage: "Nothing was deleted, make sure your slug is valid",
      });

    res.json(deletedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
};

//! UPDATE A CATEGORY
module.exports.update = async (req, res) => {
  const { name } = req.body;

  // validation of the data
  const { error } = createCategoryValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  // We query the db
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );

    if (!updatedCategory)
      return res.status(400).json({
        errorMessage: "Nothing updated, make sure your slug is valid",
      });

    res.json(updatedCategory);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

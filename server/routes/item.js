const router = require("express").Router();
const Item = require("../model/Items");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { verifyAuth } = require("../helpers/verifyAuth");

// this route return all the items in items table (not the cart)

router.get("/", async (req, res) => {
  try {
    // We request the db to get all the items
    const items = await Item.find({});
    if (items.length === 0)
      return res.status(404).json({
        errorMessage: "No available data, please add some items first",
      });
    res.json(items);
  } catch (err) {
    res.status(400).json({ errorMessage: error });
  }
});

// This route return specific items based on the query. Search function
router.get("/:query", async (req, res) => {
  // We first check that the query is a string
  if (typeof req.params.query != "string")
    return res.status(400).json({ errorMessage: "Bad request" });

  // Then we ask the db for a list of items matching the query
  const items = await Item.find({ name: req.params.query });
  if (items.length === 0)
    return res
      .status(404)
      .json({ errorMessage: "Not found, no item matching with your query" });

  res.json(items);
});

// This route add a like to an existing item
router.put("/like/:_id", async (req, res) => {
  // We first check if the id is a mongoose.Types.ObjectId
  if (!ObjectId.isValid(req.params._id))
    return res.status(400).send("item's id isn't valid");
  // We then update the element if it exist
  try {
    // this option return the modified item
    const option = { new: true };
    const updatedItem = await Item.findByIdAndUpdate(
      req.params._id,
      { $inc: { likes: 1 } },
      option
    );
    // if updatedItem is null --> no id matching in db, nothing happened
    if (!updatedItem)
      return res.status(400).json({ errorMessage: "Bad request" });
    res.json(updatedItem.likes);
  } catch (err) {
    return err;
  }
});

//! ADMIN ONLY
// This route add an item to items Table Only : Admin part

router.post("/", verifyAuth, async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.descritpion,
    price: parseInt(req.body.price),
  });
  try {
    const savedItem = await item.save();
    res.json({ item: savedItem._id });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
});

module.exports = router;

const router = require("express").Router();
const Item = require("../model/Items");
const Like = require("../model/Like");
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
router.get("/query/:query", async (req, res) => {
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
router.post("/like/:_id", verifyAuth, async (req, res) => {
  // We first check if the id is a mongoose.Types.ObjectId
  if (!ObjectId.isValid(req.params._id))
    return res.status(400).send("item's id isn't valid");

  // We check if the item is already liked or not
  const liked = await Like.findOne({
    userId: req.session.userId,
    itemId: req.params._id,
  });

  // If it is already liked we return an error
  if (liked)
    return res
      .status(401)
      .json({ errorMessage: "You already liked this item." });

  // We create a new like doc
  const like = new Like({
    userId: req.session.userId,
    itemId: req.params._id,
  });

  // We then update the liked item and save the new like object
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

    // Now we can save the like
    const savedLike = await like.save();
    // we only return the liked item's id
    res.json({ itemId: savedLike.itemId }); //! {itemId: "giogjozjgozrgjzo"}
  } catch (err) {
    return err;
  }
});

router.get("/liked", verifyAuth, async (req, res) => {
  const likedItem = await Like.find({ userId: req.session.userId }).select(
    "itemId -_id"
  );
  res.json(likedItem); //! {itemId: "5ahsbabaehezh"}
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

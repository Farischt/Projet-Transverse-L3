const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  itemId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Like", likeSchema);

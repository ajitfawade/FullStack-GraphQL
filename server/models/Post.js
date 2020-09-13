const mongoose = require("mongoose");

const { ObjectID } = mongoose.mongo;

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: "Content is required",
    },
    image: {
      url: {
        type: String,
        default: "https://via.placeholder.com/200x200?text=post",
      },
      public_id: {
        type: String,
        default: Date.now,
      },
    },
    postedBy: {
      type: ObjectID,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

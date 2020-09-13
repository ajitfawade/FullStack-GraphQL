const { gql } = require("apollo-server-express");
const { posts } = require("../temp");
const User = require("../models/User");
const Post = require("../models/Post");
const { authCheck } = require("../helpers/auth");

// resolvers

// Mutation
const postCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  // validation
  if (!args.input.content.trim()) {
    throw new Error("Content is required");
  }
  const user = await User.findOne({ email: currentUser.email });
  const newPost = await new Post({
    ...args.input,
    postedBy: user._id,
  })
    .save()
    .then((post) => {
      post.populate("postedBy", "_id username").execPopulate();
      return newPost;
    })
    .catch((error) => {
      console.error("Error while creating post", error);
    });
};

module.exports = {
  Query: {},
  Mutation: {
    postCreate,
  },
};

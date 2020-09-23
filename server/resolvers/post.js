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
      return post;
    })
    .catch((error) => {
      console.error("Error while creating post", error);
    });
  return newPost;
};

const allPosts = async (parent, args, { req }) => {
  return await Post.find()
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 })
    .exec();
};

const postsByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email }).exec();
  return await Post.find({ postedBy: user._id })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 })
    .exec();
};

const singlePost = async (parent, args) => {
  return await Post.findById(args.postId)
    .populate("postedBy", "username email name _id")
    .exec();
};

const postUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  // validation
  if (!args.input.content.trim()) {
    throw new Error("Content is required");
  }

  // get current user mongodb _id based on email
  const user = await User.findOne({ email: currentUser.email }).exec();

  // _id of post to update
  const post = await Post.findById({ _id: args.input._id }).exec();

  if (!post) throw new Error("Post not found");

  // if current user id and id of the post's postedBy user id same, allow update

  if (user._id.toString() !== post.postedBy._id.toString()) {
    throw new Error("Unauthorized action");
  }

  let updatedPost = await Post.findByIdAndUpdate(
    args.input._id,
    {
      ...args.input,
    },
    { new: true }
  )
    .exec()
    .then((post) => post.populate("postedBy", "_id username").execPopulate());

  return updatedPost;
};

const postDelete = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  // get current user mongodb _id based on email
  const user = await User.findOne({ email: currentUser.email }).exec();

  // _id of post to delete
  const post = await Post.findById({ _id: args.postId }).exec();

  if (!post) throw new Error("Post not found");

  // if current user id and id of the post's postedBy user id same, allow update

  if (user._id.toString() !== post.postedBy._id.toString()) {
    throw new Error("Unauthorized action");
  }

  let deletedPost = await Post.findByIdAndDelete({ _id: args.postId }).exec();

  return deletedPost;
};

module.exports = {
  Query: {
    allPosts,
    postsByUser,
    singlePost,
  },
  Mutation: {
    postCreate,
    postUpdate,
    postDelete,
  },
};

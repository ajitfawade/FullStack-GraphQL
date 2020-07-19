const { gql } = require("apollo-server-express");
const { posts } = require("../temp");
const { authCheck } = require("../helpers/auth");

// resolvers
const totalPosts = () => posts.length;

const allPosts = async (parents, args, { req }) => {
  await authCheck(req);
  return posts;
};

// Mutation
const newPost = (parent, args) => {
  // create a new post object

  const post = {
    id: posts.length + 1,
    title: args.input.title,
    description: args.input.description,
  };

  // push to posts array
  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};

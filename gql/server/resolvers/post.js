const { gql } = require("apollo-server-express");
const { posts } = require("../temp");

// resolvers
const totalPosts = () => posts.length;

const allPosts = () => posts;

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

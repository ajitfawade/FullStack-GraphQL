const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    _id: ID!
    content: String!
    image: Image
    postedBy: User
  }

  # input
  input PostCreateInput {
    content: String!
    image: ImageInput
  }

  input PostUpdateInput {
    _id: String
    content: String!
    image: ImageInput
  }

  type Query {
    allPosts: [Post!]!
    postsByUser: [Post!]!
    singlePost(postId: String): Post!
    totalPosts: Int!
  }

  # Mutations
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
    postUpdate(input: PostUpdateInput!): Post!
    postDelete(postId: String!): Post!
  }
`;

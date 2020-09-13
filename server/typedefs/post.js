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

  type Query {
    totalPosts: Int!
    allPosts: [Post!]!
  }

  # Mutations
  type Mutation {
    postCreate(input: PostCreateInput): Post!
  }
`;

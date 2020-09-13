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
    allPosts: [Post!]!
    postsByUser: [Post!]!
  }

  # Mutations
  type Mutation {
    postCreate(input: PostCreateInput): Post!
  }
`;

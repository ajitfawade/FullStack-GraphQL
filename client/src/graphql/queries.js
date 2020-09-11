import { gql } from "apollo-boost";
import { USER_INFO } from "../graphql/fragments";

export const PROFILE = gql`
  query {
    profile {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

import { gql } from "apollo-boost";
import { USER_INFO } from "../graphql/fragments";

export const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

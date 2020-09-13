import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import UserCard from "../components/UserCard";

const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      username
      name
      email
      about
      images {
        url
        public_id
      }
    }
  }
`;

const SingleUser = () => {
  const { username } = useParams();
  const { loading, data } = useQuery(PUBLIC_PROFILE, {
    variables: { username },
  });
  if (loading) return <p className="p-5">Loading...</p>;
  return (
    <div className="container">
      <br />
      <br />
      <UserCard user={data.publicProfile} />
    </div>
  );
};

export default SingleUser;

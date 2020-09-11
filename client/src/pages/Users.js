import React from "react";
import ApolloClient from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_USERS } from "../graphql/queries";

const Users = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allUsers.map((user) => (
            <div className="col-md-4" key={user._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{user.username}</h4>
                  </div>
                  <div className="card-text">{user.about}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;

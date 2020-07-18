import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const GET_ALL_HOOKS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  //   const [posts, setPosts] = useState([]);
  const { data, loading, error } = useQuery(GET_ALL_HOOKS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_HOOKS);

  // use contexts
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  const updateUserName = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Ajit Fawade",
    });
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{post.title}</h4>
                  </div>
                  <div className="card-text">{post.description}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row p-5">
        <button
          className="btn btn-raised btn-primary"
          onClick={() => fetchPosts()}
        >
          Fetch Posts
        </button>
      </div>
      <hr />
      <div>{JSON.stringify(state.user)}</div>
      <hr />
      <button
        className="btn btn-raised btn-primary"
        onClick={() => updateUserName()}
      >
        Change User Name
      </button>
      <hr />
      <div>{JSON.stringify(history)}</div>
    </div>
  );
};

export default Home;

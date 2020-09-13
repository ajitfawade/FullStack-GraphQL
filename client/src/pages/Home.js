import React from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../graphql/queries";

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);
  const [fetchPosts] = useLazyQuery(GET_ALL_POSTS);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>@{post.postedBy.username}</h4>
                  </div>
                  <p className="card-text">{post.content}</p>
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
    </div>
  );
};

export default Home;

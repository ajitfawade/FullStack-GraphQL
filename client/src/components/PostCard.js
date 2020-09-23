import React from "react";
import Image from "./Image";
import { Link, useHistory } from "react-router-dom";

const PostCard = ({
  post,
  showUpdateButton = false,
  showDeleteButton = false,
  handleDelete = (f) => f,
}) => {
  const { image, content, postedBy } = post;
  const history = useHistory();
  return (
    <div className="card text-center" style={{ minHeight: "375px" }}>
      <div className="card-body">
        <Image image={image} />
        <h4 className="text-primary">@{postedBy.username}</h4>
        <hr />
        <small>{content}</small>
        <br />
        <br />
        {showDeleteButton && (
          <button
            className="btn m-2 btn-danger"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        )}
        {showUpdateButton && (
          <button
            className="btn m-2 btn-info"
            onClick={() => history.push(`/post/update/${post._id}`)}
          >
            Update
          </button>
        )}
      </div>
      <div className=""></div>
    </div>
  );
};

export default PostCard;

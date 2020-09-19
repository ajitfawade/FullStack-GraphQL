import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { image, content, postedBy } = post;
  return (
    <div className="card text-center" style={{ minHeight: "375px" }}>
      <div className="card-body">
        <Image image={image} />
        <h4 className="text-primary">@{postedBy.username}</h4>
        <hr />
        <small>{content}</small>
      </div>
    </div>
  );
};

export default PostCard;

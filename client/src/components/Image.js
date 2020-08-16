import React from "react";

const Image = ({ image, handleImageRemove = (f) => f }) => (
  <img
    src={image.url}
    alt={image.public_id}
    style={{ height: "100px" }}
    className="float-right"
    onClick={() => handleImageRemove(image.public_id)}
  />
);

export default Image;

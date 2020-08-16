import React, { useState, useMemo, useContext, Fragment } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";

import { AuthContext } from "../context/authContext";

const FileUpload = ({ setLoading, setValues, values, loading }) => {
  const { state } = useContext(AuthContext);
  const fileResizeAndUpload = (event) => {
    setLoading(true);
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/upload-images`,
              {
                image: uri,
              },
              { headers: { authtoken: state.user.token } }
            )
            .then((response) => {
              setLoading(false);
              console.log("CLOUDINARY UPLOAD RESPONSE:", response);
              const { images } = values;
              setValues({ ...values, images: [...images, response.data] });
            })
            .catch((error) => {
              setLoading(false);
              console.error("CLOUDINARY UPLOAD FAILED");
            });
        },
        "base64"
      );
    }
  };

  const handleImageRemove = (imageId) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        {
          public_id: imageId,
        },
        { headers: { authtoken: state.user.token } }
      )
      .then((response) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter(
          (item) => item.public_id !== imageId
        );
        setValues({ ...values, images: filteredImages });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="form-group">
          <label className="btn btn-primary">
            Upload Image
            <input
              className="form-control"
              hidden
              accept="image/*"
              placeholder="Image"
              type="file"
              onChange={fileResizeAndUpload}
            />
          </label>
        </div>
      </div>
      <div className="col-md-9">
        {values.images.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt={image.public_id}
            style={{ height: "100px" }}
            className="float-right"
            onClick={() => handleImageRemove(image.public_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

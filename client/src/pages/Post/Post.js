import React, { useState, useContext, useEffect, fragment } from "react";
import toast from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import FileUpload from "../../components/FileUpload";

const initialState = {
  content: "",
  image: { url: "https://via.placeholder.com/200x200.png?text=Post" },
  public_id: "123",
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { content, image, postedBy } = values;

  const handleSubmit = () => {
    //
    setLoading(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="md-textarea form-control"
          placeholder="write something cool"
          maxLength="150"
          value={content}
          onChange={handleChange}
          name="content"
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || !content}
      >
        Post
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>Create</h4>}
      <FileUpload
        values={values}
        loading={loading}
        setValues={setValues}
        setLoading={setLoading}
        singleUpload={true}
      />
      <div className="row">
        <div className="col">{createForm()}</div>
      </div>
      <hr />
      {JSON.stringify(values.image)}
    </div>
  );
};

export default Post;

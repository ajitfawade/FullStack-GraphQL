import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import omitDeep from "omit-deep";
import { useParams } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { GET_SINGLE_POST } from "../../graphql/queries";
import { POST_UPDATE } from "../../graphql/mutations";
import FileUpload from "../../components/FileUpload";

const PostUpdate = () => {
  const [values, setValues] = useState({
    content: "",
    image: { url: "", public_id: "" },
  });

  const [getSinglePost, { data: singlePost }] = useLazyQuery(GET_SINGLE_POST);
  const [postUpdate] = useMutation(POST_UPDATE);

  const [loading, setLoading] = useState(false);
  const { postId } = useParams();
  const { content, image } = values;

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: omitDeep(singlePost.singlePost.image, ["__typename"]),
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId } });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await postUpdate({ variables: { input: values } });
    setLoading(false);
    toast.success("Post Updated");
  };

  const updateForm = () => (
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
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>Update</h4>}
      <FileUpload
        values={values}
        loading={loading}
        setValues={setValues}
        setLoading={setLoading}
        singleUpload={true}
      />
      <div className="row">
        <div className="col">{updateForm()}</div>
      </div>
    </div>
  );
};

export default PostUpdate;

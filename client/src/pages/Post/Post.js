import React, { useState, useContext, useEffect, fragment } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import FileUpload from "../../components/FileUpload";
import { POST_CREATE, POST_DELETE } from "../../graphql/mutations";
import { POSTS_BY_USER } from "../../graphql/queries";
import PostCard from "../../components/PostCard";

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200.png?text=Post",
    public_id: "123",
  },
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { data: posts } = useQuery(POSTS_BY_USER);

  const { content, image, postedBy } = values;

  // mutation
  const [postCreate] = useMutation(POST_CREATE, {
    // update cache

    update: (cache, { data: { postCreate } }) => {
      // read Query from cache
      const { postsByUser } = cache.readQuery({
        query: POSTS_BY_USER,
      });
      // write Query to cache
      cache.writeQuery({
        query: POSTS_BY_USER,
        data: {
          postsByUser: [postCreate, ...postsByUser],
        },
      });
    },

    onError: (error) => console.error(error.graphqQLError[0].message),
  });

  const [postDelete] = useMutation(POST_DELETE, {
    update: ({ data }) => {
      console.log("POST DELETE MUTATION", data);
      toast.error("Post Deleted");
    },

    onError: (error) => {
      console.error(error);
      toast.error("Post delete failed");
    },
  });

  const handleDelete = async (postId) => {
    let answer = window.confirm("Delete?");

    if (answer) {
      setLoading(true);
      postDelete({
        variables: { postId },
        refetchQueries: [{ query: POSTS_BY_USER }],
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await postCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success("Post created successfully");
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
      <div className="row p-5">
        {posts &&
          posts.postsByUser.map((post) => (
            <div className="col-md-6 p-5" key={post._id}>
              <PostCard
                post={post}
                showUpdateButton={true}
                showDeleteButton={true}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_SINGLE_POST } from "../../graphql/queries";
import PostCard from "../../components/PostCard";

const SinglePost = () => {
  const [values, setValues] = useState({
    content: "",
    image: { url: "", public_id: "" },
    postedBy: {},
  });

  const [getSinglePost, { data: singlePost }] = useLazyQuery(GET_SINGLE_POST);

  const { postId } = useParams();

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: singlePost.singlePost.image,
        postedBy: singlePost.singlePost.postedBy,
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId } });
  }, []);

  return (
    <div className="container p-5">
      <PostCard post={{ ...values }} />
    </div>
  );
};

export default SinglePost;

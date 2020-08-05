import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const PROFILE = gql`
  query {
    profile {
      _id
      name
      about
      username
      email
      images {
        url
        public_id
      }
      createdAt
      updatedAt
    }
  }
`;

const Profile = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });
  const { name, username, email, about, images } = values;
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(PROFILE);
  useMemo(() => {
    if (data) {
      console.log("PROFILE:", data.profile);
      setValues({
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: data.profile.images,
      });
    }
  }, [data]);

  const handleSubmit = () => {};

  const handleImageChange = () => {};

  const handleChange = () => {};

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          className="form-control"
          placeholder="Username"
          disabled={loading}
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          placeholder="Name"
          disabled={loading}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          placeholder="Email"
          disabled={loading}
          type="email"
          name="email"
          disabled
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Image</label>
        <input
          className="form-control"
          accept="image/*"
          placeholder="Image"
          type="file"
          onChange={handleImageChange}
        />
      </div>
      <div className="form-group">
        <label>About</label>
        <textarea
          className="form-control"
          placeholder="About"
          disabled={loading}
          name="about"
          value={about}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={!email || loading}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
  return <div className="container">{profileUpdateForm()}</div>;
};

export default Profile;

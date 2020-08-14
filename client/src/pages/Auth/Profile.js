import React, { useState, useMemo, useContext } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import { USER_UPDATE } from "../../graphql/mutations";
import { PROFILE } from "../../graphql/queries";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      setValues({
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ["__typename"]),
      });
    }
  }, [data]);

  // mutation
  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log("USER UPDATE MUTATION IN PROFILE", data);
      toast.success("Profile Updated");
    },
  });

  const { name, username, email, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("VALUES:", values);
    setLoading(true);
    userUpdate({ variables: { input: values } });
    setLoading(false);
  };

  const fileResizeAndUpload = (event) => {
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

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
          onChange={fileResizeAndUpload}
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

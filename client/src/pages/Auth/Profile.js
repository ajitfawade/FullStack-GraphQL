import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import { USER_UPDATE } from "../../graphql/mutations";
import { PROFILE } from "../../graphql/queries";
import { AuthContext } from "../../context/authContext";
import UserProfile from "../../components/forms/UserProfile";
import FileUpload from "../../components/FileUpload";

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

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 pb-3">
          {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4>Profile</h4>
          )}
        </div>
        <FileUpload
          setLoading={setLoading}
          setValues={setValues}
          values={values}
          loading={loading}
        />
      </div>
      <UserProfile
        {...values}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Profile;

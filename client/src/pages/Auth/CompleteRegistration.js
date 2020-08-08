import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { gql } from "apollo-boost";

import { useMutation } from "@apollo/react-hooks";

import { useHistory } from "react-router-dom";

import { auth } from "../../firebase";
import { AuthContext } from "../../context/authContext";
import AuthForm from "../../components/forms/AuthForm";
import { USER_CREATE } from '../../graphql/mutations'


const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailFormRegistration"));
  }, [history]);

  const [userCreate] = useMutation(USER_CREATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // validation
    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //   remove email from localStorage

        window.localStorage.removeItem("emailFormRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);

        // dispatch user with token and email
        // redirect stage

        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });

        // make api request to save/update the user in mongodb

        userCreate();

        history.push("/profile");
      }
      setLoading(false);
    } catch (error) {
      console.error("Register complete error");
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Complete Registration</h4>
      )}
      <AuthForm
        email={email}
        password={password}
        loading={loading}
        setEmail={setEmail}
        setPassword={setPassword}
        showPasswordInput={true}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CompleteRegistration;

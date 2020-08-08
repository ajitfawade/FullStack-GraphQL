import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { auth, googleAuthProvider } from "../../firebase";
import { AuthContext } from "../../context/authContext";
import AuthForm from "../../components/forms/AuthForm";
import { USER_CREATE } from "../../graphql/mutations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);

  let history = useHistory();

  const [userCreate] = useMutation(USER_CREATE);

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: idTokenResult.token },
      });

      // send user info to our server either to update/create
      userCreate();
      history.push("/profile");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();
          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: user.email, token: idTokenResult.token },
          });

          // send user info to our server either to update/create
          userCreate();
          history.push("/profile");
        });
    } catch (error) {
      console.error("Login Error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>Login</h4>}
      <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">
        Login with Google
      </button>
      <AuthForm
        email={email}
        password={password}
        loading={loading}
        setEmail={setEmail}
        setPassword={setPassword}
        showPasswordInput={true}
        handleSubmit={handleSubmit}
      />
      <Link className="text-danger float-right" to="/password/forgot">
        Forgot Password
      </Link>
    </div>
  );
};

export default Login;

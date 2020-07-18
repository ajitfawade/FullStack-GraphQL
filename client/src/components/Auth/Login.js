import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { auth, googleAuthProvider } from "../../firebase";
import { AuthContext } from "../../context/authContext";

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

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
      history.push("/");
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
          history.push("/");
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            disabled={loading}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            disabled={loading}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || !password || loading}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

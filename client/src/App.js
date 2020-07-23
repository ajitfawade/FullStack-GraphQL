import React, { useContext } from "react";
import ApolloClient from "apollo-boost";
import { Switch, Route } from "react-router-dom";

// Import components
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CompleteRegistration from "./pages/Auth/CompleteRegistration";
import { AuthContext } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/Auth/ResetPassword";
import Profile from "./pages/Auth/Profile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Post from "./pages/Post/Post";

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/complete-registration"
          exact
          component={CompleteRegistration}
        />
        <Route path="/password/forgot" exact component={ForgotPassword} />
        <PrivateRoute path="/password/update" exact component={ResetPassword} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/post/create" exact component={Post} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;

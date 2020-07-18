import React, { useContext } from "react";
import ApolloClient from "apollo-boost";
import { Switch, Route } from "react-router-dom";

// Import components
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CompleteRegistration from "./components/Auth/CompleteRegistration";
import { AuthContext } from "./context/authContext";

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
      </Switch>
    </ApolloProvider>
  );
};

export default App;

import React, { useState, useContext, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state.user) setUser(true);
  }, [state.user]);

  const navLinks = () => (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/password/update">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/post/create">
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-4">{navLinks()}</div>
        <div className="col-md-8">
          <Route {...rest} />
        </div>
      </div>
    </div>
  );

  return user ? renderContent() : <LoadingToRedirect path="/login" />;
};

export default PrivateRoute;

import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div className="container p-5">
      <div className="row p-5">
        <h4>Login</h4>
        <form onSubmit={handleSubmit()}>
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
        </form>
      </div>
    </div>
  );
};

export default Login;

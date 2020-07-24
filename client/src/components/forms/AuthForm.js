import React from "react";

const AuthForm = ({
  handleSubmit,
  setEmail = (f) => f,
  setPassword,
  email = "",
  password = "",
  loading,
  showPasswordInput = false,
  hideEmailInput = false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {!hideEmailInput && (
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
      )}
      {showPasswordInput && (
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
      )}
      <button
        className="btn btn-raised btn-primary"
        disabled={loading}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AuthForm;

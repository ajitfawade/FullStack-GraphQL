import React from "react";

const AuthForm = ({
  handleSubmit,
  setEmail,
  setPassword,
  email,
  password = "",
  loading,
  showPasswordInput = false,
}) => {
  return (
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
        disabled={!email || loading}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AuthForm;

import React from "react";

const UserProfile = ({
  handleSubmit,
  handleChange,
  username,
  email,
  about,
  loading,
  name,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          className="form-control"
          placeholder="Username"
          disabled={loading}
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          placeholder="Name"
          disabled={loading}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          placeholder="Email"
          disabled={loading}
          type="email"
          name="email"
          disabled
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>About</label>
        <textarea
          className="form-control"
          placeholder="About"
          disabled={loading}
          name="about"
          value={about}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={!email || loading}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default UserProfile;

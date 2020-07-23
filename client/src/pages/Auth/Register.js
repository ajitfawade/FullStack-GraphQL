import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import AuthForm from "../../components/forms/AuthForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    const result = await auth.sendSignInLinkToEmail(email, config);

    console.log("PRINTING RESULT:", result);

    // show toast notification to user about email sent
    toast.success(
      `Email sent to ${email}. Click the link to complete your registration`
    );
    // save user email to localStorage
    window.localStorage.setItem("emailFormRegistration", email);

    // clear state
    setEmail("");
    setLoading(false);
  };
  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>Register</h4>}
      <AuthForm
        loading={loading}
        setEmail={setEmail}
        email={email}
        showPasswordInput={false}
        handleSubmit={handleSubmit}
      />
      {/* <form onSubmit={handleSubmit}>
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
        <button
          className="btn btn-raised btn-primary"
          disabled={loading || !email}
          type="submit"
        >
          Submit
        </button>
      </form> */}
    </div>
  );
};

export default Register;

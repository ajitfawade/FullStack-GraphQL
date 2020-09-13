import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import AuthForm from "../../components/forms/AuthForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth
      .sendPasswordResetEmail(email)
      .then((resp) => {
        setEmail("");
        setLoading(false);
        toast.success(
          `Email is sent to ${email}. Click on the link to reset your password`
        );
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error in forgot password email", error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <AuthForm
        email={email}
        loading={loading}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ForgotPassword;

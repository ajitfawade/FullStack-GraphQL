import React, { useState } from "react";
import { toast } from "react-toastify";

import AuthForm from "../../components/forms/AuthForm";
import { auth } from "../../firebase";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password updated successfully");
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
      });
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Reset Password</h4>
      )}
      <AuthForm
        loading={loading}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        hideEmailInput={true}
      />
    </div>
  );
};

export default ResetPassword;

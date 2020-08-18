import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoginToRedirect = ({ path }) => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    // redirect once count is zero
    count === 0 && history.push(path);

    // perform clean up
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoginToRedirect;

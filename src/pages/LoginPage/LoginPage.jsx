import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, resetLoginRequest } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    dispatch(resetLoginRequest());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(credentials));
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);
  console.log("from the file:", error);
  return (
    <div className="login-page">
      <div className="login-left">
        <h2>
          <strong>Welcome to School Vaccination Portal</strong>
        </h2>
        <p className="login-description">
          Get started – it’s free. No school code needed.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>
        {error && (
          <p className="error">
            Incorrect username or password/ User not found
          </p>
        )}
      </div>
      <div className="login-right">
        <div className="illustration" />
      </div>
    </div>
  );
};

export default LoginPage;

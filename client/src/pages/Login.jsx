import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await API.post(
      "/auth/login",
      formData
    );

    console.log(res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "username",
      res.data.user.username
    );

    navigate("/");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Login failed"
    );

  }

};
  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1 className="auth-title">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="auth-input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="auth-input"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="auth-btn"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;
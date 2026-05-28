import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
        "/auth/signup",
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup failed");

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1 className="auth-title">
          Signup
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className="auth-input"
          onChange={handleChange}
        />

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
          Signup
        </button>

      </form>

    </div>

  );

}

export default Signup;
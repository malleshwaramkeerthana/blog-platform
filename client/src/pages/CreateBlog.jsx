import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/CreateBlog.css";

function CreateBlog() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/blogs/create",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Failed to create blog");

    }

  };

  return (

    <div className="create-container">

      <form
        className="create-form"
        onSubmit={handleSubmit}
      >

        <h1 className="create-title">
          Create Blog
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          className="create-input"
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Enter blog content"
          rows="8"
          className="create-textarea"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="create-btn"
        >
          Create Blog
        </button>

      </form>

    </div>

  );

}

export default CreateBlog;
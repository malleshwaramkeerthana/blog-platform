import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";

import "../styles/CreateBlog.css";

function EditBlog() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    try {

      const res = await API.get("/blogs");

      const blog = res.data.find(
        (b) => b.id == id
      );

      if (blog) {

        setFormData({
          title: blog.title,
          content: blog.content,
        });

      }

    } catch (error) {

      console.log(error);

    }

  };

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

      await API.put(
        `/blogs/update/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Blog updated successfully");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Failed to update blog");

    }

  };

  return (

    <div className="create-container">

      <form
        className="create-form"
        onSubmit={handleSubmit}
      >

        <h1 className="create-title">
          Edit Blog
        </h1>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="create-input"
        />

        <textarea
          name="content"
          rows="8"
          value={formData.content}
          onChange={handleChange}
          className="create-textarea"
        />

        <button
          type="submit"
          className="create-btn"
        >
          Update Blog
        </button>

      </form>

    </div>

  );

}

export default EditBlog;
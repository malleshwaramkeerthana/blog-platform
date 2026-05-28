import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/Home.css";

function MyBlogs() {

  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await API.get("/blogs");

      const userBlogs = res.data.filter(
        (blog) => blog.username === username
      );

      setBlogs(userBlogs);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchBlogs();

    } catch (error) {

      console.log(error);

      alert("Failed to delete blog");

    }

  };

  return (

    <div className="home-container">

      <h1 className="home-title">
        My Blogs
      </h1>

      {
        blogs.length === 0 ? (

          <h3>No blogs created yet</h3>

        ) : (

          blogs.map((blog) => (

            <div
              key={blog.id}
              className="blog-card"
            >

              <h2 className="blog-title">
                {blog.title}
              </h2>

              <p className="blog-content">

                {
                  blog.content.length > 60
                    ? blog.content.substring(0, 60) + "..."
                    : blog.content
                }

              </p>

              <button
                onClick={() =>
                  navigate(`/edit-blog/${blog.id}`)
                }
                style={{
                  marginRight: "10px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

            </div>

          ))

        )
      }

    </div>

  );

}

export default MyBlogs;
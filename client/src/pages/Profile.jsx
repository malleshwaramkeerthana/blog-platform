import { useEffect, useState } from "react";

import API from "../services/api";

function Profile() {

  const [blogs, setBlogs] = useState([]);

  const username = localStorage.getItem("username");

  const email = localStorage.getItem("email");

  useEffect(() => {

    fetchMyBlogs();

  }, []);

  const fetchMyBlogs = async () => {

    try {

      const res = await API.get("/blogs");

      const myBlogs = res.data.filter(
        (blog) => blog.username === username
      );

      setBlogs(myBlogs);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >

      {/* PROFILE CARD */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >

        <h1
          style={{
            marginBottom: "15px",
          }}
        >
          👤 Profile
        </h1>

        <h2>
          {username}
        </h2>

        <p>
          {email}
        </p>

        <p
          style={{
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          Total Blogs: {blogs.length}
        </p>

      </div>

      {/* USER BLOGS */}

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        My Blogs
      </h2>

      {
        blogs.length === 0 ? (

          <p>No blogs created yet.</p>

        ) : (

          blogs.map((blog) => (

            <div
              key={blog.id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >

              <h3>
                {blog.title}
              </h3>

              <p>
                {blog.content.slice(0, 120)}...
              </p>

            </div>

          ))

        )
      }

    </div>

  );

}

export default Profile;
import { useEffect, useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

import "../styles/Home.css";

function Home() {

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState({});

  const navigate = useNavigate();

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await API.get("/blogs");

      setBlogs(res.data);

      res.data.forEach((blog) => {

        fetchLikes(blog.id);

      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const fetchLikes = async (blogId) => {

    try {

      const res = await API.get(
        `/likes/${blogId}`
      );

      setLikes((prev) => ({
        ...prev,
        [blogId]: res.data.likes,
      }));

    } catch (error) {

      console.log(error);

    }

  };

  const handleLike = async (blogId) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        `/likes/${blogId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchLikes(blogId);

    } catch (error) {

      console.log(error);

      alert("Login to like blogs");

    }

  };

  const handleDelete = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/blogs/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchBlogs();

    } catch (error) {

      console.log(error);

      alert("Failed to delete blog");

    }

  };

  return (

    <div className="home-container">

      {/* HERO SECTION */}

      <div className="hero-section">

        <h1 className="hero-title">
          Share Your Ideas With The World
        </h1>

        <p className="hero-subtitle">

          Create blogs, connect with readers,
          and express yourself beautifully.

        </p>

        <button className="hero-btn">

          Start Reading

        </button>

      </div>

      {/* PAGE TITLE */}

      <h1 className="home-title">

        All Blogs

      </h1>

      {/* BLOGS */}

      {
        loading ? (

          <h3>Loading blogs...</h3>

        ) : blogs.length === 0 ? (

          <h3>No blogs available</h3>

        ) : (

          blogs.map((blog) => (

            <div
              key={blog.id}
              className="blog-card"
            >

              {/* BLOG TITLE */}

              <h2 className="blog-title">

                {blog.title}

              </h2>

              {/* BLOG PREVIEW */}

              <p className="blog-content">

                {
                  blog.content.length > 20

                    ? blog.content.substring(0, 15) + "..."

                    : blog.content
                }

              </p>

              {/* READ MORE */}

              <Link
                to={`/blogs/${blog.id}`}
                className="read-btn"
              >

                Read More →

              </Link>

              {/* LIKE BUTTON */}

              <div className="like-section">

                <button
                  onClick={() =>
                    handleLike(blog.id)
                  }
                  className="like-btn"
                >

                  ❤️ {likes[blog.id] || 0}

                </button>

              </div>

              {/* AUTHOR */}

              <small className="blog-author">

                By: {blog.username}

              </small>

              {/* EDIT + DELETE */}

              {
                localStorage.getItem("username") ===
                blog.username && (

                  <div className="blog-actions">

                    <button
                      onClick={() =>
                        navigate(
                          `/edit-blog/${blog.id}`
                        )
                      }
                      className="
                        action-btn edit-btn
                      "
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(blog.id)
                      }
                      className="
                        action-btn delete-btn
                      "
                    >

                      Delete

                    </button>

                  </div>

                )
              }

            </div>

          ))

        )
      }

    </div>

  );

}

export default Home;
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

function BlogDetails() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {

    fetchBlog();

    fetchComments();

  }, []);

  const fetchBlog = async () => {

    try {

      const res = await API.get(`/blogs/${id}`);

      setBlog(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchComments = async () => {

    try {

      const res = await API.get(
        `/comments/${id}`
      );

      setComments(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleComment = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        `/comments/${id}`,
        {
          content: commentText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCommentText("");

      fetchComments();

    } catch (error) {

      console.log(error);

      alert("Login to comment");

    }

  };

  if (!blog) {

    return <h2>Loading...</h2>;

  }

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >

      <h1
        style={{
          fontSize: "48px",
          marginBottom: "25px",
          color: "#0f172a",
        }}
      >
        {blog.title}
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        By {blog.username}
      </p>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.9",
          color: "#334155",
        }}
      >
        {blog.content}
      </p>

      {/* COMMENTS */}

      <div
        style={{
          marginTop: "50px",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Comments
        </h2>

        <textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) =>
            setCommentText(e.target.value)
          }
          rows="4"
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #cbd5e1",
            marginBottom: "15px",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleComment}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          Add Comment
        </button>

        {
          comments.map((comment) => (

            <div
              key={comment.id}
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "14px",
                marginBottom: "15px",
              }}
            >

              <p
                style={{
                  marginBottom: "8px",
                }}
              >
                {comment.content}
              </p>

              <small
                style={{
                  color: "#64748b",
                }}
              >
                By: {comment.username}
              </small>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default BlogDetails;
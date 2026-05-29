import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");

  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        BlogSphere
      </Link>

      <div className="nav-links">

        {token && (
          <span className="welcome-text">
            Welcome, {username}
          </span>
        )}

        {token && (
          <Link
            to="/my-blogs"
            className="nav-link"
          >
            My Blogs
          </Link>
        )}

        {token && (
          <Link
            to="/create-blog"
            className="nav-link"
          >
            Create Blog
          </Link>
        )}

        {token && (
          <Link
            to="/profile"
            className="nav-link"
          >
            Profile
          </Link>
        )}

        {!token ? (
          <>
            <Link
              to="/login"
              className="nav-link"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="nav-link"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
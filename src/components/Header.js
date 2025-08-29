import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ReactLogo from "../asset/react-logo.png";
import starterPosts from "../data/posts"; // 👈 import your starter posts

const Header = ({ onReset, posts }) => {
  const starterCount = starterPosts.length; // auto-detect length
  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={ReactLogo}
              alt="React Logo"
              style={{ width: "30px", marginRight: "10px" }}
            />
            <span>The React Blog.</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category/technology">
                  Tech
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category/business">
                  Business
                </Link>
              </li>

              {/* Reset button visible only if posts > starter */}
              {posts.length > starterCount && (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link reset-link"
                    onClick={onReset}
                  >
                    Reset Data
                  </button>
                </li>
              )}

              {/* Admin Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/posts">
                      Manage Posts
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/posts/add">
                      Add Post
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

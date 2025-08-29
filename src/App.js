// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import CategoryPosts from "./pages/CategoryPosts";

// ✅ Import admin pages
import AdminPosts from "./pages/admin/AdminPosts";
import AdminEditPost from "./pages/admin/AdminEditPost";
import AdminAddPost from "./pages/admin/AdminAddPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  // Load posts from backend (SQLite)
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        // sort newest first
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setPosts(sorted);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // ✅ reset function in App (calls backend reset endpoint if we want)
  const handleReset = async () => {
    try {
      const res = await fetch("http://localhost:5000/reset", {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data); // reset with backend data
      }
    } catch (err) {
      console.error("Reset failed", err);
    }
  };

  return (
    <Router>
      <Header onReset={handleReset} posts={posts} />
      <div className="container">
        <div className="row">
          <Routes>
            {/* Public pages */}
            <Route
              path="/"
              element={<Home posts={posts} onReset={handleReset} />}
            />
            <Route path="/post/:id" element={<PostDetail posts={posts} />} />

            <Route
              path="/category/:category"
              element={<CategoryPosts posts={posts} />}
            />
            <Route path="*" element={<NotFound />} />

            {/* Admin pages */}
            <Route
              path="/admin/posts"
              element={<AdminPosts posts={posts} setPosts={setPosts} />}
            />
            <Route
              path="/admin/posts/edit/:id"
              element={<AdminEditPost posts={posts} setPosts={setPosts} />}
            />
            <Route
              path="/admin/posts/add"
              element={<AdminAddPost setPosts={setPosts} />}
            />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

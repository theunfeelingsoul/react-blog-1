// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';
import CategoryPosts from './pages/CategoryPosts';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getPosts } from './api'; // ✅ use API helper

// 🔹 Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminCreatePost from './pages/admin/AdminCreatePost';
import AdminEditPost from './pages/admin/AdminEditPost';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch posts from backend when the app loads
  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Router>
      <Header posts={posts} />
      <div className="wrapper flex-grow-1">
        <main className="content">
          <div className="container steve">
            <div className="row">
              <Routes>
                {/* Public side */}
                <Route
                  path="/"
                  element={<Home posts={posts} loading={loading} />}
                />
                <Route
                  path="/post/:id"
                  element={<PostDetail posts={posts} />}
                />
                <Route
                  path="/category/:category"
                  element={<CategoryPosts posts={posts} />}
                />

                {/* Admin side */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/posts"
                  element={<AdminPosts posts={posts} setPosts={setPosts} />}
                />
                <Route
                  path="/admin/new"
                  element={
                    <AdminCreatePost posts={posts} setPosts={setPosts} />
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={<AdminEditPost posts={posts} setPosts={setPosts} />}
                />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

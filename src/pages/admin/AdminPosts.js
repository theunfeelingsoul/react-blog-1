// ./src/pages/admin/AdminPosts.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./_AdminSidebar";
import { getPosts, deletePost } from "../../api"; // central API helpers

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMessage("✅ Post deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Error deleting post");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2 admin-sidebar">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <h2>Manage Posts</h2>
          <hr />
          {message && <div className="alert alert-info">{message}</div>}
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Content</th>
                <th>Image</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No posts found
                  </td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{formatDate(post.date)}</td>
                    <td>{post.content.slice(0, 100)}...</td>
                    <td>{post.image}</td>
                    <td>{post.category}</td>
                    <td>
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPosts;

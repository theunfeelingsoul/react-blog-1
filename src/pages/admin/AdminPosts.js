// AdminPost.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './_AdminSidebar';

function PostsTable() {
  const [posts, setPosts] = useState([]); //
  const [message, setMessage] = useState('');

  // Fetch posts when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/posts') // adjust port if needed
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        setMessage('✅ Post deleted successfully');
        setTimeout(() => setMessage(''), 3000); // clear message after 3s
      } else {
        setMessage('❌ Failed to delete post');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('❌ Error deleting post');
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
                <th>image</th>
                <th>category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
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
                        to={`/admin/edit/${post.id}`}
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
      {/* End .row */}
    </div>
  );
}

export default PostsTable;

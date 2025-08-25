// NewPost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './_AdminSidebar';

function NewPost({ setPosts }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
  });

  const navigate = useNavigate();

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (send data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      const savedPost = await response.json();

      // Update frontend state so UI refreshes
      setPosts((prevPosts) => [savedPost, ...prevPosts]);

      // Reset form
      setFormData({
        title: '',
        content: '',
        image: '',
        category: '',
      });

      // Redirect home
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error saving post. Check server.');
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2 admin-sidebar">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <h3>📝 New Post</h3>
            <hr />
            <br />

            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="col">
                    <label className="form-label">Feature Image</label>
                    <select
                      className="form-select"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                    >
                      <option value="">Choose...</option>
                      <option>meta.png</option>
                      <option>android.png</option>
                      <option>leader.png</option>
                      <option>gemini.png</option>
                      <option>bizidea.png</option>
                      <option>googlecloud.png</option>
                    </select>
                  </div>

                  <div className="col">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Choose...</option>
                      <option>technology</option>
                      <option>business</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="col">
                    <label className="form-label">Title :</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder=""
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col">
                    <label className="form-label">Post Content</label>
                    <textarea
                      className="form-control"
                      rows="6"
                      name="content"
                      placeholder="Write your post here..."
                      value={formData.content}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success">
                    💾 Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/posts')}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;

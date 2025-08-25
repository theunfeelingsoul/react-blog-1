// UpdateForm.js
import React, { useState, useEffect } from 'react';
import Sidebar from './_AdminSidebar';

function UpdateForm({ post, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: '',
  });

  // ✅ Populate form once post is available
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category: post.category || '',
        image: post.image || '',
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update post');

      const data = await res.json();
      if (data) {
        onUpdated({ ...formData, id: post.id });
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="mt-4">
      <div className="row">
        {/* start .admin-sidebar */}
        <div className="col-md-2 admin-sidebar">
          <Sidebar />
        </div>
        {/* end .admin-sidebar */}

        {/* start form */}
        <div className="col-md-10">
          <h3 className="">✏️ Edit Post</h3>
          <hr />
          <br />
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                {/* Image */}
                <div className="col">
                  <label className="form-label">Image URL</label>
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

                {/* Category */}
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
              {/* ./col-md-4 */}

              <div className="col-md-8">
                {/* Title */}
                <div className="col">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    required
                  />
                </div>

                {/* Content */}
                <div className="col">
                  <label className="form-label">Content</label>
                  <textarea
                    name="content"
                    className="form-control"
                    rows="5"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your post content..."
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  💾 Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
            <hr />
          </form>
        </div>
        {/* end form */}
      </div>
    </div>
  );
}

export default UpdateForm;

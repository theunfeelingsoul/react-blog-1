// _AdminUpdateForm.js
import React, { useState, useEffect } from "react";
import Sidebar from "./_AdminSidebar";
import { updatePost } from "../../api";

function UpdateForm({ post, onClose, onUpdated }) {
  const [formData, setFormData] = useState(post || {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Update form data if post changes
  useEffect(() => {
    if (post) setFormData(post);
  }, [post]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updatePost(post.id, formData);
      onUpdated({ ...formData, id: post.id });
    } catch (err) {
      console.error("Update failed:", err);
      setError("❌ Failed to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!post) return <p>⏳ Loading post...</p>;

  return (
    <div className="mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <Sidebar />
        </div>

        {/* Form */}
        <div className="col-md-10">
          <h3>✏️ Edit Post</h3>
          <hr />

          {error && <div className="alert alert-danger">{error}</div>}

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="row">
              {/* Left column */}
              <div className="col-md-4">
                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <select
                    className="form-select"
                    name="image"
                    value={formData.image || ""}
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
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option>technology</option>
                    <option>business</option>
                  </select>
                </div>
              </div>

              {/* Right column */}
              <div className="col-md-8">
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title || ""}
                    onChange={handleChange}
                    placeholder="Post title"
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    name="content"
                    className="form-control"
                    rows="5"
                    value={formData.content || ""}
                    onChange={handleChange}
                    placeholder="Write your post content..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="col-12 d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success"
                disabled={saving}
              >
                {saving ? "💾 Saving..." : "💾 Save"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateForm;

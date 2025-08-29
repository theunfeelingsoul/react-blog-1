// ./src/pages/admin/AdminAddPost.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api";
import Sidebar from "./_AdminSidebar";

function AdminAddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const newPost = {
      title,
      content,
      image,
      category,
      date: new Date().toISOString(),
    };

    try {
      await createPost(newPost);
      navigate("/admin/posts");
    } catch (err) {
      console.error("Create error:", err);
      setError("❌ Failed to add post");
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2 admin-sidebar">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <h3>📝 New Post</h3>
            <hr />
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="col">
                    <label className="form-label">Feature Image</label>
                    <select
                      className="form-select"
                      name="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
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
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                    onClick={() => navigate("/admin/posts")}
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
    </div>
  );
}

export default AdminAddPost;

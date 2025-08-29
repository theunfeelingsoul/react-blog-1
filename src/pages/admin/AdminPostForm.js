import { useEffect, useState } from "react";

function AdminPosts() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Fetch posts error:", err));
  }, []);

  // Delete a post
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id)); // update local state
  };

  return (
    <div>
      <h2>Admin - Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPosts;

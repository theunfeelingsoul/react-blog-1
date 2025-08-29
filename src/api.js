const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// fetch all posts
export async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
}

// fetch single post
export async function getPost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
}

// create new post
export async function createPost(post) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return await res.json();
}

// update post
export async function updatePost(id, post) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return await res.json();
}

// delete post
export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
  return await res.json();
}

// reset DB
export async function resetPosts() {
  const res = await fetch(`${API_BASE}/reset`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to reset posts");
  return await res.json();
}

// AdminEditPost.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UpdateForm from './_AdminUpdateForm'; // keep your existing UpdateForm in the same folder

function AdminEditPost({ posts, setPosts }) {
  const { id } = useParams(); // Get the post ID from URL
  const navigate = useNavigate();

  // Find the post from App.js state
  const post = posts.find((p) => p.id === Number(id));

  const handleUpdated = (updatedPost) => {
    // Update posts state in App.js
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    navigate('/admin/posts'); // Redirect after update
  };

  // If post not found (still loading), show a loader
  if (!post) return <p>Loading...</p>;

  return (
    <UpdateForm
      post={post}
      onUpdated={handleUpdated}
      onClose={() => navigate('/admin/posts')}
    />
  );
}

export default AdminEditPost;

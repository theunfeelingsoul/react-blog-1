// PostDetail.js
import React from "react";
import { useParams } from "react-router-dom";

function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p><em>{post.date}</em></p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
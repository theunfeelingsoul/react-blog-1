// PostDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Sidebar from '../components/Sidebar';

function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <h1>{post.title}</h1>
          <p>
            <em>{post.date}</em>
          </p>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="col-md-4">
          {/* Sidebar */}
          <Sidebar posts={posts} />
        </div>
      </div>
      {/* end .row */}
    </div>
  ); // end return
}

export default PostDetail;

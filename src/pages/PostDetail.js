import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";

function NewsItem({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    // fetch single post
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    // fetch all posts for sidebar
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  }, [id]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="post-detail">
          <h1>{post.title}</h1>
          <hr />
          {/* image floated left, text wraps around */}
          {post.image && (
            <img
              src={`/asset/blog/${post.image}`} // 👈 assumes your images live in /public/images/
              alt={post.title}
              className="post-image"
            />
          )}
          <div className="post-content">
            <p>
              <NewsItem htmlContent={post.content} />
            </p>
          </div>
        </div>

        {/* <h1>{post.title}</h1>
        <p>
          <em>{formatDate(post.date)}</em>
        </p>
        <ReactMarkdown>{post.content}</ReactMarkdown> */}
      </div>

      <div className="col-md-4">
        <Sidebar posts={allPosts} />
      </div>
    </div>
  );
}

export default PostDetail;

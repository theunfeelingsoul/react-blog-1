import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/textHelpers";
import Sidebar from "../components/Sidebar";

function CategoryPosts() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const filteredPosts = posts.filter((post) => post.category === category);

  if (filteredPosts.length === 0) {
    return (
      <div>
        <h2>No posts found in {capitalizeFirstLetter(category)}</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <hr />
          <h2>{capitalizeFirstLetter(category)}</h2>
          <hr />

          {filteredPosts.map((post) => (
            <div key={post.id} className="card mb-3 margin-right-ten">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`/asset/blog/${post.image}`}
                    className="img-fluid rounded-start w-70 h-70 object-fit-cover"
                    alt="blog post"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/post/${post.id}`}>
                        <strong>{post.title}</strong>
                      </Link>
                    </h5>
                    {/* <p className="card-text">
                      {post.content.length > 50
                        ? post.content.substring(0, 50) + "..."
                        : post.content}
                    </p> */}
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Category: <b>{capitalizeFirstLetter(post.category)}</b>
                      </small>
                    </p>
                    <Link to={`/post/${post.id}`}>Continue reading</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <Sidebar posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPosts;

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/textHelpers";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // fetch posts on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div>
      <div className="p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal text-body-emphasis"> Welcome 🚀 </h1>
        <p className="fs-5 text-body-secondary">
          The React Blog is a simple, fast, and dynamic blog built with React
          and powered by PostgreSQL.
          <br />
          Explore posts, add your own, and reset anytime — all backed
          <br />
          by a reliable relational database for smooth performance and
          scalability.
        </p>
      </div>

      <div className="row g-0 margin-left-ten offset-md-2">
        {posts.map((post) => (
          <div key={post.id} className="card mb-3 col-md-5 margin-right-ten">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`/asset/blog/${post.image}`}
                  className="img-fluid rounded-start w-100 h-100 object-fit-cover"
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
    </div>
  );
};

export default Home;

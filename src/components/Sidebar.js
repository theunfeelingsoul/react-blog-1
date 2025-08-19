import React from "react";
import { Link } from "react-router-dom";
// import posts from "../data/posts";
import { capitalizeFirstLetter } from "../utils/textHelpers";

function Sidebar({posts}) {
  // unique categories
  // const categories = [...new Set(posts.map((post) => post.cat))];
  const categories = [...new Set(posts.map((post) => post.cat).filter(Boolean))];


  // latest posts (sorted by date desc)
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); // limit to 5 latest

  return (
    <div className="col-mcd-4 blog-sidebar">
      {/* Categories */}
      <div className="blog-topic">
        <br />
        <div className="card">
          <div className="card-header">
            <h4>Topics</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <li key={`${cat}-${index}`} className="list-group-item">
                    <Link to={`/category/${cat}`}> {capitalizeFirstLetter(cat)} </Link>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No categories found</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <br />

      {/* Latest posts */}
      <div className="blog-list-limit">
        <div className="card">
          <div className="card-header">
            <h4>Recent Blogs</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {latestPosts.map((post) => (
                <li key={post.id} className="list-group-item">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

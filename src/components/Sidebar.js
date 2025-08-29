import React from "react";
import { Link } from "react-router-dom";
// import posts from "../data/posts";
import { capitalizeFirstLetter } from "../utils/textHelpers";

function Sidebar({ posts }) {
  // unique category
  // const category = [...new Set(posts.map((post) => post.cat))];
  const category = [
    ...new Set(posts.map((post) => post.category).filter(Boolean)),
  ];

  console.log("category in Sidebar:", category);

  // latest posts (sorted by date desc)
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); // limit to 5 latest

  return (
    <div className="col-mcd-4 blog-sidebar">
      {/* category */}
      <div className="blog-topic">
        <br />
        <div className="card">
          <div className="card-header">
            <h4>Topics</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush client-sidebar">
              {category.length > 0 ? (
                category.map((category, index) => (
                  <li key={`${category}-${index}`} className="list-group-item">
                    <Link to={`/category/${category}`}>
                      {" "}
                      {capitalizeFirstLetter(category)}{" "}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No category found</li>
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
            <ul className="list-group list-group-flush client-sidebar">
              {latestPosts.map((post) => (
                <li key={post.id} className="list-group-item">
                  <Link to={`/post/${post.id}`}>
                    {capitalizeFirstLetter(post.title)}
                  </Link>
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

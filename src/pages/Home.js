import { Link } from "react-router-dom";
import React from "react";
import ReactLogo from '../asset/react-logo.png';
import { capitalizeFirstLetter } from "../utils/textHelpers";

const Home = ({ posts }) => {
    console.log("Home posts:", posts);
    return (
        <div>
            <h1>Blog Posts</h1>
            <div className="row g-0">
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
                                    <p className="card-text">
                                        {post.content.length > 50
                                            ? post.content.substring(0, 50) + "..."
                                            : post.content}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">
                                            Category: <b>{capitalizeFirstLetter(post.cat)}</b>
                                        </small>
                                    </p>
                                    <Link to={`/post/${post.id}`}>
                                        Continue reading
                                    </Link>
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

import { Link } from "react-router-dom";
import posts from "../data/posts";
import React from "react";
import ReactLogo from '../asset/react-logo.png';
import android from '../asset/blog/android.png';
import meta from '../asset/blog/meta.png';
import gemini from '../asset/blog/gemini.png';
import { capitalizeFirstLetter } from "../utils/textHelpers";

const Home = ({posts}) => {
    return (
        <div>
            <h1>Blog Posts</h1>
            <div className="row g-0">
                {posts
                    // .filter(post => post.featured) 
                    // .slice(0,2)
                    .map((post) => (
                    
                        // start card
                        <div className="card mb-3 col-md-5 margin-right-ten">
                          <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src={require(`../asset/blog/${post.image}`)} 
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
                                    {
                                        post.content.length > 50
                                        ? post.content.substring(0, 50) + "..."
                                        : post.content
                                    }
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary">Category: <b>{capitalizeFirstLetter(post.cat)}</b>
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
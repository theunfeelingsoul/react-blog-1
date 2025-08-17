import { Link } from "react-router-dom";
import posts from "../data/posts";
import React from "react";

const Home = ({posts}) => {
    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            <strong>{post.title}</strong>
                        </Link>{" "}
                        ({post.date})
                    </li>    
                ))}
            </ul>
        </div>
    );
};


export default Home;
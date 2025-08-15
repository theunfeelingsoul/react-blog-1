import { Link } from "react-router-dom";
import posts from "../data/posts";

const Home = () => {
    return (
        <div>
            <h2>Latest Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="post-preview">
                    <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                    <p>{post.excerpt}</p>
                </div>
            ))}
        </div>
    );
};


export default Home;
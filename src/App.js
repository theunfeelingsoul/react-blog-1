import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import logo from './logo.svg';
import './App.css';
import PostData from "./data/posts";
import CategoryPosts from "./pages/CategoryPosts";



function App() {
  // posts state
  const [posts, setPosts] = useState(PostData);
  // const [posts, setPosts] = useState([]);

  return (
    <Router>
      <Header />
        <div className="container">
        <div className="row">
          <Routes>
            <Route path="/" element={<Home posts={posts} />}/>
            <Route path="/post/:id" element={<PostDetail posts={posts} />}/>
            <Route path="/new" element={<NewPost setPosts={setPosts}/>} />
            <Route path="/category/:category" element={<CategoryPosts />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>  
        </div>  
    </Router>
  );
}

export default App;

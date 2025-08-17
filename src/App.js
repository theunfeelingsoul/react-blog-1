import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import logo from './logo.svg';
import './App.css';

function App() {
  // posts state
  const [posts, setPosts] = useState([
    {id: 1, title: "Hello World", content: "My first post!", date: "2025-08-16"}
  ]);
  return (
    <Router>
      <Header />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new">New Post</Link>
      </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home posts={posts} />}/>
            <Route path="/post/:id" element={<PostDetail posts={posts} />}/>
            <Route path="/new" element={<NewPost setPosts={setPosts}/>} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>  
    </Router>
  );
}

export default App;

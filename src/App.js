//App.js
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import logo from './logo.svg';
import './App.css';
import starterPosts from "./data/posts";
import CategoryPosts from "./pages/CategoryPosts";
console.log("Starter posts:", starterPosts);


function App() {
  // posts state
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage (only once on first render)
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    const parsed = storedPosts ? JSON.parse(storedPosts) : null;

    if (parsed && parsed.length > 0) {
      // setPosts(parsed);
      const sorted = [...parsed].sort((a, b) => b.id - a.id);
      setPosts(sorted);
    } else {
      // setPosts(starterPosts);
      // localStorage.setItem("posts", JSON.stringify(starterPosts));
      const sortedStarter = [...starterPosts].sort((a, b) => b.id - a.id);
      setPosts(sortedStarter);
      localStorage.setItem("posts", JSON.stringify(sortedStarter));
    }

 
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  // ✅ reset function in App
  const handleReset = () => {
    setPosts(starterPosts);
    localStorage.setItem("posts", JSON.stringify(starterPosts));
  };

  

  return (
    <Router>
      <Header onReset={handleReset} posts={posts}/>
        <div className="container">
          <div className="row">
            <Routes>
              <Route path="/" element={<Home posts={posts} onReset={handleReset}  />}/>
              <Route path="/post/:id" element={<PostDetail posts={posts} />}/>
              <Route path="/new" element={<NewPost posts={posts} setPosts={setPosts}/>} />
              <Route path="/category/:category" element={<CategoryPosts posts={posts}/>} />
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </div>  
        </div>  
        <Footer />
    </Router>
  );
}

export default App;

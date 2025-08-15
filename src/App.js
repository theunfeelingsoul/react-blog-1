import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/post/:id" element={<PostDetail />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>  
    </Router>
  );
}

export default App;

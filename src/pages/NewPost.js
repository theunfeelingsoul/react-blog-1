// NewPost.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
    1. State for form data. Empty.
    This will hold the title, content, and date of the new post.

*/
function NewPost({ setPosts }) {
    
    // 1. State for form data. Make Empty.
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: ""
    });

    // Hook to programmatically navigate
    const navigate = useNavigate(); 

    /*
        2. 
        Handle form changes.
        When the user types in the input fields,
        this function will be called.
        Update formData state with input values.
    */
    const handleChange = (e) => {
        const { name, value } = e.target; // name and value attribute of input
        setFormData({ ...formData, [name]: value });
    };

    /*
        3. Handle form submission.
        When the form is submitted, this function will be called.
        It creates a new post object and adds it to the posts state.
        Then it redirects back to the home page.
    */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        /*
            4.
            Create a new post object with a unique ID.
            Here we use Date.now() to generate a unique ID.
            You can also use a library like uuid for better ID generation.
            Add in formData from client input in setFormData earlier.
        */
        const newPost = { id: Date.now(), ...formData }; 

        // Add to posts
        setPosts((prevPosts) => [...prevPosts, newPost]);

        // Redirect back to home
        navigate("/");
    };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          placeholder="Write your post..."
          value={formData.content}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
} // end of NewPost function

export default NewPost;

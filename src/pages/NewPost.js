// NewPost.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
    1. State htmlFor form data. Empty.
    This will hold the title, content, and date of the new post.

*/
function NewPost({ posts, setPosts }) {
    
    // 1. State htmlFor form data. Make Empty.
    const [formData, setFormData] = useState({
        id: Date.now(),
        title: "",
        content: "",
        date: "",
        image: "",
        cat: ""
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
        setFormData((prev)=>({ ...prev, [name]: value }));
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
            You can also use a library like uuid htmlFor better ID generation.
            Add in formData from client input in setFormData earlier.
        */
        const newPost = { id: Date.now(), ...formData }; 

        // Add to posts
        // setPosts([...posts, newPost]);
        setPosts(prevPosts =>
            [...prevPosts, newPost].sort((a, b) => b.id - a.id)
        );

         // Optionally reset form
        setFormData({
          id: Date.now(),
          title: "",
          excerpt: "",
          content: "",
          cat: "",
          date: "",
          image: ""
        });

        // Redirect back to home
        navigate("/");
    };

  return (
    <>
    <div>
      <h1>Create New Post</h1>
      
    </div>
    <form className="row g-3" onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-md-4">
                <div className="col">
                    <label htmlFor="inputEmail4" className="form-label">Date</label>
                    <input 
                        type="date" 
                        name="date" 
                        className="form-control" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="col">
                    <label htmlFor="inputEmail4" className="form-label">Feature Image</label>
                    <select 
                        id="inputState" 
                        className="form-select" 
                        name="image"
                        value={formData.image} 
                        onChange={handleChange}
                    >
                        <option selected>Choose...</option>
                        <option>meta.png</option>
                        <option>android.png</option>
                        <option>leader.png</option>
                        <option>gemini.png</option>
                        <option>bizidea.png</option>
                        <option>googlecloud.png</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="inputEmail4" className="form-label">Category</label>
                    <select 
                        id="inputState" 
                        className="form-select" 
                        name="cat"
                        value={formData.cat} 
                        onChange={handleChange}
                    >
                        <option selected>Choose...</option>
                        <option>technology</option>
                        <option>business</option>
                    </select>
                </div>
            </div>
            <div className="col-md-8">

                <div className="col">
                    <label htmlFor="inputEmail4" className="form-label">Post Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control" 
                        id="inputEmail4" 
                        placeholder="Post title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="col">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Post Content</label>
                    <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="6"
                        name="content"
                        placeholder="Write your post here..."
                        value={formData.content}
                        onChange={handleChange}
                        required 
                        >
                    </textarea>
                </div>
            </div>
        </div>    
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>

</>
  ); // end return
} // end of NewPost function

export default NewPost;

import React from "react";
import '../App.css';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <>
  	<div className="b-example-divider"></div>
	  	<div className="container"> 
	  		<footer className="py-3 my-4"> 
	  			<ul className="nav justify-content-center border-bottom pb-3 mb-3"> 
	  					<li className="nav-item">
	  						<Link className="nav-link px-2 text-body-secondary" to="/">Home</Link>
	  					</li> 
	  					<li className="nav-item">
	  						<Link className="nav-link px-2 text-body-secondary" to="category/technology">Tech</Link>
	  					</li> 
	  					<li className="nav-item">
	  						<Link className="nav-link px-2 text-body-secondary" to="category/business">Business</Link>
	  					</li> 
	  					<li className="nav-item">
	  						<Link className="nav-link px-2 text-body-secondary" to="/new">+ New Post</Link>
	  					</li> 

	  				</ul> 
	  				<p className="text-center text-body-secondary">© {new Date().getFullYear()} The React Blog — Built with ❤️ using React</p> 
	  		</footer> 
	  	</div>
      
    </>
  );
};

export default Footer;

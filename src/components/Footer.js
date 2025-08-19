import React from "react";
import '../App.css';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <>
  	<div className="b-example-divider"></div>
	  	<div className="container"> 
	  		<footer className="py-3 my-4"> 
	  		
	  				<p className="text-center text-body-secondary">© {new Date().getFullYear()} The React Blog — Built with ❤️ using React</p> 
	  		</footer> 
	  	</div>
      
    </>
  );
};

export default Footer;

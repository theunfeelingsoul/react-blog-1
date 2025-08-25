import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <>
      <div className="b-example-divider"></div>

      <div className="container">
        <footer className="py-3 msy-4 mt-auto">
          <p className="text-center text-body-secondary">
            © {new Date().getFullYear()} The React Blog — Built with ❤️ using
            React
          </p>
        </footer>
      </div>
    </>
  );
};

export default Footer;

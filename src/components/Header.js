import { Link } from "react-router-dom";
import "./Header.css";
import ReactLogo from '../asset/react-logo.png';

const Header = () =>(
    <div>
        <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  <img 
                    src={ReactLogo} 
                    alt="React Logo" 
                    style={{ width: '30px', marginRight: '10px' }} 
                  />
                  <span>The React Blog.</span>
                </Link>    
              {/*  <span class="navbar-text">
        <i>An interactive blog built with React</i> |
      </span>*/}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="category/technology">Tech</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="category/business">Business</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/new">+ New Post</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Admin
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      {/*<li><hr className="dropdown-divider"></li>*/}
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                  
                </ul>
               
              </div>
            </div>
        </nav>
    </div>

);

export default Header;
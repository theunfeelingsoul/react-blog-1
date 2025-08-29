// ./src/pages/admin/_AdminSidebar.js
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/posts" className="nav-link">
            <i className="bi bi-list-ul me-2"></i>
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/posts/add" className="nav-link">
            <i className="bi bi-pencil-square me-2"></i>
            New
          </Link>
        </li>
        {/* <li className="nav-item">
                    <Link to="/admin/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/admin/users">Users</Link>
                </li> */}
      </ul>
    </>
  );
}

export default Sidebar;

// pages/admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="mt-4">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin panefl. Choose what you’d like to manage:</p>

      <ul>
        <li>
          <Link to="/admin/posts">Manage Posts</Link>
        </li>
        <li>
          <Link to="/admin/new">Create New Post</Link>
        </li>
        {/* Later you can add more sections (users, categories, etc.) */}
      </ul>
    </div>
  );
}

export default AdminDashboard;

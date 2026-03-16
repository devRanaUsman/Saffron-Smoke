import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    recipes: 0,
    blogs: 0,
    tips: 0,
    subscribers: 0,
  });

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your content and data</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats.recipes}</h3>
          <p>Total Recipes</p>
        </div>
        <div className="stat-card">
          <h3>{stats.blogs}</h3>
          <p>Total Blogs</p>
        </div>
        <div className="stat-card">
          <h3>{stats.tips}</h3>
          <p>Total Tips</p>
        </div>
        <div className="stat-card">
          <h3>{stats.subscribers}</h3>
          <p>Subscribers</p>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Add New Content</h2>
        <div className="action-cards">
          <Link to="/admin/add-recipe" className="action-card recipe-card">
            <div className="card-icon">🍳</div>
            <h3>Add Recipe</h3>
            <p>Create a new recipe with ingredients and instructions</p>
          </Link>

          <Link to="/admin/add-blog" className="action-card blog-card">
            <div className="card-icon">📝</div>
            <h3>Add Blog Post</h3>
            <p>Write a new blog article with rich content</p>
          </Link>

          <Link to="/admin/add-tip" className="action-card tip-card">
            <div className="card-icon">💡</div>
            <h3>Add Tip</h3>
            <p>Share cooking tips and tricks</p>
          </Link>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

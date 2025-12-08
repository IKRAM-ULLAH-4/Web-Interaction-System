import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaLayerGroup, FaCogs, FaClipboardList } from "react-icons/fa";

export default function AdminMenu() {
  const [active, setActive] = useState("");

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link
              to="/admin/users"
              onClick={() => setActive("users")}
              className={active === "users" ? "active" : ""}
            >
              <FaUsers /> Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin-steps"
              onClick={() => setActive("steps")}
              className={active === "steps" ? "active" : ""}
            >
              <FaCogs /> Steps
            </Link>
          </li>

          <li>
            <Link
              to="/add-feature"
              onClick={() => setActive("feature")}
              className={active === "feature" ? "active" : ""}
            >
              <FaLayerGroup /> Features
            </Link>
          </li>

          <li>
            <Link
              to="/adminActivities"
              onClick={() => setActive("activities")}
              className={active === "activities" ? "active" : ""}
            >
              <FaClipboardList /> Admin Activities 
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="logout-btn"
              onClick={() => localStorage.removeItem("adminToken")}
            >
              Logout
            </Link>
          </li>
        </ul>
      </aside>

      {/* Right Content */}
      <main className="content">
        <h1>Welcome to KWICK WEB INTERACTION SYSTEM</h1>
        <p>Select a menu item to manage your dashboard.</p>
      </main>
    </div>
  );
}

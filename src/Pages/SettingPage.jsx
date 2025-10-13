import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user info passed from ChatApp (if any)
  const user = location.state?.user || {
    name: "Guest User",
    email: "guest@gmail.com",
  };

  // Local states
  const [displayName, setDisplayName] = useState(user.name);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Handle Save and navigate back to ChatApp
  const handleSave = () => {
    navigate("/homepage", {
      state: {
        user: {
          ...user,
          name: displayName,
          darkMode,
          notifications,
        },
      },
    });
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div
        className={`card shadow-lg border-0 rounded-4 p-4 ${
          darkMode ? "bg-secondary text-white" : "bg-white text-dark"
        }`}
        style={{ width: "420px" }}
      >
        <h4 className="fw-bold text-center mb-3">Settings</h4>
        <p className="text-center text-muted small mb-4">
          Customize your preferences
        </p>

        {/* Display Name */}
        <div className="mb-3">
          <label className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            Enable Dark Mode
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="notifSwitch"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label className="form-check-label" htmlFor="notifSwitch">
            Enable Notifications
          </label>
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary w-100 fw-semibold"
          onClick={handleSave}
        >
          Save & Return to Chat
        </button>

        {/* Back Button */}
        <button
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import UserManagement from "./UserManagement";
import ChannelManagement from "./ChannelManagement";
import ModerationForm from "./ModerationForm";
import SystemSettingForm from "./SystemSettingForm";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderTab = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "channels":
        return <ChannelManagement />;
      case "moderation":
        return <ModerationForm />;
      case "settings":
        return <SystemSettingForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4 ">
      <h1 className="mb-1">Admin Dashboard</h1>
      <p className="text-muted mb-4">Manage your chatting application</p>

      {/* Nav Tabs */}
      <div className="d-flex justify-content-between">
        <ul className="nav nav-tabs nav-fill w-100 mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "channels" ? "active" : ""}`}
              onClick={() => setActiveTab("channels")}
            >
              Channels
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "moderation" ? "active" : ""
              }`}
              onClick={() => setActiveTab("moderation")}
            >
              Moderation
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Active Tab Content */}
      <div className="card p-4 shadow-sm border-0">{renderTab()}</div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="container py-5">
      {/* TOP BAR WITH BACK BUTTON */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      {/* CARD */}
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Admin Dashboard</h3>

        <div className="d-flex justify-content-center gap-4">
          <Link to="/u" className="btn btn-primary btn-lg px-4">
            View All Registered Users
          </Link>

          <Link
            to="/adminActivities"
            className="btn btn-outline-primary btn-lg px-4"
          >
            Admin Activities
          </Link>

          {/* <h4>KWICK WEB INTERACTION SYSTEM</h4> */}
        </div>
      </div>
    </div>
  );
}

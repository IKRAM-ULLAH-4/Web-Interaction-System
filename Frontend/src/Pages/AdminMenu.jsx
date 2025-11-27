import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        position: "relative",
        padding: "2rem",
      }}
    >
      {/* BACKGROUND TEXT */}
      <h1
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "5rem",
          fontWeight: "900",
          color: "#fff",
          opacity: 0.85,
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        KWICK WEB INTERACTION SYSTEM
      </h1>

      {/* CARD */}
      <div
        className="card shadow-lg p-5"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "20px",
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* TOP BAR */}
        <div className="d-flex justify-content-end mb-4">
          <Link to="/" className="btn btn-outline-secondary">
            Back
          </Link>
        </div>
        <div className="mb-3">
          <i
            className="bi bi-chat-dots-fill"
            style={{ fontSize: "3rem", color: "#2575fc" }}
          ></i>
        </div>

        <h2 className="mb-4" style={{ fontWeight: "700", color: "#333" }}>
          Admin Dashboard
        </h2>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link
            to="/admin/users"
            className="btn btn-primary btn-lg px-4"
            style={{
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            View Users
          </Link>

          <Link
            to="/adminActivities"
            className="btn btn-outline-primary btn-lg px-4"
            style={{
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Admin Activities
          </Link>

          <Link
            to="/admin-steps"
            className="btn btn-success btn-lg px-4"
            style={{
              transition: "all 0.4s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Add Steps
          </Link>
        </div>
      </div>
    </div>
  );
}

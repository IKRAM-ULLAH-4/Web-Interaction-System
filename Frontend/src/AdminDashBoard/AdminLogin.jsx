import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/admin/login";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_URL, form);

      // Save admin token
      localStorage.setItem("adminToken", res.data.token);

      // Redirect to admin menu
      navigate("/admin-menu");
    } catch (err) {
      alert("Invalid admin credentials", err);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem",
        position: "relative",
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
          opacity: 0.4,
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        KWICK WEB INTERACTION SYSTEM
      </h1>

      {/* CARD */}
      <div
        className="card shadow-lg p-4"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "20px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <div className="row">
          {/* Left Column: Login Form */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-4">
            <h2 className="mb-4 text-center" style={{ color: "#333" }}>
              Admin Login
            </h2>

            <input
              name="username"
              placeholder="Admin Username"
              value={form.username}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <button
              className="btn btn-primary w-100"
              onClick={handleLogin}
              style={{ transition: "all 0.3s" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Login
            </button>
          </div>

          {/* Right Column: Welcome Message */}
          <div
            className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4"
            style={{ color: "#2575fc" }}
          >
            <i className="bi bi-chat mb-3" style={{ fontSize: "5rem" }}></i>
            <h3>Welcome, Admin!</h3>
            <p>Manage users, steps, and activities with ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

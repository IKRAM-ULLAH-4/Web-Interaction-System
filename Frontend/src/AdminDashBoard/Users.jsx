import React, { useEffect, useState } from "react";
import { getAllUsersForChat } from "../Service/api";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsersForChat();

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    console.log("Data is ", users);
    loadUsers();
  }, []);

  if (loading) return <h3 className="text-center py-5">Loading...</h3>;
  if (error) return <h4 className="text-center text-danger py-5">{error}</h4>;

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
          opacity: 0.08,
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
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* TOP BAR */}
        <div className="d-flex justify-content-end mb-4">
          <Link to="/admin-menu" className="btn btn-outline-secondary">
            Back
          </Link>
        </div>

        <h2 className="mb-4" style={{ fontWeight: "700", color: "#333" }}>
          Registered Users
        </h2>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

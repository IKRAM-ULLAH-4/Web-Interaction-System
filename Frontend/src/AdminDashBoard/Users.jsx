import React, { useEffect, useState } from "react";
import { getAllUsersForChat } from "../Service/api";
import { Link } from "react-router-dom";
import { FaUsers, FaHome, FaSignOutAlt } from "react-icons/fa"; // For icons

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
    loadUsers();
  }, []);

  if (loading) return <h3 className="text-center py-5">Loading...</h3>;
  if (error) return <h4 className="text-center text-danger py-5">{error}</h4>;

  return (
    <div className="d-flex" style={{ minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Admin Panel</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin-menu" className="nav-link text-white d-flex align-items-center">
              <FaHome className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item mt-auto">
            <Link to="/admin" className="nav-link text-white d-flex align-items-center" onClick={()=>localStorage.removeItem("adminToken")}>
              <FaSignOutAlt className="me-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5" style={{ background: "#f4f7fc" }}>
        <h1 className="mb-4" style={{ fontWeight: "700", color: "#333" }}>Registered Users</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover text-center align-middle">
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
      </div>
    </div>
  );
}

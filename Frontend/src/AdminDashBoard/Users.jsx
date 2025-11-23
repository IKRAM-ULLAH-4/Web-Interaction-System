import React, { useEffect, useState } from "react";
import { getUsers } from "../Service/api";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
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
    <div className="container py-4">
      <div className="d-flex justify-content-end">
        <Link to="/admin" className="btn btn-secondary">
          Back
        </Link>
      </div>

      <h2>Registered Users</h2>
      <table className="table table-bordered text-center">
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
  );
}

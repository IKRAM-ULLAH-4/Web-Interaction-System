import { useState } from "react";

function UserManagement() {
  const [Data, setData] = useState({});
  const handleChage = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(Data);
  };
  return (
    <div className="container">
      <h2 className="fw-semibold mb-1">User Management</h2>
      <p>Create Or Update User Accounts</p>

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="username" className="form-label fw-medium">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            name="Username"
            id="username"
            placeholder="@Username"
            onChange={handleChage}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label fw-medium">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="Email"
            id="email"
            placeholder="User@gmail.com"
            onChange={handleChage}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="name" className="form-label fw-medium">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            name="Full Name"
            id="name"
            placeholder="Full Name"
            onChange={handleChage}
          />
        </div>
        <div className="col-md-6 ">
          <label className="form-label fw-medium" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="Password"
            id="password"
            onChange={handleChage}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="Role" className="form-label fw-medium">
            Role
          </label>
          <select
            name="Role"
            id="Role"
            className="form-control"
            onChange={handleChage}
          >
            <option value="admin">Admin</option>
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="status" className="form-label fw-medium">
            Account Status
          </label>
          <select
            name="Account Status"
            id="status"
            className="form-control"
            onChange={handleChage}
          >
            <option value="">Active</option>
            <option value="">Suspended</option>
            <option value="">Disabled</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="channels" className="form-label fw-medium">
            Max Channels
          </label>
          <input
            type="number"
            name="Number To Join"
            id="channel"
            onChange={handleChage}
            className="form-control"
          />
          <p className="text-muted">Maximum Channels User can join</p>
        </div>

        <div className="col-md-6 border rounded p-3 ">
          <div className="d-flex justify-content-between py-0 px jalign-items-center mb-1">
            <label
              htmlFor="emailVerified"
              className="form-check-label me-2 mb-0"
            >
              Email Verified
            </label>
            <div className="form-check form-switch m-0">
              <input
                name="Email Verified"
                type="checkbox"
                className="form-check-input"
                id="emailVerified"
                style={{ width: "2.5rem", height: "1.25rem" }}
                onChange={handleChage}
              />
            </div>
          </div>

          <small className="text-muted d-block">
            User Email Verification Status
          </small>
        </div>

        <div className="d-flex gap-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Create User
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserManagement;

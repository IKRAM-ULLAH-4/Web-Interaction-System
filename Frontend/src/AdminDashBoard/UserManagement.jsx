import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addUser, searchUsersByEmail, deleteUserByEmail } from "../Service/api";

// Validation Schema
const schema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters minimum" }),
});

function UserManagement() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // CREATE USER
  const onSubmit = async (data) => {
    try {
      await addUser(data);
      alert("User created successfully!");
      reset();
    } catch (err) {
      alert(err.message || "Failed to create user");
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = () => {
    setDeleteEmail("");
    setMessage("");
    setShowDeleteModal(true);
  };

  // CLOSE DELETE MODAL
  const closeDeleteModal = () => setShowDeleteModal(false);

  // HANDLE DELETE USER
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteEmail) return setMessage("Please enter an email.");

    try {
      const users = await searchUsersByEmail(deleteEmail);
      console.log(users.length);
      if (users.length === 0) {
        setMessage("User nshta");
        return;
      }

      // Use new API method
      await deleteUserByEmail(deleteEmail);
      setMessage(`User ${users[0].fullName} deleted successfully!`);
      setDeleteEmail(""); // clear input after delete
    } catch (err) {
      setMessage(err.message || "Failed to delete user");
    }
  };

  return (
    <div className="container">
      <h2 className="fw-semibold mb-1">User Management</h2>
      <p>Create or update user accounts</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          {/* Full Name */}
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label fw-medium">
              Full Name
            </label>
            <input
              className="form-control"
              {...register("fullName")}
              id="fullName"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <small className="text-danger">{errors.fullName.message}</small>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label fw-medium">
              Email
            </label>
            <input
              className="form-control"
              {...register("email")}
              id="email"
              placeholder="user@gmail.com"
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label htmlFor="password" className="form-label fw-medium">
              Password
            </label>
            <input
              className="form-control"
              {...register("password")}
              type="password"
              id="password"
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-3">
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={openDeleteModal}
            >
              Kick User
            </button>
            <button
              type="reset"
              className="btn btn-outline-secondary"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="modal-backdrop"
          style={{
            padding: "2rem",
            background: "#00000080",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "2rem",
              maxWidth: "500px",
              margin: "auto",
              borderRadius: "8px",
            }}
          >
            <h5>Delete User</h5>
            <form onSubmit={handleDelete}>
              <div className="mb-3">
                <label className="form-label">Enter Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  required
                />
              </div>
              {message && <p className="text-danger">{message}</p>}
              <div className="d-flex gap-2 justify-content-end">
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;

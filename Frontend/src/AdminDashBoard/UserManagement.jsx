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
  const [messageType, setMessageType] = useState(""); // "error" or "success"

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
     const res =  await addUser(data);
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
    setMessageType("");
    setShowDeleteModal(true);
  };

  // CLOSE DELETE MODAL
  const closeDeleteModal = () => setShowDeleteModal(false);

  // HANDLE DELETE USER
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!deleteEmail) {
      setMessage("Please enter an email.");
      setMessageType("error");
      return;
    }

    try {
      const users = await searchUsersByEmail(deleteEmail);

      if (users.length === 0) {
        setMessage("User nshta");
        setMessageType("error");
        return;
      }

      await deleteUserByEmail(deleteEmail);
      setMessage(`User "${users[0].fullName}" deleted successfully!`);
      setMessageType("success");
      setDeleteEmail("");
    } catch (err) {
      setMessage(err.message || "Failed to delete user");
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <h2 className="fw-semibold mb-1">User Management</h2>
      <p className="text-muted">Create or remove user accounts</p>

      {/* CREATE USER FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-4 shadow-sm mb-4"
      >
        <div className="row g-3">
          {/* Full Name */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Full Name</label>
            <input
              className="form-control"
              {...register("fullName")}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <small className="text-danger">{errors.fullName.message}</small>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Email</label>
            <input
              className="form-control"
              {...register("email")}
              placeholder="user@gmail.com"
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Password</label>
            <input
              className="form-control"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-3">
            <button className="btn btn-primary">Create User</button>

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

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div
          className="modal-backdrop"
          style={{
            background: "#00000080",
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            className="card shadow-lg p-4"
            style={{ width: "420px", borderRadius: "12px" }}
          >
            <h4 className="fw-bold mb-3">Delete User</h4>
            <p className="text-muted mb-3">
              Enter email to delete the user permanently.
            </p>

            <form onSubmit={handleDelete}>
              <input
                type="email"
                className="form-control mb-3"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                placeholder="user@gmail.com"
                required
              />

              {/* Dynamic Message */}
              {message && (
                <div
                  className={`p-2 rounded mb-3 fw-semibold ${
                    messageType === "error"
                      ? "bg-danger text-white"
                      : "bg-success text-white"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-danger" type="submit">
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
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

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://web-interaction-system.vercel.app/api/steps";

export default function AdminSteps() {
  const [steps, setSteps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState({
    number: "",
    color: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  // Color combinations EXACTLY how the DB expects them
  const colorOptions = [
    { label: "Primary (White Text)", value: "bg-primary text-white" },
    { label: "Success (White Text)", value: "bg-success text-white" },
    { label: "Warning (Dark Text)", value: "bg-warning text-dark" },
    { label: "Danger (White Text)", value: "bg-danger text-white" },
    { label: "Info (Dark Text)", value: "bg-info text-dark" }
  ];

  useEffect(() => {
    if (!token) navigate("/admin-login");
  }, [token, navigate]);

  const fetchSteps = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { "x-admin-token": token }
      });
      setSteps(res.data);
    } catch (err) {
      console.error("Error fetching steps:", err);
      setMessage("Failed to fetch steps");
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openCreateModal = () => {
    setEditing(false);
    setForm({
      number: "",
      color: colorOptions[0].value,
      title: "",
      description: ""
    });
    setShowModal(true);
    setMessage("");
  };

  const openEditModal = (step) => {
    setEditing(true);
    setCurrentId(step._id);
    setForm({ ...step });
    setShowModal(true);
    setMessage("");
  };

  const saveStep = async () => {
    setLoading(true);
    if (!form.number || !form.title) {
      alert("Number and Title are required!");
      setLoading(false);
      return;
    }

    try {
      if (editing) {
        await axios.put(`${API_URL}/${currentId}`, form, {
          headers: { "x-admin-token": token }
        });
        setMessage("Step updated successfully!");
      } else {
        await axios.post(API_URL, form, {
          headers: { "x-admin-token": token }
        });
        setMessage("Step created successfully!");
      }
      setShowModal(false);
      fetchSteps();
    } catch (err) {
      console.error("Error saving step:", err);
      alert("Failed to save step");
    } finally {
      setLoading(false);
    }
  };

  const deleteStep = async (id) => {
    if (!window.confirm("Are you sure you want to delete this step?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { "x-admin-token": token }
      });
      setMessage("Step deleted successfully!");
      fetchSteps();
    } catch (err) {
      console.error("Error deleting step:", err);
      alert("Failed to delete step");
    }
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-end mb-4">
        <Link to="/admin-menu" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      <h2 className="fw-bold">Admin: Manage Steps For Landing Page</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <button className="btn btn-primary my-3" onClick={openCreateModal}>
        + Add Step
      </button>

      {steps.length === 0 ? (
        <p>No steps created yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Color</th>
              <th>Description</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr key={step._id}>
                <td>{step.number}</td>
                <td>{step.title}</td>
                <td>
                  {/* Shows the exact DB stored class */}
                  <span className={`badge ${step.color} p-2`}>
                    {step.color}
                  </span>
                </td>
                <td>{step.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openEditModal(step)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStep(step._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "500px",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <h5>{editing ? "Edit Step" : "Create Step"}</h5>

            <input
              name="number"
              type="number"
              value={form.number}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Step Number"
            />

            {/* COLOR DROPDOWN */}
            <label className="fw-bold">Choose Color</label>
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              className="form-control mb-2"
            >
              {colorOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* PREVIEW */}
            <div className="my-2">
              <span className={`badge ${form.color} p-2`}>
                Preview: {form.color}
              </span>
            </div>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Title"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Description"
            />

            <div className="text-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={saveStep}
                disabled={loading}
              >
                {loading
                  ? editing
                    ? "Updating..."
                    : "Creating..."
                  : editing
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

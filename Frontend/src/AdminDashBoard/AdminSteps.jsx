import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/steps";

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

  const token = localStorage.getItem("adminToken");

  const fetchSteps = async () => {
    try {
      const res = await axios.get(API_URL);
      setSteps(res.data);
    } catch (err) {
      console.error("Error fetching steps:", err);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openCreateModal = () => {
    setEditing(false);
    setForm({ number: "", color: "", title: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (step) => {
    setEditing(true);
    setCurrentId(step._id);
    setForm({ ...step });
    setShowModal(true);
  };

  const saveStep = async () => {
    setLoading(true);
    try {
      if (!form.number || !form.title) {
        alert("Number and Title are required!");
        setLoading(false);
        return;
      }

      if (editing) {
        await axios.put(`${API_URL}/${currentId}`, form, {
          headers: { "x-admin-token": token },
        });
      } else {
        await axios.post(API_URL, form, {
          headers: { "x-admin-token": token },
        });
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
        headers: { "x-admin-token": token },
      });
      fetchSteps();
    } catch (err) {
      console.error("Error deleting step:", err);
      alert("Failed to delete step");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Admin: Manage Steps</h2>
      <button className="btn btn-primary my-3" onClick={openCreateModal}>
        + Add Step
      </button>

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
              <td>{step.color}</td>
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

      {/* React Modal */}
      {showModal && (
        <div
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
            zIndex: 1050,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
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
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Color"
            />
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
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

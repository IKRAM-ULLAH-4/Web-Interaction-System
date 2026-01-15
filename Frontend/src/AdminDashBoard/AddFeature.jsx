import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://kwick-backend.onrender.com/api/features";

export default function AddFeature() {
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    img: null,
    title: "",
    text: "",
    link: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/admin-login");
  }, [token, navigate]);

  const fetchFeatures = async () => {
    const res = await axios.get(API_URL);
    setFeatures(res.data);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleFileChange = (e) => {
    setForm({ ...form, img: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openCreateModal = () => {
    setEditing(false);
    setForm({ img: null, title: "", text: "", link: "" });
    setPreview(null);
    setShowModal(true);
  };

  const openEditModal = (feature) => {
    setEditing(true);
    setCurrentId(feature._id);
    setForm({
      img: null,
      title: feature.title,
      text: feature.text,
      link: feature.link,
    });
    setPreview(`https://kwick-backend.onrender.com${feature.img}`);
    setShowModal(true);
  };

  const saveFeature = async () => {
    setLoading(true);
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("text", form.text);
    fd.append("link", form.link);

    if (form.img) fd.append("img", form.img);

    try {
      if (editing) {
        await axios.put(`${API_URL}/${currentId}`, fd);
      } else {
        await axios.post(API_URL, fd);
      }

      setShowModal(false);
      fetchFeatures();
    } finally {
      setLoading(false);
    }
  };

  const deleteFeature = async (id) => {
    if (!window.confirm("Delete this feature?")) return;

    await axios.delete(`${API_URL}/${id}`);
    fetchFeatures();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/admin-menu" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      <h2 className="fw-bold">Admin: Manage Features</h2>

      <button className="btn btn-primary my-3" onClick={openCreateModal}>
        + Add Feature
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Text</th>
            <th>Link</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f._id}>
              <td>
                <img
                  src={`https://kwick-backend.onrender.com${f.img}`}
                  width="80"
                  height="60"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>{f.title}</td>
              <td>{f.text}</td>
              <td>{f.link}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEditModal(f)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteFeature(f._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------- MODAL -------- */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={modalOverlayStyles}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalStyles}
          >
            <h5>{editing ? "Edit Feature" : "Create Feature"}</h5>

            <input type="file" className="form-control" onChange={handleFileChange} />

            {preview && (
              <img
                src={preview}
                style={{ width: "100%", height: "200px", objectFit: "cover", marginTop: "10px" }}
              />
            )}

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control my-2"
              placeholder="Title"
            />

            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Description"
            />

            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Link (optional)"
            />

            <div className="text-end">
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={saveFeature} disabled={loading}>
                {loading ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyles = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
};

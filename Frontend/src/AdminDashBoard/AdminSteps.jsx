import { useEffect, useState } from "react";

const ADMIN_TOKEN = "supersecretadminkey123"; // Move to .env in production

function AdminSteps() {
  const [steps, setSteps] = useState([]);
  const [form, setForm] = useState({
    number: "",
    color: "",
    title: "",
    description: "",
  });

  const fetchSteps = () => {
    fetch("https://backend-ezzm.onrender.com/steps")
      .then((res) => res.json())
      .then((data) => setSteps(data));
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createStep = () => {
    fetch("https://backend-ezzm.onrender.com/steps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify(form),
    }).then(() => {
      fetchSteps();
      setForm({ number: "", color: "", title: "", description: "" });
    });
  };

  const deleteStep = (id) => {
    fetch(`https://backend-ezzm.onrender.com/steps/${id}`, {
      method: "DELETE",
      headers: {
        "x-admin-token": ADMIN_TOKEN,
      },
    }).then(() => fetchSteps());
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold">Admin: Manage Steps</h2>

      <div className="card p-4 my-4 shadow">
        <h5>Add New Step</h5>
        <input
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Step Number"
          className="form-control mb-2"
        />
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="Color Classes"
          className="form-control mb-2"
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />

        <button className="btn btn-primary" onClick={createStep}>
          Add Step
        </button>
      </div>

      <h4>Existing Steps</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Color</th>
            <th>Description</th>
            <th></th>
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
    </div>
  );
}

export default AdminSteps;

import { useState } from "react";
import { z } from "zod";

function ModerationForm() {
  const [modData, setModData] = useState({});
  const [errors, setErrors] = useState({});

  // ------------------------------
  // ZOD SCHEMA
  // ------------------------------
  const ModSchema = z.object({
    username: z.string().min(2, "Username is required"),
    action: z.enum(["Warn", "Mute", "Kick", "Ban", "Unban"]),
    securityLevel: z.enum(["Low", "Medium", "High", "Critical"]),
    duration: z.string().min(1, "Duration is required"),

    channelId: z.string().optional(),
    reportId: z.string().optional(),
    expiryDate: z.string().optional(),

    reason: z.string().min(5, "Please provide a detailed reason"),
    internalNotes: z.string().optional(),
  });

  // --------------------------------
  // HANDLE CHANGES
  // --------------------------------
  const handleChange = (e) => {
    setModData({
      ...modData,
      [e.target.name]: e.target.value,
    });
  };

  // --------------------------------
  // SUBMIT / VALIDATE
  // --------------------------------
  const handleClick = () => {
    const result = ModSchema.safeParse(modData);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors(formatted);
      console.error("Validation Errors:", formatted);
      return;
    }

    setErrors({});
    console.log("Validated Moderation Data:", result.data);
    alert("Moderation Action Applied Successfully!");
  };

  return (
    <section>
      <div className="container">
        <h2>Content Moderation Form</h2>
        <p>Manage user violations and apply moderation actions.</p>

        {/* Display Validation Errors */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <strong>Fix the following errors:</strong>
            <ul className="mt-2 mb-0">
              {Object.entries(errors).map(([key, value]) => {
                if (value?._errors) {
                  return <li key={key}>{value._errors.join(", ")}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        )}

        <div className="row g-4">
          {/* USERNAME */}
          <div className="col-md-6">
            <label className="form-label">Target Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          {/* ACTION */}
          <div className="col-md-6">
            <label className="form-label">Action</label>
            <select
              name="action"
              className="form-control"
              onChange={handleChange}
            >
              <option value="Warn">Warn</option>
              <option value="Mute">Mute</option>
              <option value="Kick">Kick</option>
              <option value="Ban">Ban</option>
              <option value="Unban">Unban</option>
            </select>
          </div>

          {/* SECURITY LEVEL */}
          <div className="col-md-6">
            <label className="form-label">Security Level</label>
            <select
              name="securityLevel"
              className="form-control"
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* DURATION */}
          <div className="col-md-6">
            <label className="form-label">Duration</label>
            <select
              name="duration"
              className="form-control"
              onChange={handleChange}
            >
              <option value="24 hour">24 hour</option>
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="1 Month">1 Month</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>

          {/* CHANNEL ID */}
          <div className="col-md-6">
            <label>Channel ID (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="channelId"
              onChange={handleChange}
            />
          </div>

          {/* REPORT ID */}
          <div className="col-md-6">
            <label>Report ID (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="reportId"
              onChange={handleChange}
            />
          </div>

          {/* EXPIRY DATE */}
          <div className="col-md-12">
            <label>Expiry Date (Optional)</label>
            <input
              type="date"
              className="form-control"
              name="expiryDate"
              onChange={handleChange}
            />
            <small>When this moderation action expires</small>
          </div>

          {/* REASON */}
          <div className="col-md-12">
            <label className="form-label">Reason</label>
            <textarea
              className="form-control"
              name="reason"
              placeholder="Enter the reason for this moderation action..."
              onChange={handleChange}
            ></textarea>
          </div>

          {/* NOTES */}
          <div className="col-md-12">
            <label className="form-label">Internal Notes (Optional)</label>
            <textarea
              className="form-control"
              name="internalNotes"
              placeholder="Additional notes for moderators..."
              onChange={handleChange}
            ></textarea>
            <p className="text-muted small">Private notes, not visible to users</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-3 mb-5 mt-3">
          <button className="btn btn-primary" onClick={handleClick}>
            Apply Action
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setModData({})}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModerationForm;

import { useState } from "react";

function ModerationForm() {
  const [modData, setModData] = useState({});
  const handleChage = (e) => {
    setModData({ ...modData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    console.log(modData);
  };

  return (
    <section>
      <div className="container">
        <h2>Content Moderation Form</h2>
        <p>Manage User Voilations and apply Moderation Action</p>

        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Target Username
            </label>
            <input
              type="text"
              name="Username"
              id="username"
              className="form-control"
              onChange={handleChage}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="action" className="label-form">
              Action
            </label>
            <select
              name="Action"
              id="action"
              className="form-control"
              onChange={handleChage}
            >
              <option value="Warn">Warn</option>
              <option value="Mute">Mute</option>
              <option value="Kick">Kick</option>
              <option value="Ban">Ban</option>
              <option value="Unban">Unban</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="level" className="label-form">
              Security Level
            </label>
            <select
              name="Security Level"
              id="level"
              className="form-control"
              onChange={handleChage}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="duration" className="label-form">
              Duration
            </label>
            <select
              name="Duration"
              id="duration"
              className="form-control"
              onChange={handleChage}
            >
              <option value="24 hour">24 hour</option>
              <option value="7 days">7 days</option>
              <option value="15 days">15 days</option>
              <option value="1  Month">1 Month</option>
              <option value="Permanent">Permanantly</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="channelID">Channel ID (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="Channel ID"
              onChange={handleChage}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ReportId">Report ID (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="Report ID"
              onChange={handleChage}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="ReportId">Expiraty Date (Optional)</label>
            <input
              type="Date"
              className="form-control"
              name="Data"
              onChange={handleChage}
            />
            <small>When the Moderation Action Expires</small>
          </div>
          <div className="col-md-12">
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <textarea
              className="form-control"
              name="Reason"
              id="reason"
              placeholder="Enter the Reason for this Moderation Action..."
              onChange={handleChage}
            ></textarea>
          </div>
          <div className="col-md-12">
            <label htmlFor="note" className="form-label">
              Internal Notes (Optional)
            </label>
            <textarea
              className="form-control"
              name="Internal Notes"
              id="note"
              placeholder="Additonal Note For Moderation..."
              onChange={handleChage}
            ></textarea>
            <p className="text-muted small">
              Private Note Not visible to Users
            </p>
          </div>
        </div>
        <div className="d-flex gap-3 mb-5">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Apply Action
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
export default ModerationForm;

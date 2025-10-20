import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SystemSettingForm() {
  // Message Settings
  const [messageLength, setMessageLength] = useState(2000);
  const [fileSize, setFileSize] = useState(10);

  // Security Settings
  const [passwordLength, setPasswordLength] = useState(8);
  const [sessionTimeout, setSessionTimeout] = useState(60);
  const [rateLimit, setRateLimit] = useState(60);
  const [maxUsers, setMaxUsers] = useState(10000);

  // Toggles
  const [registration, setRegistration] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [profanityFilter, setProfanityFilter] = useState(true);
  const [spamDetection, setSpamDetection] = useState(true);

  const [welcomeMsg, setWelcomeMsg] = useState(
    "Welcome to our chat application!"
  );

  const handleSave = () => {
    const settings = {
      messageLength,
      fileSize,
      passwordLength,
      sessionTimeout,
      rateLimit,
      maxUsers,
      registration,
      emailVerification,
      maintenance,
      profanityFilter,
      spamDetection,
      welcomeMsg,
    };
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <section className="">
      <h2 className="fw-semibold mb-1">System Settings</h2>
      <p className="text-muted mb-4">Configure global application settings</p>
      {/* App Info */}
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-medium">Application Name</label>
          <input type="text" className="form-control" placeholder="ChatApp" />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Support Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="support@example.com"
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-medium">
            Application Description
          </label>
          <textarea
            className="form-control"
            rows="2"
            placeholder="Enter app description..."
          ></textarea>
        </div>
        <div className="col-12">
          <label className="form-label fw-medium">Terms of Service URL</label>
          <input
            type="url"
            className="form-control"
            placeholder="https://example.com/terms"
          />
        </div>
      </div>
      {/* Message Settings */}
      <div className="border rounded p-3 mt-4">
        <h6 className="fw-semibold">Message Settings</h6>

        <label className="form-label mt-2">Max Message Length</label>
        <div className="d-flex align-items-center mb-2">
          <input
            type="range"
            className="form-range"
            min="100"
            max="5000"
            step="100"
            value={messageLength}
            onChange={(e) => setMessageLength(e.target.value)}
          />
          <span className="badge bg-primary ms-2">
            {messageLength} characters
          </span>
        </div>

        <label className="form-label">Max File Size (MB)</label>
        <div className="d-flex align-items-center mb-2">
          <input
            type="range"
            className="form-range"
            min="1"
            max="100"
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
          />
          <span className="badge bg-primary ms-2">{fileSize} MB</span>
        </div>

        <label className="form-label">Allowed File Types</label>
        <input
          type="text"
          className="form-control"
          placeholder="jpg, png, gif, pdf, doc, docx"
        />
        <small className="text-muted">Comma-separated file extensions</small>
      </div>
      {/* Security Settings */}
      <div className="border rounded p-3 mt-4">
        <h6 className="fw-semibold">Security Settings</h6>

        <label className="form-label mt-2">Min Password Length</label>
        <div className="d-flex align-items-center mb-2">
          <input
            type="range"
            className="form-range"
            min="4"
            max="20"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <span className="badge bg-primary ms-2">
            {passwordLength} characters
          </span>
        </div>

        <label className="form-label">Session Timeout (minutes)</label>
        <div className="d-flex align-items-center mb-2">
          <input
            type="range"
            className="form-range"
            min="10"
            max="240"
            step="10"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
          />
          <span className="badge bg-primary ms-2">{sessionTimeout} min</span>
        </div>

        <label className="form-label">Rate Limit (per minute)</label>
        <div className="d-flex align-items-center mb-2">
          <input
            type="range"
            className="form-range"
            min="10"
            max="500"
            value={rateLimit}
            onChange={(e) => setRateLimit(e.target.value)}
          />
          <span className="badge bg-primary ms-2">{rateLimit} requests</span>
        </div>

        <label className="form-label">Max Online Users</label>
        <div className="d-flex align-items-center mb-2">
          <input
            type="range"
            className="form-range"
            min="100"
            max="20000"
            step="100"
            value={maxUsers}
            onChange={(e) => setMaxUsers(e.target.value)}
          />
          <span className="badge bg-primary ms-2">{maxUsers} users</span>
        </div>
      </div>
      {/* Welcome Message */}
      <div className="mt-4">
        <label className="form-label fw-medium">Welcome Message</label>
        <input
          type="text"
          className="form-control"
          value={welcomeMsg}
          onChange={(e) => setWelcomeMsg(e.target.value)}
        />
        <small className="text-muted">Displayed to new users</small>
      </div>
      {/* Toggles */}
      <div className="row mt-4 g-3">
        <div className="col-md-6">
          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div>
              <strong>Registration</strong>
              <p className="text-muted mb-0 small">
                Allow new user registration
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={registration}
                onChange={() => setRegistration(!registration)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div>
              <strong>Email Verification</strong>
              <p className="text-muted mb-0 small">
                Require email verification
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={emailVerification}
                onChange={() => setEmailVerification(!emailVerification)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div>
              <strong>Maintenance Mode</strong>
              <p className="text-muted mb-0 small">
                Disable app for maintenance
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={maintenance}
                onChange={() => setMaintenance(!maintenance)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div>
              <strong>Profanity Filter</strong>
              <p className="text-muted mb-0 small">
                Filter inappropriate content
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={profanityFilter}
                onChange={() => setProfanityFilter(!profanityFilter)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div>
              <strong>Spam Detection</strong>
              <p className="text-muted mb-0 small">Detect and block spam</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={spamDetection}
                onChange={() => setSpamDetection(!spamDetection)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-dark" onClick={handleSave}>
          Save Settings
        </button>
        <button className="btn btn-outline-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default SystemSettingForm;

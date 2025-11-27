import { useState } from "react";
import { z } from "zod";

function SystemSettingForm() {
  // App Info States
  const [appName, setAppName] = useState("ChatApp");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [description, setDescription] = useState("");
  const [termsUrl, setTermsUrl] = useState("");

  // Message Settings
  const [messageLength, setMessageLength] = useState(2000);
  const [fileSize, setFileSize] = useState(10);
  const [fileTypes, setFileTypes] = useState("jpg, png, gif, pdf, doc, docx");

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

  // Welcome Message
  const [welcomeMsg, setWelcomeMsg] = useState(
    "Welcome to our chat application!"
  );

  const [errors, setErrors] = useState({});

  // -------------------------
  // ZOD Schema
  // -------------------------
  const SettingsSchema = z.object({
    appName: z.string().min(2, "Application name is too short"),
    supportEmail: z.string().email("Invalid email address"),
    description: z.string().optional(),
    termsUrl: z.string().url("Invalid URL").optional(),

    messageLength: z.number().min(100).max(5000),
    fileSize: z.number().min(1).max(100),
    fileTypes: z.string(),

    passwordLength: z.number().min(4).max(20),
    sessionTimeout: z.number().min(10).max(240),
    rateLimit: z.number().min(10).max(500),
    maxUsers: z.number().min(100).max(20000),

    registration: z.boolean(),
    emailVerification: z.boolean(),
    maintenance: z.boolean(),
    profanityFilter: z.boolean(),
    spamDetection: z.boolean(),

    welcomeMsg: z.string().min(1, "Welcome message cannot be empty"),
  });

  const handleSave = () => {
    const collectedData = {
      appName,
      supportEmail,
      description,
      termsUrl,

      messageLength: Number(messageLength),
      fileSize: Number(fileSize),
      fileTypes,

      passwordLength: Number(passwordLength),
      sessionTimeout: Number(sessionTimeout),
      rateLimit: Number(rateLimit),
      maxUsers: Number(maxUsers),

      registration,
      emailVerification,
      maintenance,
      profanityFilter,
      spamDetection,

      welcomeMsg,
    };

    const result = SettingsSchema.safeParse(collectedData);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors(formatted);
      console.error("Validation Errors:", formatted);
      return;
    }

    setErrors({});
    console.log("Final Collected Data:", result.data);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <section>
      <h2 className="fw-semibold mb-1">System Settings</h2>
      <p className="text-muted mb-4">Configure global application settings</p>

      {/* Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <strong>Validation Errors:</strong>
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

      {/* App Info */}
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-medium">Application Name</label>
          <input
            type="text"
            className="form-control"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-medium">Support Email</label>
          <input
            type="email"
            className="form-control"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-medium">
            Application Description
          </label>
          <textarea
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="col-12">
          <label className="form-label fw-medium">Terms of Service URL</label>
          <input
            type="url"
            className="form-control"
            value={termsUrl}
            onChange={(e) => setTermsUrl(e.target.value)}
          />
        </div>
      </div>

      {/* Message Settings */}
      <div className="border rounded p-3 mt-4">
        <h6 className="fw-semibold">Message Settings</h6>

        <label className="form-label mt-2">Max Message Length</label>
        <input
          type="range"
          min="100"
          max="5000"
          step="100"
          value={messageLength}
          onChange={(e) => setMessageLength(e.target.value)}
          className="form-range"
        />
        <span className="badge bg-primary">{messageLength} characters</span>

        <label className="form-label mt-2">Max File Size (MB)</label>
        <input
          type="range"
          min="1"
          max="100"
          value={fileSize}
          onChange={(e) => setFileSize(e.target.value)}
          className="form-range"
        />
        <span className="badge bg-primary">{fileSize} MB</span>

        <label className="form-label mt-2">Allowed File Types</label>
        <input
          type="text"
          className="form-control"
          value={fileTypes}
          onChange={(e) => setFileTypes(e.target.value)}
        />
        <small className="text-muted">Comma-separated</small>
      </div>

      {/* Security Settings */}
      <div className="border rounded p-3 mt-4">
        <h6 className="fw-semibold">Security Settings</h6>

        <label className="form-label mt-2">Min Password Length</label>
        <input
          type="range"
          min="4"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          className="form-range"
        />
        <span className="badge bg-primary">{passwordLength} characters</span>

        <label className="form-label mt-2">Session Timeout (minutes)</label>
        <input
          type="range"
          min="10"
          max="240"
          step="10"
          value={sessionTimeout}
          onChange={(e) => setSessionTimeout(e.target.value)}
          className="form-range"
        />
        <span className="badge bg-primary">{sessionTimeout} min</span>

        <label className="form-label mt-2">Rate Limit (per minute)</label>
        <input
          type="range"
          min="10"
          max="500"
          value={rateLimit}
          onChange={(e) => setRateLimit(e.target.value)}
          className="form-range"
        />
        <span className="badge bg-primary">{rateLimit} req/min</span>

        <label className="form-label mt-2">Max Online Users</label>
        <input
          type="range"
          min="100"
          max="20000"
          step="100"
          value={maxUsers}
          onChange={(e) => setMaxUsers(e.target.value)}
          className="form-range"
        />
        <span className="badge bg-primary">{maxUsers} users</span>
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
      </div>

      {/* Toggles */}
      <div className="row mt-4 g-3">
        {/* Example Toggle */}
        <div className="col-md-6">
          <div className="border rounded p-3 d-flex justify-content-between align-items-center">
            <div>
              <strong>Registration</strong>
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

        {/* Repeat for other toggles... */}
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

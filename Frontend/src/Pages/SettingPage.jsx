import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../Service/api";

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Try to use passed user first, otherwise fetch current user from server
  const passedUser = location.state?.user;

  const [user, setUser] = useState(
    passedUser || {
      id: null,
      fullName: "Guest User",
      name: "Guest User",
      email: "guest@gmail.com",
    }
  );
  const [displayName, setDisplayName] = useState(user.fullName || user.name);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingUser, setLoadingUser] = useState(!passedUser);

  useEffect(() => {
    const fetchMe = async () => {
      if (passedUser) return;
      try {
        setLoadingUser(true);
        const me = await getCurrentUser(); // { user: {...} }
        if (me?.user) {
          const u = me.user;
          const normalized = {
            id: u._id,
            fullName: u.fullName || u.name || "",
            name: u.fullName || u.name || "",
            email: u.email,
            avatar: u.avatar || "/images/logo.png",
          };
          setUser(normalized);
          setDisplayName(normalized.fullName);
        }
      } catch (err) {
        console.warn("Could not fetch current user:", err?.message || err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Save and navigate back to ChatApp
  const handleSave = () => {
    navigate("/homepage", {
      state: {
        user: {
          ...user,
          fullName: displayName,
          name: displayName,
          darkMode,
          notifications,
        },
      },
    });
  };

  // Logout handler: call backend to clear cookie/token then navigate to login
  const handleLogout = async () => {
    if (loadingLogout) return;
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    setLoadingLogout(true);
    try {
      const res = await logoutUser();
      // alert(res?.message || "Logged out");
      // If you have client-side auth state or context, clear it here (e.g. setAuth(null))
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      alert(err?.message || "Logout failed. Try again.");
    } finally {
      setLoadingLogout(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>Loading user...</div>
      </div>
    );
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div
        className={`card shadow-lg border-0 rounded-4 p-4 ${
          darkMode ? "bg-secondary text-white" : "bg-white text-dark"
        }`}
        style={{ width: "420px" }}
      >
        <h4 className="fw-bold text-center mb-1">Settings</h4>
        <p className="text-center text-muted small mb-3">
          Customize your preferences
        </p>

        {/* Show current user */}
        <div className="mb-3">
          <small className="text-muted">Signed in as</small>
          <div className="fw-semibold">{user.fullName}</div>
          <div className="text-muted small">{user.email}</div>
        </div>

        {/* Display Name */}
        <div className="mb-3">
          <label className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            Enable Dark Mode
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="notifSwitch"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label className="form-check-label" htmlFor="notifSwitch">
            Enable Notifications
          </label>
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary w-100 fw-semibold mb-2"
          onClick={handleSave}
        >
          Save & Return to Chat
        </button>

        {/* Logout Button */}
        <button
          className="btn btn-danger w-100 fw-semibold"
          onClick={handleLogout}
          disabled={loadingLogout}
        >
          {loadingLogout ? "Logging out..." : "Logout"}
        </button>

        {/* Back Button */}
        <button
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

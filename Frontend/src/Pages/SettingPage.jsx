import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, getCurrentUser, updateProfile } from "../Service/api";

const MAX_DISPLAY_NAME_CHARS = 20;
const MAX_BIO_CHARS = 100;

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedUser = location.state?.user;

  const [user, setUser] = useState({
    id: null,
    fullName: "Alex Morgan",
    name: "Alex Morgan",
    email: "guest@gmail.com",
    avatar: "/uploads/defaul.jpeg",
    username: "alexmorgan",
    bio: "Coffee enthusiast ☕ | Tech lover 💻",
    status: "Available",
    ...passedUser,
  });

  const [displayName, setDisplayName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [status, setStatus] = useState(user.status);

  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [savingDisplayName, setSavingDisplayName] = useState(false);
  const [savingUsername, setSavingUsername] = useState(false);
  const [savingAll, setSavingAll] = useState(false);
  const [loadingUser, setLoadingUser] = useState(!passedUser);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUser = async () => {
      if (passedUser) return;
      try {
        setLoadingUser(true);
        const me = await getCurrentUser();
        if (me?.user) {
          const u = me.user;
          setUser({
            id: u._id,
            fullName: u.fullName || u.name,
            name: u.fullName || u.name,
            email: u.email,
            avatar: u.avatar || "/uploads/defaul.jpeg",
            username: u.username || "user",
            bio: u.bio || "",
            status: u.status || "Available",
          });
          setDisplayName(u.fullName || u.name);
          setUsername(u.username || "");
          setBio(u.bio || "");
          setStatus(u.status || "Available");
        }
      } catch (err) {
        console.warn("Could not fetch current user:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [passedUser]);

  const handleSaveDisplayName = async () => {
    if (!user.id || displayName.trim() === "" || displayName === user.fullName) return;
    setSavingDisplayName(true);
    try {
      const res = await updateProfile({ fullName: displayName });
      setUser(prev => ({ ...prev, fullName: res.user.fullName }));
      setEditingDisplayName(false);
      alert(res?.message || "Display Name updated!");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to update Display Name");
    } finally {
      setSavingDisplayName(false);
    }
  };

  const handleSaveUsername = async () => {
    if (!user.id || username.trim() === "" || username === user.username) return;
    setSavingUsername(true);
    try {
      const res = await updateProfile({ username });
      setUser(prev => ({ ...prev, username: res.user.username }));
      alert(res?.message || "Username updated!");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to update username");
    } finally {
      setSavingUsername(false);
    }
  };

  const handleSaveAllChanges = async () => {
    if (!user.id) return;
    setSavingAll(true);
    try {
      const payload = {
        ...(displayName !== user.fullName && { fullName: displayName }),
        ...(username !== user.username && { username }),
        ...(bio !== user.bio && { bio }),
        ...(status !== user.status && { status }),
      };

      if (Object.keys(payload).length === 0) {
        alert("No changes to save.");
        setSavingAll(false);
        return;
      }

      const res = await updateProfile(payload);
      setUser({
        ...user,
        fullName: res.user.fullName,
        username: res.user.username,
        bio: res.user.bio,
        status: res.user.status,
      });
      alert(res?.message || "All changes saved!");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to save changes");
    } finally {
      setSavingAll(false);
    }
  };

  const handleLogout = async () => {
    if (loadingLogout) return;
    if (!window.confirm("Are you sure you want to log out?")) return;

    setLoadingLogout(true);
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Logout failed");
    } finally {
      setLoadingLogout(false);
    }
  };

  if (loadingUser) return <div className="d-flex justify-content-center align-items-center vh-100">Loading user...</div>;

  return (
    <div className="d-flex justify-content-center align-items-start py-5 bg-light min-vh-100">
      <div className="card shadow-sm rounded-4 p-0 overflow-hidden" style={{ width: "620px" }}>
        
        {/* Sleek Top Tabs */}
        <div className="d-flex justify-content-between bg-white px-4 pt-3 border-bottom">
          {["profile", "premium", "account"].map((tab) => (
            <button
              key={tab}
              className={`flex-fill text-center py-2 fw-semibold border-0 ${
                activeTab === tab ? "border-bottom border-3 border-primary text-primary" : "text-secondary"
              }`}
              style={{ background: "transparent", transition: "0.3s", fontSize: "0.95rem" }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "profile" && "Profile"}
              {tab === "premium" && "Premium"}
              {tab === "account" && "Account"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content p-4">
          {activeTab === "profile" && (
            <div>
              {/* Profile Photo */}
              <div className="d-flex align-items-center mb-4">
                <img src={user.avatar} alt="Profile" className="rounded-circle border me-4" style={{ width: 90, height: 90, objectFit: "cover" }} />
                <div>
                  <h6 className="fw-bold mb-1">Profile Photo</h6>
                  <p className="text-muted small mb-2">Update your profile picture. Recommended: 400x400px</p>
                  <div className="d-flex">
                    <button className="btn btn-primary btn-sm me-2">Upload Photo</button>
                    <button className="btn btn-outline-secondary btn-sm">Remove</button>
                  </div>
                </div>
              </div>

              <hr className="mb-4" />

              {/* Display Name */}
              <div className="mb-4">
                <label className="form-label fw-bold">Display Name</label>
                <div className="input-group">
                  {editingDisplayName ? (
                    <>
                      <input className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={MAX_DISPLAY_NAME_CHARS} />
                      <button className="btn btn-primary" onClick={handleSaveDisplayName} disabled={savingDisplayName}>{savingDisplayName ? "Saving..." : "Save"}</button>
                      <button className="btn btn-outline-secondary" onClick={() => { setDisplayName(user.fullName); setEditingDisplayName(false); }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <input className="form-control" value={user.fullName} readOnly />
                      <button className="btn btn-outline-primary" onClick={() => setEditingDisplayName(true)}>Edit</button>
                    </>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="form-label fw-bold">Username</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} />
                  <button className="btn btn-primary" onClick={handleSaveUsername} disabled={savingUsername}>{savingUsername ? "Saving..." : "Save"}</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "premium" && <div>... Premium settings ...</div>}
          {activeTab === "account" && <div>... Account settings ...</div>}
        </div>

        {/* Save All + Logout */}
        <div className="card-footer bg-white p-4 pt-0">
          <button className="btn btn-lg w-100 fw-semibold mb-2" style={{ backgroundColor: '#6610f2', color: 'white' }} onClick={handleSaveAllChanges} disabled={savingAll}>
            {savingAll ? "Saving All Changes..." : "Save All Changes"}
          </button>
          <button className="btn btn-outline-danger w-100" onClick={handleLogout} disabled={loadingLogout}>
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

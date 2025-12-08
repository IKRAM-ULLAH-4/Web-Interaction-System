import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, updateProfile } from "../Service/api";
import UpgradeButton from "../Components/UpgradeButton";
import { UserChatContext } from "../Context/UserChatContext";

const MAX_DISPLAY_NAME_CHARS = 20;
const MAX_BIO_CHARS = 100;

export default function SettingsPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserChatContext);
  const fileInputRef = useRef(null);

  const [loadingLogout, setLoadingLogout] = useState(false);
  const [savingAll, setSavingAll] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    if (!currentUser) return;
    setDisplayName(currentUser.fullName || "");
    setUsername(currentUser.username || "");
    setBio(currentUser.bio || "");
    setStatus(currentUser.status || "Available");
  }, [currentUser]);

  // -------------------------------
  // CHANGE PHOTO ✅ FIXED
  // -------------------------------
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await updateProfile(formData);

      setCurrentUser((prev) => ({
        ...prev,
        avatar: res.user.avatar + "?t=" + Date.now(),
      }));

      alert("Profile photo updated!");
    } catch (err) {
      console.error("Avatar upload error:", err);
      alert(
        err?.response?.data?.message ||
          "Failed to upload profile photo"
      );
    }

    e.target.value = "";
  };

  // -------------------------------
  // SAVE ALL CHANGES ✅ FIXED
  // -------------------------------
  const handleSaveAllChanges = async () => {
  
     console.log(currentUser._id);
      console.log(currentUser);
      
    if (!currentUser?.id) return;
     
    const formData = new FormData();

    if (displayName !== currentUser.fullName)
      formData.append("fullName", displayName);

    if (username !== currentUser.username)
      formData.append("username", username);

    if (bio !== currentUser.bio)
      formData.append("bio", bio);

    if (status !== currentUser.status)
      formData.append("status", status);

    if (![...formData.keys()].length) {
      alert("No changes to save");
      return;
    }

    setSavingAll(true);

    try {
      const res = await updateProfile(formData);

      setCurrentUser((prev) => ({
        ...prev,
        ...res.user,
      }));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Save profile error:", err);
      alert(
        err?.response?.data?.message ||
          "Failed to save changes"
      );
    } finally {
      setSavingAll(false);
    }
  };

  // -------------------------------
  // LOGOUT
  // -------------------------------
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    setLoadingLogout(true);
    try {
      await logoutUser();
      setCurrentUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    } finally {
      setLoadingLogout(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        Loading user...
      </div>
    );
  }

  const avatarUrl = currentUser.avatar || "/uploads/Ikram.jpg";

  return (
    <div className="d-flex justify-content-center py-5 bg-light min-vh-100">
      <div className="card shadow-sm rounded-4 overflow-hidden" style={{ width: 620 }}>
        {/* Tabs */}
        <div className="d-flex bg-white border-bottom px-4 pt-3">
          {["profile", "premium", "account"].map((tab) => (
            <button
              key={tab}
              className={`flex-fill py-2 fw-semibold border-0 ${
                activeTab === tab
                  ? "border-bottom border-3 border-primary text-primary"
                  : "text-secondary"
              }`}
              style={{ background: "transparent" }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "profile" && (
            <>
              {/* Profile Photo */}
              <div className="d-flex align-items-center mb-4">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="rounded-circle border me-4"
                  style={{ width: 90, height: 90, objectFit: "cover" }}
                />

                <div>
                  <h6 className="fw-bold mb-1">Profile Photo</h6>
                  <p className="text-muted small mb-2">Update your profile picture</p>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Photo
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    hidden
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <label className="form-label fw-bold">Display Name</label>
                <input
                  className="form-control"
                  value={displayName}
                  maxLength={MAX_DISPLAY_NAME_CHARS}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Username</label>
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input className="form-control" value={currentUser.email} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Bio</label>
                <textarea
                  className="form-control"
                  value={bio}
                  maxLength={MAX_BIO_CHARS}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Status</label>
                <input
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </>
          )}

          {activeTab === "premium" && <UpgradeButton />}
          {activeTab === "account" && <div>Account settings</div>}
        </div>

        <div className="card-footer bg-white p-4">
          <button
            className="btn btn-lg w-100 mb-2"
            style={{ background: "#6610f2", color: "#fff" }}
            onClick={handleSaveAllChanges}
            disabled={savingAll}
          >
            {savingAll ? "Saving..." : "Save Changes"}
          </button>

          <button
            className="btn btn-outline-danger w-100"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

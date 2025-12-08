import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../Service/api";
import { UserChatContext } from "../Context/UserChatContext";
import defaultProfile from "../assets/logo.png";

// const BACKEND_URL = "http://localhost:5000";
const BACKEND_URL = "https://kwick-server.onrender.com"

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useContext(UserChatContext);

  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return defaultProfile;
    if (avatar.startsWith("http")) return avatar;
    return `${BACKEND_URL}${avatar}?t=${Date.now()}`;
  };

  // Init from context
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.fullName || "");
      setProfileImage(getAvatarUrl(currentUser.avatar));
    }
  }, [currentUser]);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setProfileImage(URL.createObjectURL(file)); // preview
  };

  const handleSaveAndContinue = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return alert("Please enter your full name");
    }

    setLoading(true);

    try {
      /** ✅ ALWAYS send FormData */
      const formData = new FormData();
      formData.append("fullName", name);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await updateProfile(formData);
      const user = res.user;

      setCurrentUser((prev) => ({
        ...prev,
        fullName: user.fullName,
        avatar: getAvatarUrl(user.avatar),
      }));

      navigate("/homepage");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 border-0 rounded-4"
        style={{ width: "400px" }}
      >
        <h4 className="text-center fw-bold">Profile Setup</h4>
        <p className="text-muted text-center mb-4">
          Complete your profile to continue
        </p>

        {/* Avatar */}
        <div className="text-center mb-4 position-relative">
          <img
            src={profileImage}
            alt="Profile"
            width="120"
            height="120"
            className="rounded-circle border object-fit-cover"
          />
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle position-absolute"
            style={{ right: "35%", bottom: "0" }}
            onClick={handleCameraClick}
          >
            <i className="bi bi-camera"></i>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>

        <form onSubmit={handleSaveAndContinue}>
          <div className="mb-3">
            <label className="form-label small">Full Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input
              className="form-control"
              value={currentUser?.email || ""}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

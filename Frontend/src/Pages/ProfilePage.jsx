import React, { useState, useRef, useEffect } from "react";
import defaultProfile from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { updateProfile, getCurrentUser } from "../Service/api";

const BACKEND_URL = "http://localhost:5000";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Normalize avatar URL
  const getAvatarUrl = (avatar) => {
    if (!avatar) return defaultProfile;
    if (avatar.startsWith("http")) return avatar;
    return `${BACKEND_URL}${avatar}`;
  };

  // Load current user
  useEffect(() => {
    (async () => {
      try {
        const me = await getCurrentUser();
        if (me?.user) {
          const u = me.user;
          setName(u.fullName || "");
          setEmail(u.email || "");
          setProfileImage(getAvatarUrl(u.avatar));
        }
      } catch (err) {
        console.log("Could not fetch current user:", err);
      }
    })();
  }, []);

  // Trigger file input
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Preview selected image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      setAvatarFile(file);
    }
  };

  // Save profile and navigate
  const handleSaveAndContinue = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your full name before continuing!");
      return;
    }
    setLoading(true);
    try {
      const payload = { fullName: name };
      if (avatarFile) payload.avatarFile = avatarFile;

      const res = await updateProfile(payload);
      const u = res.user;

      if (u?.avatar) {
        setProfileImage(getAvatarUrl(u.avatar) + `?t=${Date.now()}`);
      }

      navigate("/homepage", {
        state: {
          user: {
            id: u._id,
            fullName: u.fullName,
            email: u.email,
            avatar: getAvatarUrl(u.avatar),
          },
        },
      });
    } catch (err) {
      console.error("Profile save error:", err);
      alert(err?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-dark">
      <div
        className="card bg-white border-0 shadow-lg p-4 rounded-4"
        style={{ width: "400px" }}
      >
        <h4 className="text-center mb-2 fw-bold">Profile Setup</h4>
        <p className="text-center text-muted mb-4">
          Complete your profile to continue
        </p>

        {/* Profile Photo */}
        <div className="text-center mb-4 position-relative">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle border border-3 border-secondary-subtle object-fit-cover"
            width="120"
            height="120"
          />
          <p className="text-muted small mt-2">
            Click the camera icon to upload a new picture
          </p>
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0"
            style={{
              transform: "translate(-330%, -100%)",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleCameraClick}
          >
            <i className="bi bi-camera"></i>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSaveAndContinue}>
          <div className="mb-3">
            <label className="form-label text-muted small mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="form-control bg-light text-dark border"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="form-control bg-light text-dark border"
              value={email}
              readOnly
            />
          </div>

          <div className="mb-4">
            <h6 className="fw-semibold mb-3">Account Information</h6>
            <div className="d-flex justify-content-between text-muted small mb-1">
              <span>Member Since</span>
              <span className="text-dark">—</span>
            </div>
            <div className="d-flex justify-content-between text-muted small">
              <span>Account Status</span>
              <span className="text-success fw-semibold">Active</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold mt-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../assets/photo3.jpg";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromLogin = location.state?.email || "unknown@gmail.com";
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [name, setName] = useState("");
  const fileInputRef = useRef(null);

  // handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // ✅ Save & Continue Button
  const handleSaveAndContinue = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your full name before continuing!");
      return;
    }

    // Navigate to ChatApp and pass profile data
    navigate("/homepage", {
      state: {
        name,
        email: emailFromLogin,
        profileImage,
      },
    });
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

        {/* Profile Picture */}
        <div className="text-center mb-4 position-relative">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle border border-3 border-secondary-subtle object-fit-cover"
            width="120"
            height="120"
          />
          <p className="text-muted small">
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
        <form>
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
              value={emailFromLogin}
              readOnly
            />
          </div>
        </form>

        {/* Account Info */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Account Information</h6>
          <div className="d-flex justify-content-between text-muted small mb-1">
            <span>Member Since</span>
            <span className="text-dark">2024-11-14</span>
          </div>
          <div className="d-flex justify-content-between text-muted small">
            <span>Account Status</span>
            <span className="text-success fw-semibold">Active</span>
          </div>
        </div>

        {/* ✅ Save & Continue Button */}
        <button
          type="button"
          className="btn btn-primary w-100 fw-semibold mt-3"
          onClick={handleSaveAndContinue}
        >
          Save & Continue to Chat
        </button>
      </div>
    </div>
  );
}

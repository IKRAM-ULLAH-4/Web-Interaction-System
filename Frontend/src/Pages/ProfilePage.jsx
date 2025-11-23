import React, { useState, useRef, useEffect } from "react";
import defaultProfile from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { updateProfile, getCurrentUser } from "../Service/api";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const fileInputRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch current user if any (pre-fill)
    (async () => {
      try {
        const me = await getCurrentUser();
        if (me?.user) {
          setName(me.user.fullName || "");
          setEmail(me.user.email || "");
          // me.user.avatar is expected to be an absolute URL after backend fix
          setProfileImage(me.user.avatar ? me.user.avatar : defaultProfile);
        }
      } catch (err) {
        // not authenticated — keep defaults
        console.log(err);
      }
    })();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // preview
      setProfileImage(imageUrl);
      setAvatarFile(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveAndContinue = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your full name before continuing!");
      return;
    }
    setLoading(true);
    try {
      const res = await updateProfile({ fullName: name, avatarFile });
      // server returns res.user with avatar as absolute URL
      const u = res.user;
      if (u?.avatar) {
        // set server image (cache-bust by adding timestamp)
        setProfileImage(`${u.avatar}?t=${Date.now()}`);
      }
      // navigate to homepage and pass user state
      navigate("/homepage", {
        state: {
          user: {
            id: u._id,
            fullName: u.fullName,
            email: u.email,
            avatar: u.avatar,
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

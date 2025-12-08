import React from "react";
import { Modal } from "react-bootstrap"; // Using react-bootstrap modal
import defaultAvatar from "../assets/logo.png";

const UserProfileModal = ({ show, onClose, user }) => {
  if (!user) return null;

  const avatarUrl = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `https://web-interaction-system.vercel.app${user.avatar}`
    : defaultAvatar;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={avatarUrl}
          alt={user.fullName}
          className="rounded-circle mb-3"
          width="120"
          height="120"
          style={{ objectFit: "cover" }}
        />
        <h5 className="fw-bold">{user.fullName}</h5>
        <p className="text-muted">{user.email}</p>
        {user.status && <p className="text-success">{user.status}</p>}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;

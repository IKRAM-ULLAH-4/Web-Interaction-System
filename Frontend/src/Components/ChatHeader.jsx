import React, { useState, useContext } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { UserChatContext } from "../Context/UserChatContext";
import UserProfileModal from "./UserProfileModal";

const ChatHeader = ({ onBack }) => {
  const { selectedContact, setSelectedContact, onlineUsers } = useContext(UserChatContext);
  const [showProfile, setShowProfile] = useState(false);

  if (!selectedContact) return null;

  // Determine if the selected contact is online
  const isOnline = onlineUsers.includes(selectedContact.id);

  return (
    <>
      <div className="p-3 border-bottom border-secondary bg-light d-flex align-items-center">
        {/* Back button for mobile */}
        <button
          className="btn btn-outline-secondary d-md-none me-2"
          onClick={() => setSelectedContact(null)}
        >
          <FiArrowLeft />
        </button>

        {/* Contact avatar and name */}
        <img
          src={selectedContact.avatar}
          alt={selectedContact.name}
          className="rounded-circle me-2"
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
          onClick={() => setShowProfile(true)}
        />
        <div>
          <div className="fw-bold">{selectedContact.name}</div>
          {/* Show dynamic online/offline status */}
          <div className={`small ${isOnline ? "text-success fw-bold" : "text-muted"}`}>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* User profile modal */}
      <UserProfileModal
        show={showProfile}
        onClose={() => setShowProfile(false)}
        user={selectedContact}
      />
    </>
  );
};

export default ChatHeader;
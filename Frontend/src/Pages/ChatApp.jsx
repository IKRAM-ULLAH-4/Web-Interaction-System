import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GearFill } from "react-bootstrap-icons";

import { UserChatContext } from "../Context/UserChatContext";
import ChatList from "../Components/ChatList";
import ChatContainer from "../Components/ChatContainer";

export default function ChatApp() {
  const navigate = useNavigate();

  const { currentUser, contacts, selectedContact, setSelectedContact } =
    useContext(UserChatContext);

  return (
    <div className="d-flex vh-100 chat-app overflow-hidden">
      {/* LEFT PANEL - Contacts */}
      <div
        className={`contacts-panel bg-white border-end d-flex flex-column ${
          selectedContact ? "d-none d-md-flex" : "d-flex"
        }`}
        style={{ minWidth: "280px", maxWidth: "350px" }}
      >
        {/* PROFILE HEADER */}
        <div className="p-3 bg-light border-bottom d-flex align-items-center justify-content-between">
          {/* Profile Info */}
          <div className="d-flex align-items-center">
            <img
              src={currentUser?.avatar || "/Default-avatar.png"}
              
              alt="Me"
              className="rounded-circle border"
              width="45"
              height="45"
            />

            <div className="ms-2">
              <div className="fw-bold small">
                {currentUser?.fullName}
              </div>
              <div className="text-success small">
                Online
              </div>
            </div>
          </div>

          {/* Settings Button */}
          <button
            className="btn btn-light btn-sm rounded-circle settings-btn"
            title="Settings"
            onClick={() => navigate("/user/settings")}
          >
            <GearFill size={18} />
          </button>
        </div>

        {/* CONTACT LIST */}
        <ChatList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </div>

      {/* RIGHT PANEL - Chat */}
      <div
        className={`chat-panel flex-grow-1 d-flex flex-column bg-light ${
          !selectedContact ? "d-none d-md-flex" : "d-flex"
        }`}
      >
        {selectedContact ? (
          <ChatContainer
            currentUser={currentUser}
            selectedContact={selectedContact}
          />
        ) : (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center text-muted">
            <div>
              <div className="fs-1 mb-2 bi bi-chat-dots-fill"></div>
              <div className="fw-semibold">Select a conversation</div>
              <small>Pick someone from the left to start chatting</small>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .settings-btn:hover {
          background-color: #e9ecef;
        }

        @media (max-width: 768px) {
          .contacts-panel,
          .chat-panel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

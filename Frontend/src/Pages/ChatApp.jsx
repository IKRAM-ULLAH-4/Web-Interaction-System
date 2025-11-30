import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import ChatList from "../Components/ChatList";
import ChatContainer from "../Components/ChatContainer";
import { getAllUsersForChat, getCurrentUser } from "../Service/api";

const BACKEND_URL = "http://localhost:5000";

function ChatApp() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    id: null,
    fullName: "Guest User",
    email: "guest@gmail.com",
    avatar: "/default-avatar.png",
  });

  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [contactsError, setContactsError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // Load current user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await getCurrentUser();
        if (me?.user) {
          const u = me.user;
          setCurrentUser({
            id: u._id,
            fullName: u.fullName,
            email: u.email,
            avatar: u.avatar
              ? u.avatar.startsWith("http")
                ? u.avatar
                : `${BACKEND_URL}${u.avatar}`
              : "/default-avatar.png",
          });
        }
      } catch (err) {
        console.log("User not authenticated:", err);
      }
    };
    loadUser();
  }, []);

  // Load contacts
  useEffect(() => {
    if (!currentUser.email || currentUser.email === "guest@gmail.com") return;

    const loadContacts = async () => {
      try {
        setLoadingContacts(true);
        const users = await getAllUsersForChat();
        const filteredContacts = users
          .filter((u) => u.email !== currentUser.email)
          .map((u) => ({
            id: u._id,
            name: u.fullName || u.email,
            fullName: u.fullName || u.email,
            email: u.email,
            status: "offline",
            avatar: u.avatar
              ? u.avatar.startsWith("http")
                ? u.avatar
                : `${BACKEND_URL}${u.avatar}`
              : "/default-avatar.png",
          }));

        setContacts(filteredContacts);
        setContactsError(null);
      } catch (err) {
        setContactsError("Failed to load contacts");
      } finally {
        setLoadingContacts(false);
      }
    };

    loadContacts();
  }, [currentUser.email]);

  const goToSettings = () => {
    navigate("/user/settings", { state: { user: currentUser } });
  };

  return (
    <div
      className="d-flex flex-column flex-md-row vh-100"
      style={{ backgroundColor: "#f1efec" }}
    >
      {/* LEFT SIDE */}
      <div className="bg-white col-md-3 border-end d-flex flex-column">
        <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={currentUser.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="rounded-circle border"
              style={{ width: "45px", height: "45px", objectFit: "cover" }}
            />
            <div className="ms-2">
              <div className="fw-bold small">{currentUser.fullName}</div>
              <div className="text-success small">Online</div>
            </div>
          </div>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={goToSettings}
            title="Settings"
          >
            <FiSettings />
          </button>
        </div>

        {loadingContacts ? (
          <div className="p-3">Loading contacts...</div>
        ) : contactsError ? (
          <div className="p-3 text-danger">{contactsError}</div>
        ) : (
          <ChatList
            contacts={contacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
        )}
      </div>

      {/* RIGHT SIDE */}
      {selectedContact ? (
        <ChatContainer
          selectedContact={selectedContact}
          currentUser={currentUser}
          onBack={() => setSelectedContact(null)}
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
  );
}

export default ChatApp;

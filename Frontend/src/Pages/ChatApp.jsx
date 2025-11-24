import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import ChatList from "../Components/ChatList";
import ChatContainer from "../Components/ChatContainer";
import { getUsers, getCurrentUser } from "../Service/api";

function ChatApp() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    id: null,
    fullName: "Guest User",
    name: "Guest User",
    email: "guest@gmail.com",
    profileImage: "/uploads/Ikram.",
  });

  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [contactsError, setContactsError] = useState(null);

  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const loadUserAndContacts = async () => {
      try {
        const me = await getCurrentUser();
        if (me?.user) {
          const u = me.user;
          setCurrentUser({
            id: u._id,
            fullName: u.fullName || "User",
            name: u.fullName || "User",
            email: u.email,
            profileImage: u.avatar || "/images/logo.png",
          });
        }
      } catch (err) {
        // not authenticated — keep guest
      }

      try {
        setLoadingContacts(true);
        const users = await getUsers();
        const mapped = users
          .map((u) => ({
            id: u._id,
            name: u.fullName || u.email,
            fullName: u.fullName || u.email,
            status: "offline",
            avatar: u.avatar || "/images/logo.png",
            email: u.email,
          }))
          .filter((c) => c.email !== (currentUser.email || ""));
        setContacts(mapped);
        setContactsError(null);
      } catch (err) {
        console.error("Failed to load contacts:", err);
        setContactsError(err?.message || "Failed to load contacts");
      } finally {
        setLoadingContacts(false);
      }
    };

    loadUserAndContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToSettings = () => {
    navigate("/user/settings", { state: { user: currentUser } });
  };

  return (
    <div
      className="d-flex flex-column flex-md-row vh-100"
      style={{ backgroundColor: "#f1efec" }}
    >
      <div className={`bg-white col-md-3 border-end d-flex flex-column`}>
        <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={currentUser.profileImage}
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

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import person1 from "../assets/logo.png";
import person2 from "../assets/photo1.jpg";
import person3 from "../assets/photo2.jpg";
import person4 from "../assets/photo3.jpg";
import person5 from "../assets/photo2.jpg";

import ChatList from "../Components/ChatList";
import ChatContainer from "../Components/ChatContainer";

function ChatApp() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || {
    name: "Guest User",
    email: "guest@gmail.com",
    profileImage: person1,
  };

  // Dummy contact list
  const contacts = [
    { id: 1, name: "Saad", status: "offline", avatar: person1 },
    { id: 2, name: "Asif", status: "offline", avatar: person2 },
    { id: 3, name: "NewOne", status: "offline", avatar: person3 },
    { id: 4, name: "Unknown", status: "offline", avatar: person4 },
    { id: 5, name: "Entrepreneur", status: "offline", avatar: person5 },
  ];

  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || !selectedContact) return;
    const newMessage = { id: Date.now(), text: input, sender: "me" };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));
    setInput("");
  };

  const handleBack = () => setSelectedContact(null);
  const chatMessages = selectedContact
    ? messages[selectedContact.id] || []
    : [];

  // ✅ Go to Settings Page
  const goToSettings = () => {
    navigate("/settings", { state: { user } });
  };

  return (
    <div
      className="d-flex flex-column flex-md-row vh-100"
      style={{ backgroundColor: "#f1efec" }}
    >
      {/* LEFT SIDEBAR */}
      <div
        className={`bg-white col-md-3 border-end d-flex flex-column ${
          selectedContact ? "d-none d-md-flex" : "d-flex"
        }`}
      >
        {/* ✅ Sidebar Header with Dynamic User Info */}
        <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={user.profileImage}
              alt="User Avatar"
              className="rounded-circle border"
              style={{ width: "45px", height: "45px", objectFit: "cover" }}
            />
            <div className="ms-2">
              <div className="fw-bold small">{user.name}</div>
              <div className="text-success small">Online</div>
            </div>
          </div>

          {/* ⚙️ Settings Button */}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={goToSettings}
            title="Settings"
          >
            <FiSettings />
          </button>
        </div>

        {/* Contact List */}
        <ChatList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </div>

      {/* RIGHT CHAT AREA */}
      {selectedContact ? (
        <ChatContainer
          selectedContact={selectedContact}
          messages={chatMessages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onBack={handleBack}
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

import React from "react";
// Assuming you are using Bootstrap Icons
import { Check, CheckAll } from "react-bootstrap-icons";

function ChatList({ contacts, selectedContact, onSelectContact }) {
  // Helper function to render message delivery status
  const renderStatusIcon = (status) => {
    if (!status) return null;

    const isRead = status === "read";
    const color = isRead ? "text-primary" : "text-secondary";

    if (isRead) {
      return <CheckAll size={16} className={color} />;
    } else if (status === "delivered") {
      return <CheckAll size={16} className={color} />;
    } else if (status === "sent") {
      return <Check size={16} className={color} />;
    }
    return null;
  };

  return (
    <div className="flex-grow-1 overflow-auto">
      {contacts.map((contact) => {
        const isSelected = selectedContact?.id === contact.id;
        const unreadCount = contact.unreadCount || 0; // Use a hypothetical unreadCount property

        return (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`d-flex align-items-center p-3 border-bottom transition-all ${
              isSelected
                ? "bg-primary-subtle border-start border-4 border-primary"
                : "bg-white hover-bg-light"
            }`}
            style={{ cursor: "pointer", transition: "background-color 0.2s" }}
          >
            {/* 1. Avatar */}
            <div className="position-relative me-3 flex-shrink-0">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="avatar-clean-lg"
              />
            </div>

            {/* 2. Main Content Area */}
            <div className="flex-grow-1 min-w-0">
              {/* Name and Time */}
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div
                  className={`fw-semibold text-truncate ${
                    isSelected ? "text-primary" : "text-dark"
                  }`}
                >
                  {contact.name}
                </div>

                <small className="text-secondary text-nowrap ms-2">
                  {contact.lastActive || contact.status}
                </small>
              </div>

              {/* Last Message Preview and Unread Badge */}
              {contact.lastMessage && (
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center min-w-0">
                    {contact.isMyLastMessage && (
                      <span className="me-1">
                        {renderStatusIcon(contact.messageStatus)}
                      </span>
                    )}

                    <small
                      className={`text-truncate w-100 ${
                        unreadCount > 0
                          ? "fw-semibold text-dark"
                          : "text-muted"
                      }`}
                      style={{
                        opacity: isSelected ? 1 : 0.9,
                        maxWidth: "calc(100% - 30px)",
                      }}
                    >
                      {contact.lastMessage}
                    </small>
                  </div>

                  {unreadCount > 0 && (
                    <span className="badge rounded-pill bg-success ms-2 flex-shrink-0">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Custom style for hover effect */}
      <style jsx>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
        }

        .avatar-clean-lg {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
}

export default ChatList;

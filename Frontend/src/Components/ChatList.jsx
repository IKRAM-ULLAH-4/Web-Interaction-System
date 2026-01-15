import React, { useContext } from "react";
import { UserChatContext } from "../Context/UserChatContext";

function ChatList({ contacts, selectedContact, onSelectContact }) {
  const { onlineUsers } = useContext(UserChatContext);

  return (
    <div className="flex-grow-1 overflow-auto">
      {contacts.map((contact) => {
        // Determine if the contact is online
        const isOnline = onlineUsers.includes(contact.id);
        const isSelected = selectedContact?.id === contact.id;

        return (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`d-flex align-items-center p-2 border-bottom ${
              isSelected ? "bg-info bg-opacity-25" : "bg-white"
            }`}
            style={{ cursor: "pointer" }}
          >
            {/* Contact Avatar */}
            <img
              src={contact.avatar}
              alt={contact.name}
              className="rounded-circle me-2"
              width="50"
              height="50"
            />

            {/* Contact Details */}
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <div className="fw-semibold">{contact.name}</div>
                {/* Update status dynamically - Online users will have green text */}
                <small className={`small ${isOnline ? "text-success fw-bold" : "text-muted"}`}>
                  {isOnline ? "Online" : "Offline"}
                </small>
              </div>

              {contact.lastMessage && (
                <small
                  className="text-muted d-block text-truncate"
                  style={{ maxWidth: "180px" }}
                >
                  {contact.lastMessage}
                </small>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
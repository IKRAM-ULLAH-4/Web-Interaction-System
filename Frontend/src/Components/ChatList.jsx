import React from "react";

function ChatList({ contacts, selectedContact, onSelectContact }) {
  return (
    <div className="flex-grow-1 overflow-auto">
      {contacts.map((contact) => {
        const isSelected = selectedContact?.id === contact.id;
        return (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`d-flex align-items-center p-2 border-bottom ${isSelected ? "bg-info bg-opacity-25" : "bg-white"}`}
            style={{ cursor: "pointer" }}
          >
            <img src={contact.avatar} alt={contact.name} className="rounded-circle me-2" width="45" height="45" />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <div className="fw-semibold">{contact.name}</div>
                <small className="text-muted">{contact.status}</small>
              </div>
              {contact.lastMessage && <small className="text-muted d-block text-truncate" style={{ maxWidth: "180px" }}>{contact.lastMessage}</small>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
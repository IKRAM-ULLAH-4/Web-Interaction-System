function ChatList({ contacts, selectedContact, onSelectContact }) {
  return (
    <div className="flex-grow-1 overflow-auto">
      {contacts.map((contact) => {
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
            <img
              src={contact.avatar}
              alt={contact.name}
              className="rounded-circle me-2"
              width="45"
              height="45"
            />
            <div>
              <div className="fw-semibold">{contact.name}</div>
              <small className="text-muted">{contact.status}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;

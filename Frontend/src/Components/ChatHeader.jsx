
import { FiArrowLeft } from "react-icons/fi";

const ChatHeader = ({ contact, onBack }) => {
  if (!contact) return null;

  return (
    <div className="p-3 border-bottom border-secondary bg-light d-flex align-items-center">
      <button
        className="btn btn-outline-secondary d-md-none me-2"
        onClick={onBack}
      >
        <FiArrowLeft />
      </button>
      <img
        src={contact.avatar}
        alt={contact.name}
        className="rounded-circle me-2"
        width="40"
        height="40"
      />
      <div>
        <div className="fw-bold">{contact.name}</div>
        <div className="text-muted small">{contact.status}</div>
      </div>
    </div>
  );
};

export default ChatHeader;

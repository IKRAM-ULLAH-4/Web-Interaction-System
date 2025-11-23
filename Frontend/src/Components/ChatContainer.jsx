import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import {
  getConversation,
  sendMessage,
  editMessage,
  removeMessage,
} from "../Service/api";

const Container = styled.div`
  height: 100vh;
`;
const MessagesArea = styled.div`
  background-color: #efeae2;
`;
const MessageBubble = styled.div`
  max-width: 75%;
`;

function ChatContainer({ selectedContact, currentUser, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!selectedContact) return;
      setLoading(true);
      try {
        const conv = await getConversation(selectedContact.id);
        setMessages(conv);
      } catch (err) {
        console.error("Failed to load conversation:", err);
      } finally {
        setLoading(false);
        setTimeout(
          () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
          50
        );
      }
    };
    load();
  }, [selectedContact]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedContact) return null;

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const temp = {
      _id: `temp-${Date.now()}`,
      sender: { _id: currentUser?.id },
      receiver: { _id: selectedContact.id },
      text,
      createdAt: new Date().toISOString(),
      edited: false,
    };
    setMessages((m) => [...m, temp]);
    setInput("");

    try {
      const saved = await sendMessage({ to: selectedContact.id, text });
      setMessages((m) => m.map((msg) => (msg._id === temp._id ? saved : msg)));
    } catch (err) {
      console.error("Send failed:", err);
      setMessages((m) => m.filter((msg) => msg._id !== temp._id));
      alert(err?.message || "Failed to send message");
    }
  };

  const startEdit = (msg) => {
    setEditingId(msg._id);
    setEditingText(msg.text);
  };

  const submitEdit = async () => {
    const text = editingText.trim();
    if (!text) return;
    try {
      const updated = await editMessage(editingId, text);
      setMessages((m) =>
        m.map((msg) => (msg._id === editingId ? updated : msg))
      );
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error("Edit failed:", err);
      alert(err?.message || "Failed to edit message");
    }
  };

  const handleDelete = async (msgId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await removeMessage(msgId);
      setMessages((m) => m.filter((msg) => msg._id !== msgId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err?.message || "Failed to delete message");
    }
  };

  return (
    <Container className="flex-grow-1 d-flex flex-column bg-light">
      <ChatHeader contact={selectedContact} onBack={onBack} />

      <MessagesArea className="flex-grow-1 overflow-auto p-3">
        {loading ? (
          <div className="text-center text-muted">Loading messages...</div>
        ) : messages.length > 0 ? (
          messages.map((msg) => {
            const senderId = msg.sender?._id || msg.sender;
            const isMe = senderId === (currentUser?.id || currentUser?._id);
            return (
              <div
                key={msg._id}
                className={`d-flex mb-2 ${
                  isMe ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div style={{ maxWidth: "75%" }}>
                  <div
                    className={`p-2 px-3 rounded-3 ${
                      isMe ? "bg-primary text-white" : "bg-white"
                    }`}
                  >
                    {editingId === msg._id ? (
                      <div>
                        <input
                          className="form-control mb-2"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={submitEdit}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                              setEditingId(null);
                              setEditingText("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>{msg.text}</div>
                        <small className="text-muted">
                          {new Date(msg.createdAt).toLocaleString()}{" "}
                          {msg.edited ? "· edited" : ""}
                        </small>
                      </div>
                    )}
                  </div>

                  {isMe && editingId !== msg._id && (
                    <div className="mt-1 d-flex gap-2 justify-content-end">
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={() => startEdit(msg)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(msg._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted mt-5">No messages yet.</div>
        )}
        <div ref={bottomRef}></div>
      </MessagesArea>

      <div className="p-2 border-top bg-white d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </Container>
  );
}

export default ChatContainer;

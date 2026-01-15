import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import { getConversation, sendMessage } from "../Service/api";
import { UserChatContext } from "../Context/UserChatContext";

// Styled components for the container and message area
const Container = styled.div`height: 100vh;`;
const MessagesArea = styled.div`background-color: #efeae2;`;

function ChatContainer({ selectedContact, onBack }) {
  const { currentUser, socket, onlineUsers } = useContext(UserChatContext);
  const [messages, setMessages] = useState([]); // Conversation messages
  const [input, setInput] = useState(""); // User input for sending a new message
  const bottomRef = useRef(null); // Reference for scrolling to the last message
  const [loading, setLoading] = useState(false); // Messages loading state

  // Fetch conversation messages when a contact is selected
  useEffect(() => {
    if (!selectedContact) return;

    setLoading(true);
    getConversation(selectedContact.id)
      .then((msgs) => {
        setMessages(msgs); // Set fetched messages
      })
      .catch((err) => console.error("Error fetching conversation:", err))
      .finally(() => {
        setLoading(false); // Complete loading
      });
  }, [selectedContact]);

  // Automatically scroll to the latest message whenever "messages" state updates
  useEffect(() => {
    scrollToBottom(); // Scroll only after the DOM finishes updating messages
  }, [messages]);

  // Real-time message handling with Socket.IO
  useEffect(() => {
    if (!socket || !selectedContact) return;

    // Real-time listener for messages
    socket.on("receiveMessage", (msg) => {
      if (
        (msg.sender._id === selectedContact.id && msg.receiver._id === currentUser.id) ||
        (msg.sender._id === currentUser.id && msg.receiver._id === selectedContact.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, msg]); // Add new message to state
      }
    });

    // Cleanup socket listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, selectedContact, currentUser]);

  // Scroll the messages container to the bottom
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle sending a new message
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return; // Prevent empty messages

    // Clear input field immediately
    setInput("");

    // Emit the message to the server using Socket.IO
    socket?.emit("sendMessage", {
      senderId: currentUser.id,
      receiverId: selectedContact.id,
      text,
    });

    try {
      // Persist the message to the database
      await sendMessage({ to: selectedContact.id, text });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Check if the selected contact is currently online
  const isOnline = onlineUsers.includes(selectedContact?.id);

  return (
    <Container className="flex-grow-1 d-flex flex-column bg-light">
      {/* Chat Header */}
      <ChatHeader contact={{ ...selectedContact, status: isOnline ? "Online" : "Offline" }} onBack={onBack} />

      {/* Messages Area */}
      <MessagesArea className="flex-grow-1 overflow-auto p-3">
        {loading ? (
          // Show loading spinner for messages loading state
          <div className="text-center text-muted">Loading messages...</div>
        ) : messages.length > 0 ? (
          // Render Messages
          messages.map((msg) => {
            const isMe = msg.sender._id === currentUser.id; // Check if this message is sent by "me"
            return (
              <div
                key={msg._id}
                className={`d-flex mb-2 ${isMe ? "justify-content-end" : "justify-content-start"}`}
              >
                <div style={{ maxWidth: "75%" }}>
                  <div className={`p-2 px-3 rounded-3 ${isMe ? "bg-primary text-white" : "bg-white"}`}>
                    {msg.text}
                    <small className="text-muted d-block">
                      {new Date(msg.createdAt).toLocaleTimeString()} {msg.edited ? "· edited" : ""}
                    </small>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Show empty state for no messages
          <div className="text-center text-muted mt-5">No messages yet.</div>
        )}
        {/* Bottom Reference for Auto-Scrolling */}
        <div ref={bottomRef}></div>
      </MessagesArea>

      {/* Message Input */}
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
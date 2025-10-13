import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";

const Container = styled.div`
  height: 100vh;
`;

const MessagesArea = styled.div`
  background-color: #efeae2;
`;

const MessageBubble = styled.div`
  max-width: 75%;
`;

function ChatContainer({
  selectedContact,
  messages,
  input,
  setInput,
  onSend,
  onBack,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedContact) return null;

  return (
    <Container className="flex-grow-1 d-flex flex-column bg-light">
      <ChatHeader contact={selectedContact} onBack={onBack} />

      {/* --- Messages Area --- */}
      <MessagesArea className="flex-grow-1 overflow-auto p-3">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`d-flex mb-2 ${
                msg.sender === "me"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <MessageBubble
                className={`p-2 px-3 rounded-3 ${
                  msg.sender === "me" ? "bg-primary text-white" : "bg-white"
                }`}
              >
                {msg.text}
              </MessageBubble>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-5">No messages yet.</div>
        )}
        <div ref={bottomRef}></div>
      </MessagesArea>

      {/* --- Input Bar --- */}
      <div className="p-2 border-top bg-white d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button className="btn btn-primary" onClick={onSend}>
          Send
        </button>
      </div>
    </Container>
  );
}

export default ChatContainer;

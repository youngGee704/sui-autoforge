// components/ChatSection.tsx
"use client";
import React from 'react';

interface ChatSectionProps {
  messages: string[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages }) => {
  return (
    <div className="chat-section">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.startsWith("Server response to:") ? "ai-message" : "user-message"}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ClipboardCopy, Loader2, CheckCircle } from "lucide-react";

interface ChatProps {
  messages: string[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [showSentAlert, setShowSentAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setShowSentAlert(true);
      setTimeout(() => setShowSentAlert(false), 1500); // Hide sent notification after 1.5s

      onSendMessage(inputValue);
      setInputValue("");
      setIsBotThinking(true);

      setTimeout(() => {
        setIsBotThinking(false);
      }, 2000); // Simulating bot thinking
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 1500); // Hide copy notification after 1.5s
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-900 text-white rounded-lg shadow-lg relative">
      {/* Floating Notifications (Don't Block Chat) */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 flex flex-col space-y-2 items-center">
        {showCopyAlert && (
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-opacity duration-300">
            <CheckCircle size={16} className="mr-2" /> Copied!
          </div>
        )}

        {showSentAlert && (
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-opacity duration-300">
            <CheckCircle size={16} className="mr-2" /> Message Sent!
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-lg border border-gray-700 custom-scrollbar space-y-3"
        style={{ maxHeight: "calc(100vh - 150px)" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`relative p-3 max-w-xs break-words rounded-lg text-sm font-medium ${
              message.startsWith("Server response to:")
                ? "bg-gray-700 text-white self-start ml-4" // Bot messages on the left
                : "bg-blue-600 text-white self-end mr-4" // User messages on the right
            }`}
          >
            {message}
            {message.startsWith("Server response to:") && (
              <button
                className="absolute top-1 right-1 p-1 text-gray-300 hover:text-white"
                onClick={() => handleCopy(message)}
              >
                <ClipboardCopy size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Bot Thinking Animation */}
        {isBotThinking && (
          <div className="ml-4 p-3 max-w-xs bg-gray-700 text-white rounded-lg flex items-center space-x-2">
            <Loader2 size={18} className="animate-spin" /> <span>Bot is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-600 rounded-full outline-none bg-gray-700 text-white placeholder-gray-400"
        />
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ClipboardCopy, Loader2, CheckCircle } from "lucide-react";
import { getChatResponse } from "../../app/api/chat";

interface ChatProps {
  messages: { text: string; isBot: boolean }[];
  onSendMessage: (message: { text: string; isBot: boolean }) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [showSentAlert, setShowSentAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotThinking]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    setShowSentAlert(true);
    setTimeout(() => setShowSentAlert(false), 1500);
    
    onSendMessage({ text: inputValue, isBot: false });
    setInputValue("");
    setIsBotThinking(true);
    
    let botResponse = await getChatResponse(inputValue);
    
    if (/sui blockchain|sui smart contract|move language/i.test(inputValue)) {
      botResponse += `\n\n🔗 **Learn More:**\n- [Sui Blockchain Docs](https://docs.sui.io)\n- [Sui YouTube Tutorials](https://www.youtube.com/results?search_query=sui+blockchain)`;
    }
    
    setTimeout(() => {
      onSendMessage({ text: botResponse, isBot: true });
      setIsBotThinking(false);
    }, 1000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyAlert(true);
    setTimeout(() => setShowCopyAlert(false), 1500);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-900 text-white rounded-lg shadow-lg relative">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
        {showCopyAlert && (
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center">
            <CheckCircle size={16} className="mr-2" /> Copied!
          </div>
        )}
        {showSentAlert && (
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center">
            <CheckCircle size={16} className="mr-2" /> Message Sent!
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-3 max-h-[500px]">
        {messages.map((message, index) => (
          <div key={index} className={`relative p-3 max-w-xl break-words rounded-lg text-sm font-medium whitespace-pre-line ${message.isBot ? "bg-gray-700 text-white self-start ml-4" : "bg-blue-600 text-white self-end mr-4"}`}>
            {message.text}
            {message.isBot && (
              <button
                onClick={() => handleCopy(message.text)}
                className="absolute top-2 right-2 text-white opacity-70 hover:opacity-100"
              >
                <ClipboardCopy size={16} />
              </button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-600 rounded-full bg-gray-700 text-white placeholder-gray-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

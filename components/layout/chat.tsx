"use client";

import React, { useState, useEffect, useRef } from "react";
import { ClipboardCopy, CheckCircle, ArrowDownCircle } from "lucide-react";
import { getChatResponse } from "../../app/api/chat";
import { supabase } from "./../utils/supabaseClient";

interface ChatProps {
  walletAddress: string;
}

const Chat: React.FC<ChatProps> = ({ walletAddress }) => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      fetchMessages();
    }
  }, [walletAddress]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        setShowScrollButton(chatContainerRef.current.scrollTop < chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight - 100);
      }
    };

    const chatElement = chatContainerRef.current;
    if (chatElement) {
      chatElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatElement) {
        chatElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", walletAddress)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }
    setMessages(data.map((msg) => ({ text: msg.content, isBot: msg.is_bot })));
  };

  const saveMessage = async (text: string, isBot: boolean) => {
    if (!walletAddress) return;

    await supabase.from("messages").insert([
      { user_id: walletAddress, content: text, is_bot: isBot },
    ]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    saveMessage(inputValue, false);
    setInputValue("");
    setIsBotThinking(true);

    const botResponse = await getChatResponse(inputValue, walletAddress);

    setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    saveMessage(botResponse, true);
    setIsBotThinking(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessage(text);
      setTimeout(() => setCopiedMessage(null), 2000);
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-3 max-h-[500px] relative">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`relative p-3 max-w-xl break-words rounded-lg text-sm font-medium whitespace-pre-line flex justify-between items-center ${
              message.isBot ? "bg-gray-700 text-white self-start" : "bg-blue-600 text-white self-end"
            }`}
          >
            {message.text.startsWith("```") ? (
              <pre className="bg-black text-blue-400 font-mono p-3 rounded-md overflow-x-auto w-full">
                <code>{message.text.replace(/```/g, "")}</code>
              </pre>
            ) : (
              <span>{message.text}</span>
            )}
            <button
              onClick={() => handleCopy(message.text)}
              className="ml-2 text-gray-300 hover:text-white"
            >
              {copiedMessage === message.text ? <CheckCircle size={18} /> : <ClipboardCopy size={18} />}
            </button>
          </div>
        ))}
        {isBotThinking && <div className="text-gray-400 italic">Bot is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-16 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-500"
        >
          <ArrowDownCircle size={24} />
        </button>
      )}
      <div className="flex items-center p-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about Sui Move smart contracts..."
          className="flex-1 px-4 py-2 border border-gray-600 rounded-full bg-gray-700 text-white"
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

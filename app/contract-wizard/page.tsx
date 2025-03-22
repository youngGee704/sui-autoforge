"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@suiet/wallet-kit";
import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import Chat from "../../components/layout/chat";

const ContractWizardPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { connected } = useWallet();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState<boolean>(() => {
    return typeof window !== "undefined" && sessionStorage.getItem("redirected") === "true";
  });

  useEffect(() => {
    if (connected && !hasRedirected) {
      sessionStorage.setItem("redirected", "true");
      setHasRedirected(true);
      router.push("/contract-wizard");
    } else if (!connected) {
      alert("Gotcha !, You gotta connect your wallet to access the Contract Wizard.");
      router.push("/how-it-works");
    }
  }, [connected, hasRedirected, router]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
    // Simulate a response from the server
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, "Server response to: " + message]);
    }, 1000);
  };

  return (
    <div className="layout-container flex flex-col h-screen">
      <Navbar />
      <div className="main-content flex flex-1">
        <NavigationMenu />
        <div className="chat-container flex flex-1">
          <Chat messages={messages} onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ContractWizardPage;

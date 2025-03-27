"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@suiet/wallet-kit";
import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import Chat from "../../components/layout/chat";

const ContractWizardPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected) {
      router.replace("/how-it-works");
    } else {
      const redirectedBefore = sessionStorage.getItem("redirected") === "true";
      if (!redirectedBefore) {
        sessionStorage.setItem("redirected", "true");
        router.replace("/contract-wizard");
      }
    }
  }, [connected, router]);

  const handleSendMessage = (message: { text: string; isBot: boolean }) => {
    setMessages((prev) => [...prev, message]);
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

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@suiet/wallet-kit";
import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import Chat from "../../components/layout/chat";

const ContractWizardPage: React.FC = () => {
  const { connected, account } = useWallet();
  const router = useRouter();
  const walletAddress = account?.address || "";

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

  return (
    <div className="layout-container flex flex-col h-screen">
      <Navbar />
      <div className="main-content flex flex-1">
        <NavigationMenu />
        <div className="chat-container flex flex-1">
          {/* Pass walletAddress to Chat */}
          <Chat walletAddress={walletAddress} />
        </div>
      </div>
    </div>
  );
};

export default ContractWizardPage;

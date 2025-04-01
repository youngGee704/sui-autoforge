"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@suiet/wallet-kit";
import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import Chat from "../../components/layout/chat";
import { Menu, X } from "lucide-react";

const ContractWizardPage: React.FC = () => {
  const { connected, account } = useWallet();
  const router = useRouter();
  const walletAddress = account?.address || "";
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Mobile Navigation Toggle */}
      <button
        className="md:hidden p-3 fixed top-16 left-4 bg-gray-800 text-white rounded-lg z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="main-content flex flex-1 flex-col md:flex-row">
        {/* Navigation Menu - Collapsible on Mobile */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-900 transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:w-72 z-40`}
        >
          <NavigationMenu />
        </div>

        {/* Chat Container - Fixed Layout Restored */}
        <div className="chat-container flex flex-1 min-h-[75vh] md:min-h-full">
          <Chat walletAddress={walletAddress} />
        </div>
      </div>
    </div>
  );
};

export default ContractWizardPage;

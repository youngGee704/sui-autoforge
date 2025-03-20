"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useWallet } from "@suiet/wallet-kit";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletOptions = [
  {
    id: "suiet",
    name: "Suiet Wallet",
    icon: "/suiet-wallet-icon.png",
    description: "Connect to your Suiet Wallet",
  },
];

export default function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { select, connected, disconnect, account } = useWallet();
  const [connecting, setConnecting] = useState(false);

  if (!isOpen) return null;

  const handleWalletSelect = async () => {
    setConnecting(true);
    try {
      await select("Suiet");
      setConnecting(false);
      onClose();
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0e0e0e] border border-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {connecting ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-12 h-12 border-t-2 border-[#4e8aff] rounded-full animate-spin mb-4"></div>
            <p>Connecting to Suiet Wallet...</p>
          </div>
        ) : connected && account ? (
          <div className="text-center">
            <p>Connected: <strong>{account.address}</strong></p>
            <button onClick={disconnect} className="mt-4 px-4 py-2 bg-red-500 rounded-md">
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={handleWalletSelect}
                className="w-full flex items-center p-4 bg-[#1f2937] hover:bg-[#2d3748] rounded-lg transition-colors"
              >
                <div className="w-10 h-10 mr-4 flex-shrink-0">
                  <Image src={wallet.icon} alt={wallet.name} width={40} height={40} className="rounded-full" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{wallet.name}</h3>
                  <p className="text-sm text-gray-400">{wallet.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

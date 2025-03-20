"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useWallet } from "@mysten/wallet-adapter-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const wallets = [
  {
    id: "sui-wallet",
    name: "Sui Wallet",
    icon: "https://cryptologos.cc/logos/sui-sui-logo.png?v=040",
    bgColor: "bg-blue-500",
  },
];

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { select, connected } = useWallet();
  const router = useRouter();

  // Redirect when wallet is connected
  useEffect(() => {
    if (connected) {
      onClose(); // Close the modal
      router.push("/dashboard"); // Change this to your desired route
    }
  }, [connected, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[#1a1b1f] rounded-xl shadow-xl p-4 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Connect Wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              className="w-full p-3 bg-[#2c2d31] hover:bg-[#3a3b3f] rounded-lg transition-colors flex items-center gap-3"
              onClick={() => select(wallet.id)}
            >
              <div className={`w-8 h-8 rounded-full ${wallet.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Image
                  src={wallet.icon || "/placeholder.svg"}
                  alt={wallet.name}
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </div>
              <span className="text-white text-sm">{wallet.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

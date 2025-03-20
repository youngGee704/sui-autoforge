"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connected } = useWallet();

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-[#0e0e0e] relative transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 transition-all duration-300 ease-in-out">
          <img
            src="https://dashboard.codeparrot.ai/api/image/Z9n1KJIdzXb5Oldl/group-1.png"
            alt="Sui Autoforge Logo"
            width={31}
            height={24}
            className="transition-all duration-300 ease-in-out"
          />
          <span className="text-white font-medium transition-all duration-300 ease-in-out">Sui Autoforge</span>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden z-50 text-white transition-all duration-300 ease-in-out" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-[#0e0e0e] flex flex-col items-center justify-center z-40 transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center gap-8">
          <NavLink href="/" label="Home" closeMenu={() => setIsMenuOpen(false)} />
          <NavLink href="/about" label="About" closeMenu={() => setIsMenuOpen(false)} />
          <NavLink href="/contacts" label="Contacts" closeMenu={() => setIsMenuOpen(false)} />
          <NavLink href="/crypto-market" label="Crypto Market" closeMenu={() => setIsMenuOpen(false)} />
          <NavLink href="/how-it-works" label="How It Works" closeMenu={() => setIsMenuOpen(false)} />
          <ConnectButton>
            Connect Wallet
          </ConnectButton>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 transition-all duration-300 ease-in-out">
        <NavLink href="/" label="Home" />
        <NavLink href="/about" label="About" />
        <NavLink href="/contacts" label="Contacts" />
        <NavLink href="/crypto-market" label="Crypto Market" />
        <NavLink href="/how-it-works" label="How It Works" />
      </div>

      {/* Connect Button */}
      <div className="hidden md:block transition-all duration-300 ease-in-out">
        <ConnectButton>
          Connect Wallet
        </ConnectButton>
      </div>
    </nav>
  );
}

function NavLink({ href, label, closeMenu }: { href: string; label: string; closeMenu?: () => void }) {
  return (
    <Link 
      href={href} 
      className="text-white hover:text-[#4e8aff] transition-colors duration-300 ease-in-out" 
      onClick={closeMenu}
    >
      {label}
    </Link>
  );
}
"use client";
import type React from "react"
import Navbar from "./navbar"
import '@suiet/wallet-kit/style.css';
import { Component } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="container mx-auto px-4 py-4">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>

  )
}

// export default function MainLayout({Component, pageProps }) {
//   return(
//     <WalletProvider>
//     <Component{...pageProps}/>
//     </WalletProvider>
//   )
// }

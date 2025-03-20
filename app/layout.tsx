


import React from "react"; // ✅ Ensure React is imported
import "./globals.css"; // ✅ Import Tailwind globally
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WalletProviderWrapper from "../components/walletProviderWrapper"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sui Autoforge",
  description: "Create SUI Token Contracts in Minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProviderWrapper>{children}</WalletProviderWrapper>
      </body>
    </html>
  );
}

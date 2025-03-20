"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useWallet } from "@suiet/wallet-kit"; // Import useWallet hook
import NavigationMenu from "../../components/layout/navigation-menu"; // ✅ Use the same sidebar
import Navbar from "../../components/layout/navbar"; // Import the new Navbar component
import { ConnectButton } from "@suiet/wallet-kit"; // Import ConnectButton
import "../../styles/homepage.css"; // ✅ Ensure global styles
import "../../styles/how-it-works.css"; // ✅ Ensure page-specific styles

const HowItWorks: React.FC = () => {
  const router = useRouter();
  const { connected } = useWallet(); // Get wallet connection status

  useEffect(() => {
    if (connected) {
      router.push("/contract-wizard"); // Redirect to contract wizard page if wallet is connected
    }
  }, [connected, router]);

  return (
    <>
      <Head>
        <title>How It Works - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Navbar /> {/* ✅ Using the extracted Navbar component */}
        <div className="main-content">
          <NavigationMenu /> {/* ✅ Same sidebar */}
          <div className="mainContent">
            <div className="contentWrapper">
              <div className="textBoxStyle">
                <h1 className="title">How It Works</h1>
                <h3>Step 1: Introduction</h3>
                <p>
                  Sui AutoForge is a revolutionary platform that automates contract creation and deployment on the Sui blockchain.
                </p>
                <h3>Step 2: Connect Wallet</h3>
                <p>
                  Before deploying, you need to connect your Sui-compatible wallet.
                </p>
                <h3>Step 3: Deploy Contracts</h3>
                <p>
                  Use the contract wizard to customize and deploy your smart contracts.
                </p>
                <h3>Additional Information</h3>
                <p>
                  Here’s some more detailed information about the process and its background...
                </p>
                <ConnectButton className="getStartedButton" label="Connect Wallet to Get Started" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useWallet } from "@suiet/wallet-kit";
import NavigationMenu from "../../components/layout/navigation-menu";
import Navbar from "../../components/layout/navbar";
import { ConnectButton } from "@suiet/wallet-kit";
import { FaInfoCircle, FaWallet, FaCogs, FaBook } from "react-icons/fa";
import "../../styles/homepage.css";
import "../../styles/how-it-works.css";

const HowItWorks: React.FC = () => {
  const router = useRouter();
  const { connected } = useWallet();
  const [showProceedButton, setShowProceedButton] = useState(false);

  useEffect(() => {
    setShowProceedButton(connected);
  }, [connected]);

  return (
    <>
      <Head>
        <title>How It Works - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <NavigationMenu />
          <div className="mainContent">
            <div className="contentWrapper">
              <div className="textBoxStyle">
                <h1 className="title">How It Works</h1>
                <h3>
                  <FaInfoCircle className="icon" /> Step 1: Introduction
                </h3>
                <p>
                  Sui AutoForge automates contract creation and deployment on the Sui blockchain.
                </p>
                <h3>
                  <FaWallet className="icon" /> Step 2: Connect Wallet
                </h3>
                <p>Before deploying, connect your Sui-compatible wallet.</p>
                <h3>
                  <FaCogs className="icon" /> Step 3: Deploy Contracts
                </h3>
                <p>Use the contract wizard to customize and deploy your smart contracts.</p>
                <div className="buttonContainer">
                  {!connected && <ConnectButton className="getStartedButton" label="Connect Wallet to Get Started" />}
                  {showProceedButton && (
                    <button className="proceedButton" onClick={() => router.push("/contract-wizard")}>
                      Proceed to Contract Wizard
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .textBoxStyle {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          padding: 20px;
          box-sizing: border-box;
        }

        .icon {
          margin-right: 10px;
          vertical-align: middle;
        }

        .buttonContainer {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }

        .proceedButton {
          background-color: blue;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s, color 0.3s;
        }

        .proceedButton:hover {
          background-color: white;
          color: blue;
          border: 1px solid blue;
        }
      `}</style>
    </>
  );
};

export default HowItWorks;

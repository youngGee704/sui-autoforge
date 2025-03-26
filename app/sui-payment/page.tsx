"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useWallet, ConnectButton } from "@suiet/wallet-kit";
import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import "../../styles/homepage.css";
import "../../styles/sui-payment.css";

const SUI_TO_NAIRA = 2200; // Example conversion rate (1 SUI = 2200 NGN)

const SuiPayment: React.FC = () => {
  const router = useRouter();
  const { connected, account } = useWallet();
  const signAndSubmitTransaction = async (transaction: any) => {
    console.warn("signAndSubmitTransaction is not implemented. Replace this with the correct method.");
    return { digest: "mock-tx-hash" }; // Mock response for demonstration
  };
  const [suiAmount, setSuiAmount] = useState("");
  const [nairaAmount, setNairaAmount] = useState("");

  useEffect(() => {
    if (suiAmount) {
      const converted = parseFloat(suiAmount) * SUI_TO_NAIRA;
      setNairaAmount(isNaN(converted) ? "" : converted.toFixed(2));
    } else {
      setNairaAmount("");
    }
  }, [suiAmount]);

  const handleBuySui = async () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!suiAmount || isNaN(parseFloat(suiAmount)) || parseFloat(suiAmount) <= 0) {
      alert("Enter a valid Sui amount.");
      return;
    }

    try {
      const transaction = {
        kind: "moveCall",
        data: {
          packageObjectId: "0xYOUR_CONTRACT_ID", // Replace with actual contract ID
          module: "payment",
          function: "buy_sui",
          typeArguments: [],
          arguments: [suiAmount, account?.address], // Sending SUI and wallet address
          gasBudget: 2000,
        },
      };

      const response = await signAndSubmitTransaction(transaction);
      alert("Transaction submitted! TX Hash: " + response.digest);
      router.push("/transaction-success"); // Redirect after successful payment
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Buy Sui - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Navbar />
        <div className="main-content">
          <NavigationMenu />
          <div className="content-wrapper">
            <div className="payment-box">
              <h1 className="title">Buy Sui with Naira</h1>
              
              {/* Input for Sui Amount */}
              <label className="label">Amount of Sui:</label>
              <input
                type="number"
                className="input-field"
                placeholder="Enter Sui amount"
                value={suiAmount}
                onChange={(e) => setSuiAmount(e.target.value)}
              />

              {/* Converted Naira Amount */}
              <label className="label">Equivalent in Naira:</label>
              <input type="text" className="input-field" value={nairaAmount} readOnly />

              {/* Connect Wallet & Buy Button */}
              {!connected ? (
                <ConnectButton className="connect-wallet" label="Connect Wallet" />
              ) : (
                <button className="buy-button" onClick={handleBuySui}>
                  Buy Sui
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Internal Styles */}
      <style jsx>{`
        .payment-box {
          background:rgba(4, 14, 26, 0.93);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: auto;
          text-align: center;
          margin-top: 30px;
          margin-left: auto;
        }
        .label {
          font-weight: bold;
          margin-top: 10px;
          display: block;
        }
        .input-field {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          color: black;
        }
        .connect-wallet,
        .buy-button {
          width: 100%;
          padding: 12px;
          margin-top: 15px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        .connect-wallet {
          background: #ff5a5f;
          color: white;
        }
        .buy-button {
          background:rgba(5, 4, 24, 0.63);
          color:rgb(55, 105, 243);
        }
        .buy-button:hover {
          background: black;
          color: white;
          border: 1px solid blue;
        }
      `}</style>
    </>
  );
};

export default SuiPayment;

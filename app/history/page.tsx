"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/layout/navbar"; // ✅ Import Navbar
import NavigationMenu from "../../components/layout/navigation-menu"; // ✅ Sidebar
import "../../styles/homepage.css"; // ✅ Global styles
import "../../styles/history.css"; // ✅ Page-specific styles

// Mock Data for User History (Replace with real data from backend)
const mockHistory = [
  {
    id: 1,
    issue: "Transaction failed, but funds were deducted.",
    link: "https://explorer.sui.io/tx/abc123",
    walletAddress: "0x1234...abcd",
    screenshot: "/images/error1.png",
    date: "March 10, 2025",
  },
  {
    id: 2,
    issue: "Couldn't connect wallet to the platform.",
    link: "",
    walletAddress: "0x5678...efgh",
    screenshot: "/images/error2.png",
    date: "March 12, 2025",
  },
];

const History: React.FC = () => {
  const [history] = useState(mockHistory);

  return (
    <>
      <Head>
        <title>Support History - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Navbar /> {/* ✅ Navbar */}
        <div className="main-content">
          <NavigationMenu /> {/* ✅ Sidebar */}

          {/* History Section */}
          <div className="history-container">
            <h1>Support History</h1>
            <ul className="history-list">
              {history.length > 0 ? (
                history.map((item) => (
                  <li key={item.id} className="history-item">
                    <h3>Issue: {item.issue}</h3>
                    <p><strong>Date:</strong> {item.date}</p>
                    {item.link && (
                      <p>
                        <strong>Related Link:</strong> <a href={item.link} target="_blank" rel="noopener noreferrer">View More</a>
                      </p>
                    )}
                    <p><strong>Wallet Address:</strong> {item.walletAddress}</p>
                    {item.screenshot && <img src={item.screenshot} alt="Screenshot" />}
                  </li>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "white" }}>No support history found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;

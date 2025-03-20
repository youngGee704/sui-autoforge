"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/layout/navbar"; // ✅ Import Navbar
import NavigationMenu from "../../components/layout/navigation-menu"; // ✅ Sidebar
import "../../styles/homepage.css"; // ✅ Global styles
import "../../styles/support.css"; // ✅ Page-specific styles

const Support: React.FC = () => {
  const [problem, setProblem] = useState("");
  const [link, setLink] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Support request submitted! ✅");
    // You can add backend API handling here
  };

  return (
    <>
      <Head>
        <title>Support - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Navbar /> {/* ✅ Navbar */}
        <div className="main-content">
          <NavigationMenu /> {/* ✅ Sidebar */}

          {/* Support Form Section */}
          <div className="support-container">
            <h1>Support Request</h1>
            <form className="support-form" onSubmit={handleSubmit}>
              <label>Describe Your Issue:</label>
              <textarea
                rows={4}
                placeholder="Explain your problem..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
              />

              <label>Upload Screenshot (Optional):</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              <label>Related Link (Optional):</label>
              <input
                type="url"
                placeholder="Paste any related link..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <label>Your Sui Wallet Address:</label>
              <input
                type="text"
                placeholder="Enter your Sui wallet address..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
              />

              <button type="submit">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;

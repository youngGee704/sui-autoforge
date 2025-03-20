"use client";
import React from "react";
import Head from "next/head";
import Header from "../../components/layout/header"; // ✅ Use the same header
import NavigationMenu from "../../components/layout/navigation-menu"; // ✅ Use the same sidebar
import "../../styles/homepage.css"; // ✅ Ensure global styles
import "../../styles/sui-payment.css"; // ✅ Ensure page-specific styles (create this file)

const SuiPayment: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sui Payment - Sui AutoForge</title>
      </Head>
      <div className="layout-container">
        <Header /> {/* ✅ Same navbar */}
        <div className="main-content">
          <NavigationMenu /> {/* ✅ Same sidebar */}
          <div className="mainContent">
            <div className="contentWrapper">
              <h1 className="title">Sui Payment</h1>
              <div className="textContent">
                {/* Add your Figma-based design content here */}
                <p>
                  This is where the Sui payment process will be explained and
                  facilitated. Follow the steps to complete your payment.
                </p>
                {/* Add more content and structure based on your Figma design */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuiPayment;

"use client";
import React from "react";
import Head from "next/head";
import Navbar from "../../components/layout/navbar"; // ✅ Import Navbar
import NavigationMenu from "../../components/layout/navigation-menu"; // ✅ Same sidebar
import "../../styles/homepage.css"; // ✅ Global styles
import "../../styles/sui-payment.css"; // ✅ Page-specific styles

const SuiPayment: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sui Payment - Coming Soon</title>
      </Head>
      <div className="layout-container">
        <Navbar /> {/* ✅ Navbar remains functional */}
        <div className="main-content">
          <NavigationMenu /> {/* ✅ Sidebar remains functional */}

          {/* Blurred content area while keeping Navbar & Sidebar functional */}
          <div className="content-wrapper">
            <div className="blurred-content">
              <div className="coming-soon-text">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuiPayment;

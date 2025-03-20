import React from "react";
import Navbar from "../components/layout/navbar"; // ✅ Corrected path
import Link from "next/link";
import {WalletProvider} from '@suiet/wallet-kit';
// import "@/styles/homepage.css";
import "../styles/homepage.css";


const HomePage: React.FC = () => {
  return (
    
    <div className="container">
      {/* ✅ Using the extracted Navbar component */}
      <Navbar />

      <main className="main">
        <div className="content">
          <h1 className="title">Create SUI Token Contracts in Minutes</h1>
          <div className="underline"></div>

          <div className="features">
            <p>Generate SUI-compliant token contracts</p>
            <p>Convert SUI to NGN, USDT, or other currencies</p>
            <p>Secure wallet integration</p>
          </div>

          <Link href="/how-it-works">
            <button className="getStarted">Get Started Now</button>
          </Link>

          <p className="subtitle">
            Start your journey today and seize the opportunities that await in this exciting new frontier.
          </p>
        </div>

        <div className="cryptoIcons">
          <img
            src="https://dashboard.codeparrot.ai/api/image/Z9n1KJIdzXb5Oldl/icon-cry.png"
            alt="Crypto Icons"
            className="floatingIcons"
          />
          <img
            src="https://dashboard.codeparrot.ai/api/image/Z9n1KJIdzXb5Oldl/raflab-l.png"
            alt="Raflab Logo"
            className="raflabLogo"
          />
        </div>
      </main>
    </div>
  
  );
};

export default HomePage;

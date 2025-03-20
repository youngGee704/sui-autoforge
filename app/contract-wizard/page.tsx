// app/contract-wizard/page.tsx
"use client";
import React from 'react';
import Navbar from "../../components/layout/navbar"; // Ensure this path is correct
import NavigationMenu from '../../components/layout/navigation-menu'; // Ensure this path is correct
import ChatSection from '../../components/layout/chat-section'; // Ensure this path is correct
import ChatInput from '../../components/layout/chat-input'; // Ensure this path is correct

const ContractWizardPage: React.FC = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
        <NavigationMenu />
        <div className="chat-area">
          <ChatSection/>
          <ChatInput/>
        </div>
      </div>
    </div>
  );
};

export default ContractWizardPage;

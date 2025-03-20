import React from "react";
import styles from "../../styles/mainContent.module.css"; // ✅ Main content styles

const MainContent: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>HOW IT WORKS</h2>
        <div className={styles.textContent}>
          <h3>What is Sui AutoForge?</h3>
          <p>Sui AutoForge is a platform that allows seamless smart contract deployment...</p>
          <h3>How does it work?</h3>
          <p>You connect your wallet, configure your contract, and deploy with a few clicks.</p>
          <h3>Security</h3>
          <p>We ensure maximum security for all transactions...</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NavigationMenu: React.FC = () => {
  const router = useRouter(); // ✅ Next.js router for navigation

  const items = [
    { name: "How it works", path: "/how-it-works" },
    { name: "Contract Wizard", path: "/contract-wizard" },
    { name: "Sui Payment", path: "/sui-payment" },
    { name: "Team", path: "/team" },
    { name: "Support", path: "/support" },
    { name: "History", path: "/history" },
  ];

  return (
    <nav style={navigationMenuStyle}>
      {items.map((item, index) => (
        <button
          key={index}
          style={menuItemStyle}
          onClick={() => router.push(item.path)} // ✅ Navigate on click
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
};

const navigationMenuStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "20px",
  padding: "40px 34px",
  backgroundColor: "#282f3c",
  borderRadius: "15px",
  minWidth: "201px",
  height: "auto",
};

const menuItemStyle = {
  width: "100%",
  height: "48px",
  backgroundColor: "#171f2f",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  fontFamily: "Rubik, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  textTransform: "uppercase" as const,
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default NavigationMenu;

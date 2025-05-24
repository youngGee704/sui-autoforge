"use client";
import { FaXTwitter } from "react-icons/fa6"; // Importing X (Twitter) icon
import { IoClose } from "react-icons/io5"; // Importing close (X) icon
import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import "../../styles/homepage.css";
import "../../styles/sui-payment.css";
import "../../styles/how-it-works.css";
import "../../styles/team.css";
import { useState } from "react";

// Team members data
const teamMembers = [
  { name: "Sabrina Favour ", role: "Product Designer", twitter: "Favoursabrina2", image: "/sabrina.png" },
  { name: "Omuya M Mubalig", role: "AI Engineer", twitter: "DPROM3TH3AN", image: "/dpro.jpg" },
  { name: "Saliu Rafiu", role: "UI/UX Designer", twitter: "raflab2023", image: "/rafiu.jpg"},
];

export default function Team() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Hide component if not visible

  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
        <NavigationMenu />
        <div className="mainContent">
          <div className="contentWrapper">
            {/* Close button */}
            {/* <button className="close-btn" onClick={() => setIsVisible(false)}>
              <IoClose className="close-icon" />
            </button> */}

            <h1 className="text-4xl font-bold mb-8">Meet the Team</h1>

            {/* Team Lead */}
            <div className="team-lead">
              <div className="lead-container">
                <img
                  src="/innocent.jpg"
                  alt="Team Lead"
                  className="team-image lead-image"
                />
                <div className="team-info lead-info">
                  <h2 className="team-name">Innocent Goodness</h2>
                  <p className="team-role">Lead Dev</p>
                  <a href="https://x.com/younggee704" target="_blank" className="team-twitter">
                    <FaXTwitter className="twitter-icon" /> YoungGee704
                  </a>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="team-members">
              {teamMembers.map((member, index) => (
                <div className="team-card" key={index}>
                  <img src={member.image} alt={member.name} className="team-image" />
                  <div className="team-info">
                    <h2 className="team-name">{member.name}</h2>
                    <p className="team-role">{member.role}</p>
                    <a href={`https://twitter.com/${member.twitter}`} className="team-twitter" target="_blank">
                      <FaXTwitter className="twitter-icon" /> @{member.twitter}
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

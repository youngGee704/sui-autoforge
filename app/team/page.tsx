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
  { name: "Obogo Ohepo", role: "Backend Dev", twitter: "emmanuelob63048", image: "/obogo.jpg" },
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
                  src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-1/421951323_352109991050569_3675429368566970326_n.jpg?stp=c0.0.1152.1152a_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=2hWc6oCsZE0Q7kNvgGosXQ9&_nc_oc=AdnqqhsJR-oESDS97n5D-9kFVSSNjvZGiOa3pz84RO2BUUBwS6Zd5bPhPwP0E6AyD4U&_nc_zt=24&_nc_ht=scontent.flos5-2.fna&_nc_gid=XEfxYPoYcUxdWvEJMZWB1A&oh=00_AYERjfbRkuh2IHP2gjCH0C-8eFDZH_KM_WHLe_tSgg_1WA&oe=67E77A4E"
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

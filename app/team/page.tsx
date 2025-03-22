import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu";
import "../../styles/homepage.css";
import "../../styles/sui-payment.css";
import "../../styles/how-it-works.css";

export default function Team() {
  return (
    <div className="layout-container">
      <Navbar /> {/* ✅ Navbar remains unchanged */}
      <div className="main-content">
        <NavigationMenu /> {/* ✅ Sidebar placed correctly */}
        <div className="mainContent">
          <div className="contentWrapper">
            <h1 className="text-4xl font-bold mb-8">Meet the Team</h1>
            <div className="team-members">
              <div className="team-card">
                <img
                  src="/path/to/member1.jpg"
                  alt="Team Member 1"
                  className="team-image"
                />
                <h2 className="team-name">Member 1</h2>
                <p className="team-role">Role</p>
              </div>
              <div className="team-card">
                <img
                  src="/path/to/member2.jpg"
                  alt="Team Member 2"
                  className="team-image"
                />
                <h2 className="team-name">Member 2</h2>
                <p className="team-role">Role</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

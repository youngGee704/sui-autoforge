import Navbar from "../../components/layout/navbar";
import NavigationMenu from "../../components/layout/navigation-menu"; // ✅ Use the same sidebar
import "../../styles/homepage.css"; // ✅ Ensure global styles
import "../../styles/sui-payment.css"; // ✅ Ensure page-specific styles (create this file)

export default function Team() {
  return (
    <div className="layout-container">
      <Navbar />
      <NavigationMenu /> 
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Meet the Team</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Team member cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src="/path/to/member1.jpg"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">Member 1</h2>
            <p className="text-center text-gray-600">Role</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src="/path/to/member2.jpg"
              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">Member 2</h2>
            <p className="text-center text-gray-600">Role</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </main>
    </div>
  );
}

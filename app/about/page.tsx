import React from "react";
import MainLayout from "../../components/layout/main-layout";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container py-12 md:py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
          About Sui Autoforge
          <div className="w-48 sm:w-64 md:w-96 h-1 bg-[#4e8aff] mt-2"></div>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              Sui Autoforge is dedicated to simplifying the creation and management of SUI Move contracts. Our platform
              enables developers and businesses to generate compliant token contracts in minutes, without the need for
              deep blockchain expertise.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
            <ul className="space-y-2 text-gray-300">
              {[
                "Intuitive Chat interface for Contract creation",
                "Secure and audited contract templates",
                "Seamless wallet login integration",
                "Comprehensive documentation and support",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-[#4e8aff] text-lg">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Our Technology</h2>
          <p className="text-gray-300 mb-6">
            Built on the Sui blockchain, our platform leverages the latest advancements in sui blockchain technology to
            provide a secure, efficient, and user-friendly experience. We prioritize security, scalability, and ease of
            use in all our solutions.
          </p>

          <div className="bg-[#111827] p-6 rounded-lg border border-gray-800 mt-8">
            <h3 className="text-xl font-bold mb-4">Key Features</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Contract Generation", desc: "Create custom contracts with configurable parameters" },
                { title: "Deploy Hub", desc: "Seamlessly deploy generated contract to the sui blockchain" },
                { title: "Wallet Integration", desc: "Easy Login integration with the sui wallet" },
                { title: "Contract Templates", desc: "Pre-built, audited contract templates" },
              ].map((feature, index) => (
                <div key={index} className="p-4 bg-[#1f2937] rounded-lg">
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

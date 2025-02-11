import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import Sidebar from "./dashboard/Sidebar";
import MainContent from "./dashboard/MainContent";

interface HomeProps {
  initialUserRole?: "farmer" | "distributor" | "retailer" | "consumer";
}

const Home = ({ initialUserRole = "consumer" }: HomeProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole] = useState(initialUserRole);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        onMenuClick={toggleSidebar}
        userName="John Farmer"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnFarmer"
        notifications={5}
      />

      <div className="flex-1 flex overflow-hidden">
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform transition-transform duration-200 ease-in-out fixed lg:relative lg:translate-x-0 z-20 h-[calc(100vh-5rem)]`}
        >
          <Sidebar userRole={userRole} />
        </div>

        <div className="flex-1 overflow-auto">
          <MainContent userRole={userRole} />
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import DashboardHeader from "../dashboard/DashboardHeader";
import Sidebar from "../dashboard/Sidebar";
import { UserRole } from "@/lib/types";

const MainLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        onMenuClick={toggleSidebar}
        userName={user?.name || "User"}
        userAvatar={user?.avatar}
        onLogout={() => window.location.reload()}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            transform transition-transform duration-200 ease-in-out fixed lg:relative lg:translate-x-0 z-20 h-[calc(100vh-5rem)]`}
        >
          <Sidebar userRole={user?.role || "consumer"} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
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

export default MainLayout;

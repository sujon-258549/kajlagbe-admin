import { useState } from "react";
import Header from "../Components/common/Header";
import Sidebar from "../Components/common/Sidebar";
import { Outlet } from "react-router";
import Dashboard from "../Components/dashboard/Dashboard";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Pass state and toggle function to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : "lg:pl-20"} pl-0`}
      >
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-4">
          <Dashboard />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

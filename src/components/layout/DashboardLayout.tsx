"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
        console.log('toggleSidebar', )
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />
  
          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    );
  };

export default DashboardLayout;

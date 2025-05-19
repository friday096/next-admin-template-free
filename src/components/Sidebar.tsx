"use client";

import Link from "next/link";
import { Home, X } from "lucide-react";
import SidebarDropdown from "./ui/SidebarDropdown";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  console.log('isOpen', isOpen)
  return (
    <aside
    className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 lg:static`}
    >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700 dark:text-white">Admin Panel</h1>
          
          {/* Close icon for mobile only */}
          <button onClick={toggleSidebar} className="lg:hidden text-gray-700 dark:text-white">
            <X size={24} />
          </button>
        </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
              <Home className="w-5 h-5 mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <SidebarDropdown
              title="Manage Users"
              items={[
                { name: "All Users", href: "/users" },
                { name: "Admins", href: "/admins" },
              ]}
            />
          </li>
          <li>
            <SidebarDropdown
              title="Settings"
              items={[
                { name: "General", href: "/settings/general" },
                { name: "Security", href: "/settings/security" },
              ]}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

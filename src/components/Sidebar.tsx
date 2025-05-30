"use client";

import Link from "next/link";
import { Home, X } from "lucide-react";
import SidebarDropdown from "./ui/SidebarDropdown";
import { FaRegUser, FaUsers, FaUserTie } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineSecurity, MdOutlineSettings } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  console.log("isOpen", isOpen);
  return (
    <aside
      className={`sidebarMain fixed inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-300 ease-in-out min-h-screen ${
        isOpen
          ? "-translate-x-full sidebar"
          : "translate-x-0 lg:translate-x-0 lg:static"
      } `}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>

        {/* Close icon for mobile only */}
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-6 px-2">
        <ul className="sidebarUl">
          <div className="pb-3">
            <small className="text-white">MENU</small>
          </div>
          <li className="sidebarBtn active">
            <Link
              href="/dashboard"
              className="flex items-center px-4 text-white"
            >
              <Home className="w-5 h-5 mr-2" /> Dashboard
            </Link>
          </li>
          <li className="sidebarBtn">
            <SidebarDropdown
              icon={<FaRegUser />}
              title="Manage Users"
              items={[
                { name: "All Users", href: "/user", icons: <FaUsers /> },
                {
                  name: "Admins",
                  href: "/admins",
                  icons: <MdAdminPanelSettings />,
                },
              ]}
            />
          </li>
          <li className="sidebarBtn">
            <SidebarDropdown
              icon={<MdOutlineSettings className="h-[1.2em] w-[1.2  em]" />}
              title="Settings"
              items={[
                {
                  name: "General",
                  href: "/settings/general",
                  icons: <IoMdSettings />,
                },
                {
                  name: "Security",
                  href: "/settings/security",
                  icons: <MdOutlineSecurity />,
                },
              ]}
            />
          </li>
          <li className="sidebarBtn">
            <Link
              href="/dashboard/user"
              className="flex items-center gap-2 px-4 text-white"
            >
             <FaUserTie />User
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

"use client";

import { Menu } from "lucide-react";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      {/* Hamburger Button */}
      <Button onClick={toggleSidebar}>
        <Menu size={24} />
      </Button>

      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Dashboard</h2>

      {/* Profile Dropdown */}
      <Dropdown
        label="👤"
        items={[
          { name: "Profile", onClick: () => console.log("Profile Clicked") },
          { name: "Settings", onClick: () => console.log("Settings Clicked") },
          { name: "Logout", onClick: () => console.log("Logged Out") },
        ]}
      />
    </header>
  );
};

export default Header;

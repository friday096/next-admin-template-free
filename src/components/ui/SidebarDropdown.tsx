import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SidebarDropdown = ({ title, items }: { title: string; items: { name: string; href: string }[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
        {title} {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <ul className="pl-6">
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarDropdown;

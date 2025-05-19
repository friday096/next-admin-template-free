import { useState } from "react";

const Dropdown = ({ label, items }: { label: string; items: { name: string; onClick: () => void }[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
        {label}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
          {items.map((item, index) => (
            <li key={index} onClick={item.onClick} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

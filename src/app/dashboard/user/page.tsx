"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Pagination from "@/components/pagination/Pagination";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Menu } from "@headlessui/react";

const tableHeaders = ["Name", "Email", "Company", "Status", "Action"];
const ITEMS_PER_PAGE = 8;

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const StatusBadge: React.FC = () => (
  <div className="flex items-center">
    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
    Online
  </div>
);

const User: React.FC = () => {
  const [userDatas, setUserDatas] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUserDatas(data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredUsers = userDatas.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const ids = currentUsers.map((user) => user.id);
      setSelectedIds(ids);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleView = (user: UserData) => {
    alert(
      `Viewing user:\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}`
    );
  };

  const handleEdit = (user: UserData) => {
    alert(`Editing user:\nName: ${user.firstName} ${user.lastName}`);
    // Add your modal or routing logic here
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUserDatas((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <DashboardLayout>
      {/* Search */}
      <div className="mb-4">
        <div className="relative mt-1">
          <input
            type="text"
            id="table-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for users"
            className="block py-3 px-5 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#333333] dark:border-[#414141] dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="uppercase border-b border-[#c8c8c8] dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a]">
            <tr>
              <th className="p-4">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              {tableHeaders.map((title, i) => (
                <th key={i} className="px-4 py-3 whitespace-nowrap">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b border-[#c8c8c8] dark:border-[#414141] dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#414141]"
                >
                  <td className="w-4 p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge />
                  </td>
                  <td className="px-4 py-3 text-center relative">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button>
                        <HiOutlineDotsVertical className="w-5 h-5" />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right bg-white dark:bg-[#2a2a2a] border dark:border-[#414141] rounded-md shadow-lg z-10">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleView(user)}
                              className={`${
                                active
                                  ? "bg-white text-dark dark:bg-[#3a3a3a] dark:text-white"
                                  : ""
                              } w-full px-4 py-2 text-sm text-left`}
                            >
                              View
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleEdit(user)}
                              className={`${
                                active
                                  ? "bg-white text-dark dark:bg-[#3a3a3a] dark:text-white"
                                  : ""
                              } w-full px-4 py-2 text-sm text-left`}
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className={`${
                                active
                                  ? "bg-white text-dark dark:bg-[#3a3a3a] dark:text-white"
                                  : ""
                              } w-full px-4 py-2 text-sm text-left text-red-500`}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default User;

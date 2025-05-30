"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Pagination from "@/components/pagination/Pagination";
import { HiOutlineDotsVertical } from "react-icons/hi";

const tableHeaders = ["Name", "Email", "Company", "Status", "Action"];

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

interface CheckboxCellProps {
  id: number;
}

const ITEMS_PER_PAGE = 8; // Show 8 users per page

const CheckboxCell: React.FC<CheckboxCellProps> = ({ id }) => (
  <td className="w-4 p-4">
    <div className="flex items-center">
      <input
        id={`checkbox-${id}`}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={`checkbox-${id}`} className="sr-only">
        checkbox
      </label>
    </div>
  </td>
);

const StatusBadge: React.FC = () => (
  <div className="flex items-center">
    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
    Online
  </div>
);

const User: React.FC = () => {
  const [userDatas, setUserDatas] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUserDatas(data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalPages = Math.ceil(userDatas.length / ITEMS_PER_PAGE);

  // Slice users for current page
  const currentUsers = userDatas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DashboardLayout>
      {/* Search */}
      <div className="mb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="table-search"
            placeholder="Search for users"
            className="block py-3 px-5 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#333333] dark:border-[#414141] dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg grid grid-cols-1">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="uppercase border-b border-[#c8c8c8] dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a]">
            <tr>
              <th className="p-4">
                <input id="checkbox-all" type="checkbox" className="w-4 h-4" />
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
                  Loading users...
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b border-[#c8c8c8] dark:border-[#414141] dark:bg-[#212121] hover:bg-gray-50 dark:hover:bg-[#414141]"
                >
                  <CheckboxCell id={user.id} />
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
                    <HiOutlineDotsVertical className="w-5 h-5" />
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

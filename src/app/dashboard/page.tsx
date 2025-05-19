import DashboardLayout from "@/components/layout/DashboardLayout";


const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,250</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">New Orders</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">320</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Revenue</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$25,500</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Feedback</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">85%</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

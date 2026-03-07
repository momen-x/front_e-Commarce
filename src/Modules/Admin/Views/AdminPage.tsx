// app/admin/page.tsx or pages/admin.tsx

import AdminLayout from "./Layout";

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
        </header>

        {/* Dashboard Cards */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Users
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage user accounts
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Categories
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage categories
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage products
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Orders
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View and manage orders
              </p>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;

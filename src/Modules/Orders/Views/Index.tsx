import { useGetAllOrders } from "../Hooks/Orders";
import { useState } from "react";

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const TableOfOrders = () => {
  const { data: orders, isLoading, isError } = useGetAllOrders();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search
  const filteredOrders =
    orders?.filter(
      (order) =>
        order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (isLoading) {
    return (
      <div className="w-[90vw] max-w-7xl mx-auto py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[90vw] max-w-7xl mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">
            Failed to load orders. This area is restricted to administrators
            only.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please ensure you have admin privileges and are logged in.
          </p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="w-[90vw] max-w-7xl mx-auto py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No orders found
          </h3>
          <p className="mt-2 text-gray-500">
            There are no orders in the system yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90vw] max-w-7xl mx-auto py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Orders Management
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            A list of all orders in the system. Total: {orders.length} orders
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-4 sm:mt-0">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Search by email or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="mt-8 hidden sm:block">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {order.user?.userImage?.url ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={order.user.userImage.url}
                            alt={`${order.user.firstName} ${order.user.lastName}`}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                              {order.user?.firstName?.[0]}
                              {order.user?.lastName?.[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {order.user?.firstName} {order.user?.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.customerEmail || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(order.updatedAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ${order.totalPrice?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="mt-8 sm:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex-shrink-0">
                    {order.user?.userImage?.url ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={order.user.userImage.url}
                        alt={`${order.user.firstName} ${order.user.lastName}`}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                          {order.user?.firstName?.[0]}
                          {order.user?.lastName?.[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.user?.firstName} {order.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.customerEmail || "N/A"}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.isPaid
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-200 dark:border-gray-700 pt-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Created
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Updated
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
                <div className="col-span-2 flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total Amount
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${order.totalPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No orders match your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default TableOfOrders;

import { useGetAllOrders } from "@/Modules/Orders/Hooks/Orders";
import { useState } from "react";
import AdminLayout from "../Layout";

export default function TableOfOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending">(
    "all",
  );

  const { data: orders, isLoading, isError } = useGetAllOrders();

  // Filter orders based on search term and status
  const filteredOrders =
    orders?.filter((order) => {
      const matchesSearch =
        order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order.user?.firstName} ${order.user?.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "paid" && order.isPaid) ||
        (statusFilter === "pending" && !order.isPaid);

      return matchesSearch && matchesStatus;
    }) || [];

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

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
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-12 text-center">
          <p className="text-red-600 dark:text-red-400">
            Failed to load orders
          </p>
        </div>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <AdminLayout>
        <div className="w-[90vw] max-w-7xl mx-auto py-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {searchTerm || statusFilter !== "all"
                ? "No matching orders"
                : "No orders found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter"
                : "There are no orders in the system yet"}
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="w-[90vw] max-w-7xl mx-auto py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Orders
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and track all customer orders • {filteredOrders.length}{" "}
              total
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  statusFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("paid")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  statusFilter === "paid"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  statusFilter === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Pending
              </button>
            </div>

            {/* Search */}
            <div className="relative w-72">
              <input
                type="text"
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3.5 top-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

        {/* Desktop Table */}
        <div className="hidden md:block bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-8 py-5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm flex-shrink-0">
                        {order.user?.userImage?.url ? (
                          <img
                            src={order.user.userImage.url}
                            alt={`${order.user.firstName} ${order.user.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(
                            order.user?.firstName || "",
                            order.user?.lastName || "",
                          )
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {order.user?.firstName} {order.user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {order._id.slice(-8)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                      {order.customerEmail}
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.createdAt)}
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-1.5 ${order.isPaid ? "bg-emerald-500" : "bg-amber-500"}`}
                      ></div>
                      {order.isPaid ? "PAID" : "PENDING"}
                    </span>
                  </td>

                  <td className="px-8 py-5">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.updatedAt)}
                    </div>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="font-semibold text-gray-900 dark:text-white tabular-nums">
                      ${order.totalPrice?.toFixed(2) || "0.00"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-5 cursor-pointer active:scale-[0.985] transition-transform"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg font-medium">
                    {order.user?.userImage?.url ? (
                      <img
                        src={order.user.userImage.url}
                        alt={order.user.firstName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(
                        order.user?.firstName || "",
                        order.user?.lastName || "",
                      )
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {order.user?.firstName} {order.user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      #{order._id.slice(-8)}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 text-[10px] font-semibold rounded-2xl ${
                    order.isPaid
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-400"
                  }`}
                >
                  {order.isPaid ? "PAID" : "PENDING"}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">EMAIL</div>
                  <div className="font-mono text-gray-600 dark:text-gray-300 text-xs break-all">
                    {order.customerEmail}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">TOTAL</div>
                  <div className="font-semibold text-lg text-gray-900 dark:text-white">
                    ${order.totalPrice?.toFixed(2) || "0.00"}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs flex justify-between text-gray-500">
                <div>{formatDate(order.createdAt)}</div>
                <div className="text-right">
                  Updated {formatDate(order.updatedAt).split(",")[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

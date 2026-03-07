import { toast } from "react-toastify";
import { useDeleteUser, useGetAllUsers } from "../../Hooks/useGetAllUsers";
import DeleteBtn from "@/components/DeleteBtn";
import AdminLayout from "../Layout";

const TableOfUsers = () => {
  const { data: users, error, isLoading } = useGetAllUsers();
  const { mutateAsync: deleteUser } = useDeleteUser(
    () => {
      toast.success("user deleted successfully");
    },
    () => {
      toast.error("something went wrong");
    },
  );

  const handleUserDelete = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      toast.error("Cannot delete an admin account");
      return;
    }
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error("delete mutation error", err);
    }
  };

  if (error) {
    return <p>somethings went wrong</p>;
  }
  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <AdminLayout>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Users Management
                </h1>
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Total: <span className="font-semibold">{users.length}</span>{" "}
                  comments
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      User name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Created at
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <p className="text-lg">No comments found</p>
                          <p className="text-sm mt-1">
                            all users will display here once the any user log in
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="max-w-md">
                            <p className="text-gray-800 dark:text-white">
                              {user._id}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-gray-800 dark:text-white font-medium">
                              {user.firstName + " " + user.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {user.isAdmin ? (
                            <span className="text-xs text-red-500">Admin</span>
                          ) : (
                            <DeleteBtn
                              title="delete user"
                              message="are u sure you want to delete this user"
                              handleSubmit={async () => {
                                await handleUserDelete(
                                  user._id.trim(),
                                  user.isAdmin,
                                );
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default TableOfUsers;

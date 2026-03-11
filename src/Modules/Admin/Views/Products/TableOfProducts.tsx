import DeleteBtn from "@/components/DeleteBtn";
import {
  useDeleteProduct,
  useFilteringProductsByCategory,
  useGetProductsAndPageCount,
} from "@/Modules/Products/Hooks/useProducts";
import { toast } from "react-toastify";
import AdminLayout from "../Layout";
import UpdateBtn from "@/components/UpdateBtn";

const TableOfProducts = () => {
  const { products, error, isLoading } = useFilteringProductsByCategory(
    "All products",
    1,
    10
  );
  const { productsCount } = useGetProductsAndPageCount();
  const { mutateAsync: handleDeleteProduct } = useDeleteProduct(
    () => {
      toast.success("product deleted successfully");
    },
 
  );

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
                  Products Management
                </h1>
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Total: <span className="font-semibold">{productsCount}</span>{" "}
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
                      Product ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Product Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Product Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Product Category
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
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <p className="text-sm mt-1">
                            all products will display here once the any user log
                            in
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="max-w-md">
                            <p className="text-gray-800 dark:text-white">
                              {product._id}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-gray-800 dark:text-white font-medium">
                              {product.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {product.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {product.categoryId?.title ?? "no category"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                          {new Date(product.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="flex gap-4 px-6 py-4">
                          <DeleteBtn
                            title="delete product"
                            message="are u sure you want to delete this product"
                            handleSubmit={async () => {
                              await handleDeleteProduct(product._id.trim());
                            }}
                          />
                          <UpdateBtn
                            path="/admin/products/$productId"
                            params={"productId"}
                            paramsId={product._id}
                          />
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

export default TableOfProducts;

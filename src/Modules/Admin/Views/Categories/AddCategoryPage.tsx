import { toast } from "react-toastify";
import { useAddCategory } from "@/Modules/Categories/Hooks/useCategory";
import AdminLayout from "../Layout";
import CategoryForm from "./CategoryForm";

const AddCategory = () => {
  const { mutate: handleAddCategory, isPending } = useAddCategory(
    () => {
      toast.success("Category added successfully");
    },
    () => {
      toast.error("Something went wrong");
    }
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Add New Product
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <CategoryForm
              onSubmit={(data) => handleAddCategory(data)}
              isPending={isPending}
              submitLabel="Add New Product"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCategory;

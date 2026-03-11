import { useParams } from "@tanstack/react-router";
import { toast } from "react-toastify";
import {
  useUpdateCategory,
  useGetCategoryById,
} from "@/Modules/Categories/Hooks/useCategory";
import CategoryForm from "./CategoryForm";

const EditCategoryPage = () => {
  const { categoryId } = useParams({ strict: false });
  const { category, isLoading } = useGetCategoryById(categoryId as string);
  const { mutate: handleUpdateCategory, isPending } = useUpdateCategory(
    () => toast.success("Product updated successfully"),
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Update Product
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <CategoryForm
            onSubmit={(data) =>
              handleUpdateCategory({
                id: categoryId || "",
                ...data,
                data: data,
              })
            }
            isPending={isPending}
            submitLabel="Update Product"
            defaultValues={{
              title: category?.title,
              description: category?.description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPage;

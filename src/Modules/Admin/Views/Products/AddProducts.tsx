import { toast } from "react-toastify";
import { useAddProduct } from "@/Modules/Products/Hooks/useProducts";
import ProductForm from "./ProductForm";

const AddProducts = () => {
  const { mutate: handleAddProduct, isPending } = useAddProduct(
    () => toast.success("Product added successfully"),
    () => toast.error("Something went wrong")
  );


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Add New Product
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <ProductForm
            onSubmit={(data) => handleAddProduct(data)}
            isPending={isPending}
            submitLabel="Add New Product"

          />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;

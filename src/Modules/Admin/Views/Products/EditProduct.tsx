import { useNavigate, useParams } from "@tanstack/react-router";
import { toast } from "react-toastify";
import {
  useUpdateProduct,
  useGetProductById,
} from "@/Modules/Products/Hooks/useProducts";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { productId } = useParams({ strict: false });
  const navigate = useNavigate();

  // fetch existing product data to prefill the form
  const { product, isLoading } = useGetProductById(productId as string);

  const { mutate: handleUpdateProduct, isPending } = useUpdateProduct(() =>
    toast.success("Product updated successfully"),
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div
        onClick={() => navigate({ to: "/admin/products-table" })}
        className="cursor-pointer w-[60vw] m-auto mb-8"
      >
        {"<- return to products table"}
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Update Product
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <ProductForm
            onSubmit={(data) =>
              handleUpdateProduct({
                id: productId || "",
                ...data,
                data: data,
              })
            }
            isPending={isPending}
            submitLabel="Update Product"
            defaultValues={{
              // ← prefill with existing data
              title: product?.title,
              description: product?.description,
              price: product?.price,
              categoryId: product?.categoryId._id,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

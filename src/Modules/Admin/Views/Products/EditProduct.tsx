import { useNavigate, useParams } from "@tanstack/react-router";
import { toast } from "react-toastify";

import {
  useUpdateProduct,
  useGetProductById,
} from "@/Modules/Products/Hooks/useProducts";

import type { updateProductSchemaType } from "@/Modules/Products/Validations/Products";

import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { productId } = useParams({
    strict: false,
  });

  const navigate = useNavigate();

  const { product, isLoading } = useGetProductById(productId as string);

  const { mutate: handleUpdateProduct, isPending } = useUpdateProduct(() => {
    toast.success("Product updated successfully");
  });

  const handleSubmit = (data: updateProductSchemaType) => {
    console.log("UPDATE DATA:", data);

    handleUpdateProduct({
      id: productId as string,

      data: {
        ...data,
        categoryId: Number(data.categoryId),
        price: Number(data.price),
      },
    });
  };

  if (isLoading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="p-10 text-center text-red-500">Product not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div
        onClick={() =>
          navigate({
            to: "/admin/products-table",
          })
        }
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
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Update Product"
            defaultValues={{
              title: product.title ?? "",

              description: product.description ?? "",

              price: Number(product.price) || 0,

              categoryId: Number(product.category.id) || 0,

              image: undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

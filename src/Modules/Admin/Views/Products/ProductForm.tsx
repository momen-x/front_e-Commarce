import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductSchema,
  type addProductSchemaType,
} from "@/Modules/Products/Validations/Products";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useGetAllCategories } from "@/Modules/Categories/Hooks/useCategory";

interface ProductFormProps {
  onSubmit: (data: addProductSchemaType) => void;
  isPending: boolean;
  defaultValues?: Partial<addProductSchemaType>; // ← prefill for update
  submitLabel?: string; // "Add Product" or "Update Product"
}

const ProductForm = ({
  onSubmit,
  isPending,
  defaultValues,
  submitLabel = "Add New Product",
}: ProductFormProps) => {
  const form = useForm<addProductSchemaType>({
    mode: "onChange",
    resolver: zodResolver(addProductSchema) as Resolver<addProductSchemaType>,
    defaultValues: {
      categoryId: "",
      description: "",
      price: 0,
      title: "",
      image: undefined,
      ...defaultValues, // ← override with existing data if updating
    },
  });

  const watchedCategoryId = form.watch("categoryId");
  const { categories } = useGetAllCategories();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Title
          </label>
          <ValidationInput<addProductSchemaType>
            fieldTitle=""
            nameInSchema="title"
            placeholder="e.g., Premium Cotton T-Shirt"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between px-4 py-3 text-left font-normal border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {watchedCategoryId
                  ? categories.find((c) => c._id === watchedCategoryId)?.title
                  : "Select a category"}
                <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1"
            >
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category._id}
                  onClick={() =>
                    form.setValue("categoryId", category._id, {
                      shouldValidate: true,
                    })
                  }
                  className="cursor-pointer px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {category.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Image
          </label>
          <ValidationInput<addProductSchemaType>
            fieldTitle=""
            nameInSchema="image"
            placeholder="add product image"
            type="file"
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <ValidationInput<addProductSchemaType>
            fieldTitle=""
            nameInSchema="description"
            placeholder="Describe your product features, materials, etc."
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price ($)
          </label>
          <ValidationInput<addProductSchemaType>
            fieldTitle=""
            nameInSchema="price"
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!form.formState.isValid || isPending}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Please wait..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;

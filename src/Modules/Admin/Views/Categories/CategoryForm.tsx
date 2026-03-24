import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/Modules/Categories/Validations/category";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

interface CategoryFormProps {
  onSubmit: (data: addCategorySchemaType) => void;
  isPending: boolean;
  defaultValues?: Partial<addCategorySchemaType>;
  submitLabel?: string;
}
const CategoryForm = ({
  onSubmit,
  isPending,
  defaultValues,
  submitLabel = "Add New Category",
}: CategoryFormProps) => {
  const form = useForm<addCategorySchemaType>({
    mode: "onChange",
    resolver: zodResolver(addCategorySchema) as Resolver<addCategorySchemaType>,
    defaultValues: {
      description: "",
      title: "",
      ...defaultValues, // ← override with existing data if updating
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Title
            </label>
            <ValidationInput<addCategorySchemaType>
              fieldTitle=""
              nameInSchema="title"
              placeholder="e.g., best collections here"
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <ValidationInput<addCategorySchemaType>
              fieldTitle=""
              nameInSchema="description"
              placeholder="Describe your Category features, materials, etc."
              type="text"
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
    </div>
  );
};

export default CategoryForm;

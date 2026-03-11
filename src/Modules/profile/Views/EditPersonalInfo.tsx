import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationInput from "@/components/Inputs/ValidationInput";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import top from "@/Utils/top";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useNavigate } from "@tanstack/react-router";
import { Mail, User } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdateUserProfile } from "../Hooks/useUser";
import {
  UpdateUserSchema,
  type UpdateUserType,
} from "../Validations/UpdateUserData";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";

const EditPersonalInfo = () => {
  top();
  const navigate = useNavigate();
  const { mutate: handleUpdateUserProfile } = useUpdateUserProfile(() => {
    toast.success("Profile updated successfully!");
    navigate({ to: "/profile" });
  });
  const { data, isLoading } = useGetCurrentUser();
  const form = useForm<UpdateUserType>({
    mode: "onChange",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  }, [data, form]);
  const handleUpdate = (data: UpdateUserType) => {
    try {
      handleUpdateUserProfile(data);
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[50vw] m-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h2>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(handleUpdate)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <ValidationInput<UpdateUserType>
                    fieldTitle="First Name"
                    nameInSchema="firstName"
                    placeholder="enter your first name"
                    className="h-12 w-full"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <ValidationInput<UpdateUserType>
                    fieldTitle="Last Name"
                    nameInSchema="lastName"
                    placeholder="enter your last name"
                    className="h-12 w-full"
                    type="text"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    defaultValue={data?.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;

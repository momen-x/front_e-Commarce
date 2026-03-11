import {
  ChangePasswordValidation,
  type ChangePasswordType,
} from "../Validations/ChangePassword";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "../Hooks/useUser";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import top from "@/Utils/top";
const ChangePassword = () => {
  top();

  const form = useForm<ChangePasswordType>({
    mode: "onChange",
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const navigate = useNavigate();
  const { mutate: handleUpdatePassword } = useUpdatePassword(() => {
    toast.success("password updated successfully");
    navigate({ to: "/profile" });
  });

  const handleSubmit = (data: ChangePasswordType) => {
    try {
      handleUpdatePassword(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Change password?
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Fill in these fields to continue
          </p>
        </div>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="relative">
              <ValidationInput<ChangePasswordType>
                fieldTitle="Enter your old password"
                nameInSchema="oldPassword"
                placeholder="********"
                type="password"
                className="h-12 w-full"
              />
            </div>
            <div className="relative">
              <ValidationInput<ChangePasswordType>
                fieldTitle="Enter the new password"
                nameInSchema="newPassword"
                placeholder="********"
                type="password"
                className="h-12 w-full"
              />
            </div>
            <div className="relative">
              <ValidationInput<ChangePasswordType>
                fieldTitle="Confirm the new password"
                nameInSchema="confirmNewPassword"
                placeholder="********"
                type="password"
                className="h-12 w-full"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="mt-4 w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-lg"
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;

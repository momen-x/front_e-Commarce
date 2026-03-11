import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { Button } from "@/components/ui/button";
import {
  resetPasswordValidation,
  type resetPasswordValidationType,
} from "../Validations/Password";
import { useResetPassword } from "../Hooks/useResetPassword";
import top from "@/Utils/top";
import useProtectedAuthPages from "@/Utils/useProtectedAuthPages";

const ResetPassword = () => {
  top();
  useProtectedAuthPages();
  const form = useForm<resetPasswordValidationType>({
    resolver: zodResolver(resetPasswordValidation),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });
  const navigate = useNavigate();
  const { mutate: handleResetPassword } = useResetPassword(
    () => {
      toast.success("your password has been reset successfully");
      form.reset();
      navigate({ to: "/" });
    },

  );

  const handleSubmit = (data: resetPasswordValidationType) => {
    try {
      handleResetPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Enter the new password
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="relative">
              <ValidationInput<resetPasswordValidationType>
                fieldTitle="Enter your password"
                nameInSchema="password"
                placeholder="enter a strong password"
                type="password"
                className="h-12 w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-lg"
            >
              Reset
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;

import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useNavigate } from "@tanstack/react-router";
import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { Button } from "@/components/ui/button";
import {
  forgotPasswordValidation,
  type forgotPasswordValidationType,
} from "../Validations/Password";
import { useForgotPassword } from "../Hooks/useForgotPassword";
import top from "@/Utils/top";
import useProtectedTheAuthPages from "../Utils/useProtectedTheAuthPages";

const ForgotPasswordPage = () => {
  top();
  useProtectedTheAuthPages();
  const form = useForm<forgotPasswordValidationType>({
    resolver: zodResolver(forgotPasswordValidation),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  // const navigate = useNavigate();
  const { mutate: handleForgotPassword, isPending } = useForgotPassword(() => {
    toast.success("verify your email to reset your password 🎉 !!");
    form.reset();
  });

  const handleSubmit = (data: forgotPasswordValidationType) => {
    try {
      handleForgotPassword(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Forgot password?
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Enter your Email to continue
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="relative">
              <ValidationInput<forgotPasswordValidationType>
                fieldTitle="Enter your email"
                nameInSchema="email"
                placeholder="example@example.com"
                type="email"
                className="h-12 w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-lg"
              disabled={!form.formState.isValid || isPending}
            >
              verify
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

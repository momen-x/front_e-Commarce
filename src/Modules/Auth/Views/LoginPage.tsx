import { toast } from "react-toastify";
import { Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { Button } from "@/components/ui/button";
import { useLogin } from "../Hooks/useLogin";
import {
  loginValidation,
  type loginValidationType,
} from "../Validations/Login";
import top from "@/Utils/top";
import useProtectedAuthPages from "@/Utils/useProtectedAuthPages";
//to do , check if the user last order paid or not 
const LoginPage = () => {
  top();
  useProtectedAuthPages();

  const form = useForm<loginValidationType>({
    resolver: zodResolver(loginValidation),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { mutate: handleLogin } = useLogin(
    () => {
      toast.success("Logged in successfully");
      form.reset();
      navigate({ to: "/" });
 
    },

  );

  const handleSubmit = (data: loginValidationType) => {
    try {
      handleLogin(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Sign in
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
              <ValidationInput<loginValidationType>
                fieldTitle="Enter your email"
                nameInSchema="email"
                placeholder="example@example.com"
                type="email"
                className="h-12 w-full"
              />
            </div>

            <div className="relative">
              <ValidationInput<loginValidationType>
                fieldTitle="Enter your password"
                nameInSchema="password"
                placeholder="enter a strong password"
                type="password"
                className="h-12 w-full"
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-lg"
            >
              Sign in
            </Button>
          </form>
        </Form>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-slate-900 dark:text-slate-100 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

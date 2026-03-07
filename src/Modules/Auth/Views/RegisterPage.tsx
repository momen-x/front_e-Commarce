import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import {
  registerValidation,
  type registerValidationType,
} from "../Validations/Register";
import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/Inputs/ValidationInput";
import { Button } from "@/components/ui/button";
import { useRegister } from "../Hooks/useRegister";
import top from "@/Utils/top";
import useProtectedAuthPages from "@/Utils/useProtectedAuthPages";
const RegisterPage = () => {
  top();
  useProtectedAuthPages();
  const form = useForm<registerValidationType>({
    resolver: zodResolver(registerValidation),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const { mutate: handleRegister } = useRegister(
    () => {
      toast.success("Registered successfully , verify your email");
      navigate({
        to: "/verify-email",
        search: { message: "verify your email to complete your registration" },
      });
      form.reset();
    },
    () => {
      toast.error("Something went wrong");
    }
  );
  const handleSubmit = (data: registerValidationType) => {
    try {
      if (data.password === data.confirmPassword) {
        handleRegister({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        });
      } else {
        toast.error("Passwords do not match");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //to do create cart page !!
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Sign up
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
              <ValidationInput<registerValidationType>
                fieldTitle="Enter your first name"
                nameInSchema="firstName"
                placeholder="first name"
                type="text"
                className="h-12 w-full"
              />
            </div>
            <div className="relative">
              <ValidationInput<registerValidationType>
                fieldTitle="Enter your last name"
                nameInSchema="lastName"
                placeholder="last name"
                type="text"
                className="h-12 w-full"
              />
            </div>
            <div className="relative">
              <ValidationInput<registerValidationType>
                fieldTitle="Enter your email"
                nameInSchema="email"
                placeholder="example@example.com"
                type="email"
                className="h-12 w-full"
              />
            </div>

            <div className="relative">
              <ValidationInput<registerValidationType>
                fieldTitle="Enter your password"
                nameInSchema="password"
                placeholder="enter a strong password"
                type="password"
                className="h-12 w-full"
              />
            </div>
            <div className="relative">
              <ValidationInput<registerValidationType>
                fieldTitle="Enter your password"
                nameInSchema="confirmPassword"
                placeholder="confirm password"
                type="password"
                className="h-12 w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-lg"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
          You have an account?{" "}
          <Link
            to="/login"
            className="text-slate-900 dark:text-slate-100 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

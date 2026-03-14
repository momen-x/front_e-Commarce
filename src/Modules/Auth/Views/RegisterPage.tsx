import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
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
import { Check } from "lucide-react";
import useProtectedTheAuthPages from "../Utils/useProtectedTheAuthPages";

const RegisterPage = () => {
  top();
useProtectedTheAuthPages();
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

  const { mutate: handleRegister, isPending } = useRegister(() => {
    toast.success("Registered successfully, verify your email to continue!");
    form.reset();
  });

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

  const benefits = [
    "Free shipping on orders over $50",
    "Exclusive member-only deals",
    "Early access to new arrivals",
    "Easy returns within 30 days",
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Image & Branding */}
      <div className="hidden lg:block relative bg-stone-100">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1600&fit=crop"
          alt="Fashion store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-stone-900/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Shoply
          </Link>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight text-balance max-w-md">
                Join our community of style enthusiasts
              </h2>
              <p className="text-white/80 text-lg max-w-sm">
                Create an account and unlock exclusive benefits.
              </p>
            </div>

            {/* Benefits list */}
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-white/50">
            Trusted by 10,000+ customers worldwide
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link
            to="/"
            className="lg:hidden text-2xl font-bold text-foreground mb-10 block"
          >
            Shoply
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-foreground font-medium underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ValidationInput<registerValidationType>
                    fieldTitle="enter your first name"
                    nameInSchema="firstName"
                    placeholder="John"
                    type="text"
                    className="h-11 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <ValidationInput<registerValidationType>
                    fieldTitle="enter your last name"
                    nameInSchema="lastName"
                    placeholder="Doe"
                    type="text"
                    className="h-11 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <ValidationInput<registerValidationType>
                  fieldTitle="enter your email"
                  nameInSchema="email"
                  placeholder="john@example.com"
                  type="email"
                  className="h-11 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <ValidationInput<registerValidationType>
                  fieldTitle="enter your password"
                  nameInSchema="password"
                  placeholder="Create a strong password"
                  type="password"
                  className="h-11 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <ValidationInput<registerValidationType>
                  fieldTitle="confirm your password"
                  nameInSchema="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  className="h-11 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-ring"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium mt-2"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending ? "Creating account..." : "Create account"}
              </Button>

              {/* <p className="text-xs text-center text-muted-foreground pt-2">
                By creating an account, you agree to our{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </p> */}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

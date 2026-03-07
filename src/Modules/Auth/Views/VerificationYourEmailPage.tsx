import { Button } from "@/components/ui/button";
import top from "@/Utils/top";
import useProtectedAuthPages from "@/Utils/useProtectedAuthPages";
import { useSearch } from "@tanstack/react-router";

const VerificationYourEmailPage = () => {
  top();
  useProtectedAuthPages();
  const search = useSearch({ from: "/verify-email" }) as { message?: string };
  const message = search?.message ?? "verify your email";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 text-6xl">✉️</div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Check your email
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn't receive an email?{" "}
          <Button className="text-blue-600 dark:text-blue-400 hover:underline">
            Resend
          </Button>
        </p>
      </div>
    </div>
  );
};

export default VerificationYourEmailPage;

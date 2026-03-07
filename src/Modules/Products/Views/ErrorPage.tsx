import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          We couldn't load the products. Please try again later.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;

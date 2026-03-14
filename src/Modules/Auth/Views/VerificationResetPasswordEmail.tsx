import { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import api from "@/Utils/axiosInstance";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import top from "@/Utils/top";
import useProtectedTheAuthPages from "../Utils/useProtectedTheAuthPages";

const VerificationResetPasswordEmailPage = () => {
  top();
  useProtectedTheAuthPages();
  const { token, id } = useParams({
    from: "/password/verify-email/$id/$token",
  });
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

useEffect(() => {

  const verify = async () => {
    try {
      const response = await api.get(`api/users/auth/password/verify/${id}/${token}`);
      // Check if verification was successful
      if (response.data.canProceed || response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  verify();
}, [token, id]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Verifying your email...
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Email Verified! 🎉
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Your email has been verified successfully.
          </p>
          <Button
            onClick={() =>
              navigate({
                to: "/reset-password/$id/$token",
                params: { id, token },
              })
            }
          >
            Go to reset password page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle size={48} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verification Failed
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Link is invalid or expired.
        </p>
        <Button onClick={() => navigate({ to: "/login" })}>try again</Button>
      </div>
    </div>
  );
};

export default VerificationResetPasswordEmailPage;

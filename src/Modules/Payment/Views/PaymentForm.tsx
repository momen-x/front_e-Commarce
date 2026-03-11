// PaymentForm.tsx
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { resPayment } from "../Repo/resPayment";
import { toast } from "react-toastify";
import { useCart } from "@/Modules/Cart/Context/CardContext";
import { CreditCard } from "lucide-react";
import top from "@/Utils/top";

const PaymentForm = ({
  orderId,
  onSuccess,
}: {
  orderId: string;
  onSuccess: () => void;
}) => {
  top();
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    try {
      const { clientSecret } = await resPayment.createPaymentIntent(orderId);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await resPayment.confirmPayment(orderId);
        clearCart();
        toast.success("Payment successful! 🎉");
        onSuccess();
      }
    } catch {
      toast.error("Payment failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <CreditCard size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">
              Complete Payment
            </h2>
            <p className="text-xs text-gray-500">Secured by Stripe 🔒</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* ← This is the fix — give CardElement a visible container */}
          <div
            className="p-4 border-2 border-gray-200 rounded-lg min-h-[50px]"
            style={{ backgroundColor: "#ffffff" }} // ← force white always, even in dark mode
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1a1a1a", // ← dark text always
                    fontFamily: "sans-serif",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>

          {/* Test card hint */}
          <div className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="font-semibold mb-1">🧪 Test card:</p>
            <p>Card: 4242 4242 4242 4242</p>
            <p>Expiry: any future date • CVC: any 3 digits</p>
          </div>

          <Button
            type="submit"
            disabled={!stripe || isLoading}
            className="w-full gap-2"
          >
            {isLoading ? "Processing..." : "Pay Now 💳"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;

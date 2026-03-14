import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./Modules/Theme/index.tsx";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Modules/Cart/Context/CardContext.tsx";

//Stripe payment gateway
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position={"bottom"} />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartProvider>
          <Elements stripe={stripePromise}>
            <ToastContainer position="bottom-right" />
            <App />
          </Elements>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

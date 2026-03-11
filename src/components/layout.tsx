import { Outlet } from "@tanstack/react-router";
import Header from "./Shared/Header";
import Footer from "./Shared/Footer";
import { AuthDialogProvider } from "@/Modules/Auth/Context/AuthDialogContext";
import { CartProvider } from "@/Modules/Cart/Context/CardContext";

export const Layout = () => {
  return (
    <>
      <AuthDialogProvider>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            <Outlet />
          </main>
        </CartProvider>
      </AuthDialogProvider>
      <Footer />
    </>
  );
};

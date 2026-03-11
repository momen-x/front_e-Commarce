import { Outlet } from "@tanstack/react-router";
import Header from "./Shared/Header";
import Footer from "./Shared/Footer";
import { AuthDialogProvider } from "@/Modules/Auth/Context/AuthDialogContext";

export const Layout = () => {
  return (
    <>
      <AuthDialogProvider>
          <Header />
          <main className="min-h-screen">
            <Outlet />
          </main>
      </AuthDialogProvider>
      <Footer />
    </>
  );
};

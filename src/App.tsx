import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routes";
import "./App.css";
import { useRestoreCart } from "./Modules/Cart/Hooks/useRestoreCart";

const router = createRouter({ routeTree, notFoundMode: "root" });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const { isRestored } = useRestoreCart();
  if (!isRestored)
    return (
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

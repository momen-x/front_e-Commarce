import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routes";
import "./App.css";

const router = createRouter({ routeTree, notFoundMode: "root" });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

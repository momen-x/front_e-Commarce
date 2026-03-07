import { Button } from "@/components/ui/button";
import NavButton from "@/components/ui/NavButton";
import top from "@/Utils/top";
import { useGetCurrentUser } from "@/Utils/useGetDataForCurrentUser";

import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  ChevronLeft,
  LayoutDashboardIcon,
  LayoutPanelTop,
  Users,
  Target,
  ScanBarcode,
  ChartBarStacked,
  Table,
} from "lucide-react";
import { useState, useEffect } from "react";
import { DeleteProvider } from "../Context/DeleteBtnContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const pages = [
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Target, label: "Add Product", path: "/admin/products" },
  { icon: ScanBarcode, label: "Products Table", path: "/admin/products-table" },
  { icon: ChartBarStacked, label: "Add Category", path: "/admin/categories" },
  { icon: Table, label: "Categories Table", path: "/admin/categories-table" },
];
const AdminLayout = ({ children }: DashboardLayoutProps) => {
  top();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentUser();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isLoading && (!data || !data.isAdmin)) {
      navigate({ to: "/" });
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data || !data.isAdmin) return null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DeleteProvider>
      <div className="flex h-screen">
        <div
          className={`
          border-r
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
        >
          <div className="p-4 border-b flex items-center justify-between cursor-pointer">
            <Link to={"/"}>
              {isSidebarOpen && (
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                    <LayoutPanelTop className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-2 text-xl font-semibold">e-Com</span>
                </div>
              )}
              {!isSidebarOpen && (
                <div className="flex justify-center w-full">
                  <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                    <LayoutDashboardIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {pages.map((page) => (
              <NavButton
                key={page.path}
                icon={page.icon}
                label={page.label}
                path={page.path}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </nav>

          <div className="p-4 border-t space-y-4">
            <div
              className={`flex ${
                isSidebarOpen ? "justify-between" : "justify-center"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {pathname.substring(1).trim()
                  ? pathname.substring(1)
                  : "Dashboard"}
              </h1>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6"> {children}</main>
        </div>
      </div>
    </DeleteProvider>
  );
};

export default AdminLayout;

import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Layout } from "./src/components/layout";
import Home from "./src/Modules/Home/Views/index";
import UserProfile from "./src/Modules/profile/Views/index";
import EditPersonalInfo from "./src/Modules/profile/Views/EditPersonalInfo";
import ChangePassword from "./src/Modules/profile/Views/ChangePassword";
import Products from "./src/Modules/Products";
import Cart from "./src/Modules/Cart/Views/index";
import SingleProductInfo from "./src/Modules/Products/Views/SingleProductInfo";
import LoginPage from "@/Modules/Auth/Views/LoginPage";
import RegisterPage from "@/Modules/Auth/Views/RegisterPage";
import ForgotPasswordPage from "@/Modules/Auth/Views/ForgotPasswordPage";
import ResetPassword from "@/Modules/Auth/Views/ResetPassword";
import VerificationYourEmailPage from "@/Modules/Auth/Views/VerificationYourEmailPage";
import AdminPage from "@/Modules/Admin/Views/AdminPage";
import UserTable from "@/Modules/Admin/Views/Users/TableOfUsers";
import AdminProduct from "@/Modules/Admin/Views/Products/index";
import TableOfProducts from "@/Modules/Admin/Views/Products/TableOfProducts";
import AddCategoryPage from "@/Modules/Admin/Views/Categories/AddCategoryPage";
import TableOfCategories from "@/Modules/Admin/Views/Categories/TableOfCategories";
import EditProduct from "@/Modules/Admin/Views/Products/EditProduct";
import EditCategoryPage from "@/Modules/Admin/Views/Categories/EditCategoryPage";
import NotFoundPage from "./src/components/Shared/NotFound";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFoundPage,
});

// eslint-disable-next-line react-refresh/only-export-components
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
// eslint-disable-next-line react-refresh/only-export-components
export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
});

// eslint-disable-next-line react-refresh/only-export-components
export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: SingleProductInfo,
});

// eslint-disable-next-line react-refresh/only-export-components
export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: UserProfile,
});
// eslint-disable-next-line react-refresh/only-export-components
export const editProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/edit",
  component: EditPersonalInfo,
});
export const ChangePasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/change-password",
  component: ChangePassword,
});

// eslint-disable-next-line react-refresh/only-export-components
export const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
export const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
export const ForgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});
export const ResetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPassword,
});

// eslint-disable-next-line react-refresh/only-export-components
export const verifyEmailPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-email",
  component: VerificationYourEmailPage,
});

export const AdminPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});
export const AdminGetUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: UserTable,
});
export const AdminAddProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: AdminProduct,
});

export const AdminEditProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/$productId",
  component: EditProduct,
});

export const AdminTableOfProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products-table",
  component: TableOfProducts,
});

export const AdminAddCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories",
  component: AddCategoryPage,
});

export const AdminEditCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories/$categoryId",
  component: EditCategoryPage,
});

export const AdminTableOfCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories-table",
  component: TableOfCategories,
});

export const NotFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

// eslint-disable-next-line react-refresh/only-export-components
export const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productRoute,
  cartRoute,
  profileRoute,
  editProfileRoute,
  ChangePasswordRoute,
  LoginRoute,
  RegisterRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  verifyEmailPage,
  AdminPageRoute,
  AdminGetUsersRoute,
  AdminAddProductsRoute,
  AdminEditProductsRoute,
  AdminTableOfProductsRoute,
  AdminAddCategoryRoute,
  AdminEditCategoryRoute,
  AdminTableOfCategoriesRoute,
  NotFoundRoute,
]);

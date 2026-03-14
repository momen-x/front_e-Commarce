import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { Layout } from "./src/components/layout";
import Home from "./src/Modules/Home/Views/index";
import UserProfile from "./src/Modules/profile/Views/index";
import EditPersonalInfo from "./src/Modules/profile/Views/EditPersonalInfo";
import ChangePassword from "./src/Modules/profile/Views/ChangePassword";
import Products from "./src/Modules/Products";
import Cart from "./src/Modules/Cart/Views/index";
import Orders from "@/Modules/Orders/Views/Index";
import SingleProductInfo from "./src/Modules/Products/Views/SingleProductInfo";
import LoginPage from "@/Modules/Auth/Views/LoginPage";
import RegisterPage from "@/Modules/Auth/Views/RegisterPage";
import ForgotPasswordPage from "@/Modules/Auth/Views/ForgotPasswordPage";
import VerificationResetPasswordEmailPage from "@/Modules/Auth/Views/VerificationResetPasswordEmail";
import ResetPassword from "@/Modules/Auth/Views/ResetPassword";
import VerificationYourEmailPage from "@/Modules/Auth/Views/VerificationYourEmailPage";
import AdminPage from "@/Modules/Admin/Views/AdminPage";
import TableOfOrders from "@/Modules/Admin/Views/Orders/TableOfOrders";
import UserTable from "@/Modules/Admin/Views/Users/TableOfUsers";
import AdminProduct from "@/Modules/Admin/Views/Products/index";
import TableOfProducts from "@/Modules/Admin/Views/Products/TableOfProducts";
import AddCategoryPage from "@/Modules/Admin/Views/Categories/AddCategoryPage";
import TableOfCategories from "@/Modules/Admin/Views/Categories/TableOfCategories";
import EditProduct from "@/Modules/Admin/Views/Products/EditProduct";
import EditCategoryPage from "@/Modules/Admin/Views/Categories/EditCategoryPage";
import NotFoundPage from "./src/components/Shared/NotFound";
import { checkAuthentication } from "./src/Utils/authGuard";

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

export const OrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
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

// eslint-disable-next-line react-refresh/only-export-components
export const verifyResetPasswordEmailPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/password/verify-email/$id/$token",
  component: VerificationResetPasswordEmailPage,
});

export const ResetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password/$id/$token",
  component: ResetPassword,
});

// eslint-disable-next-line react-refresh/only-export-components
export const verifyEmailPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-email/$token",
  component: VerificationYourEmailPage,
});

export const AdminPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});
export const AdminGetUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: UserTable,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});
export const AdminGetOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: TableOfOrders,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});
export const AdminAddProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: AdminProduct,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});

export const AdminEditProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/$productId",
  component: EditProduct,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});

export const AdminTableOfProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products-table",
  component: TableOfProducts,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});

export const AdminAddCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories",
  component: AddCategoryPage,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});

export const AdminEditCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories/$categoryId",
  component: EditCategoryPage,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
});

export const AdminTableOfCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories-table",
  component: TableOfCategories,
  beforeLoad: async () => {
    try {
      await checkAuthentication();
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },
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
  OrdersRoute,
  profileRoute,
  editProfileRoute,
  ChangePasswordRoute,
  LoginRoute,
  RegisterRoute,
  ForgotPasswordRoute,
  verifyResetPasswordEmailPage,
  ResetPasswordRoute,
  verifyEmailPage,
  AdminPageRoute,
  AdminGetOrdersRoute,
  AdminGetUsersRoute,
  AdminAddProductsRoute,
  AdminEditProductsRoute,
  AdminTableOfProductsRoute,
  AdminAddCategoryRoute,
  AdminEditCategoryRoute,
  AdminTableOfCategoriesRoute,
  NotFoundRoute,
]);

import useProtectedLoggedUserPage from "@/Utils/useProtectedLoggedUserPage";
import CartPage from "./cartPage";

const Index = () => {
  useProtectedLoggedUserPage();

  return <div>
    <CartPage/>
  </div>;
};

export default Index;

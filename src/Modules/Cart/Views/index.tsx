import { useProtectedUnLoggedPage } from "@/Modules/Auth/Hooks/useProtectedUnLoggedPage";
import CartPage from "./cartPage";


const Index = () => {
useProtectedUnLoggedPage();

  return (
    <div>
      <CartPage />
    </div>
  );
};

export default Index;

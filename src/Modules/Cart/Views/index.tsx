import useProtectedLoggedUserPage from "@/Utils/useProtectedLoggedUserPage";

const Index = () => {
  useProtectedLoggedUserPage();

  return <div>Index</div>;
};

export default Index;

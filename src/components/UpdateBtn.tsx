import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";

const UpdateBtn = ({
  path,
  params,
  paramsId,
}: {
  path: "/admin/products/$productId" | "/admin/categories/$categoryId";
  params: "productId" | "categoryId";
  paramsId: string;
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        navigate({ to: path, params: { [params]: paramsId } } as any);
      }}
    >
      {" "}
      <Pencil className="text-sky-400 dark:text-sky-700" />
    </Button>
  );
};

export default UpdateBtn;

// src/components/DeleteBtn.tsx
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useDelete } from "@/Modules/Admin/Context/DeleteBtnContext";

const DeleteBtn = ({
  title,
  message,
  handleSubmit,
}: {
  title: string;
  message: string;
  handleSubmit: () => Promise<void> | void;
}) => {
  const { openDelete } = useDelete();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => openDelete(title, message, handleSubmit)}
    >
      <Trash className="text-red-500" />
    </Button>
  );
};

export default DeleteBtn;

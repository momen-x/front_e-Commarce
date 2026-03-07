// src/context/DeleteContext.tsx
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteContextType {
  openDelete: (title: string, message: string, handleSubmit: () => Promise<void> | void) => void;
}

const DeleteContext = createContext<DeleteContextType | null>(null);

export function DeleteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    message: string;
    handleSubmit: () => Promise<void> | void;
  } | null>(null);

  const openDelete = (
    title: string,
    message: string,
    handleSubmit: () => Promise<void> | void
  ) => {
    setConfig({ title, message, handleSubmit });
    setIsOpen(true);
  };

  const onSubmit = async () => {
    if (!config) return;
    try {
      setIsLoading(true);
      const result = config.handleSubmit();
      if (result instanceof Promise) {
        await result;
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DeleteContext.Provider value={{ openDelete }}>
      {children}

      {/* One single Dialog for the whole app */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{config?.title}</DialogTitle>
            <DialogDescription>{config?.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="destructive"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : config?.title}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading} className="dark:text-gray-400">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DeleteContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDelete = () => {
  const context = useContext(DeleteContext);
  if (!context) throw new Error("useDelete must be used inside DeleteProvider");
  return context;
};
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";

interface AuthDialogContextType {
  openAuthDialog: (message: string) => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | null>(null);

export const AuthDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openAuthDialog = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  return (
    <AuthDialogContext.Provider value={{ openAuthDialog }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are not logged in 🔒</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Link to="/login">
              <Button variant="default" onClick={() => setIsOpen(false)}>
                Go to Login
              </Button>
            </Link>
            <Button
              variant="outline"
              className="dark:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthDialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthDialog = () => {
  const context = useContext(AuthDialogContext);
  if (!context)
    throw new Error("useAuthDialog must be used inside AuthDialogProvider");
  return context;
};

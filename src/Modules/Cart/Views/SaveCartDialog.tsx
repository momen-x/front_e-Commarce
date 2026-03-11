import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface SaveCartDialogProps {
  isOpen: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onClose: () => void;
}

const SaveCartDialog = ({
  isOpen,
  isSaving,
  onSave,
  onDiscard,
  onClose,
}: SaveCartDialogProps) => {
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <ShoppingCart
                size={20}
                className="text-amber-600 dark:text-amber-400"
              />
            </div>
            <DialogTitle>You have items in your cart</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Would you like to save your cart for later? We'll keep it linked to
            your account so it's ready when you come back.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
          {/* Save */}
          <Button onClick={onSave} disabled={isSaving} className="flex-1">
            {isSaving ? "Saving..." : "💾 Save my cart"}
          </Button>

          {/* Discard */}
          <Button
            variant="outline"
            onClick={onDiscard}
            disabled={isSaving}
            className="flex-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-950/30"
          >
            🗑️ Discard cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveCartDialog;

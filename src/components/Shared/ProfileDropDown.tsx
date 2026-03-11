import { useLogoutUser } from "@/Modules/Auth/Hooks/useLogOut";
import { useSaveOrder } from "@/Modules/Cart/Hooks/useOrder";
import SaveCartDialog from "@/Modules/Cart/Views/SaveCartDialog";
import { useCart } from "@/Modules/Cart/Context/CardContext";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import defaultImage from "../../../public/defaultUserImage.png";

interface IItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export function ProfileDropDown() {
  const { data, isLoading } = useGetCurrentUser();
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  // ← new state
  const [showSaveCartDialog, setShowSaveCartDialog] = useState(false);

  const { mutate: logout, isPending: isLoggingOut } = useLogoutUser(() => {
    localStorage.removeItem("cartItems");
    navigate({ to: "/login", reloadDocument: true });
    toast.success("Logged out successfully");
  });

  const { mutate: saveOrder, isPending: isSavingOrder } = useSaveOrder({
    onSuccess: () => {
      toast.success("Your cart has been saved! 🛒");
      setShowSaveCartDialog(false);
      logout({});
    },
    onError: (error) => {
      toast.error(error.message || "Could not save cart.");
    },
  });

  // ── Check if cart has items ──────────────────────────────────────────────
  const cartHasItems = (): boolean => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (!saved) return false;
      const items = JSON.parse(saved);
      return Array.isArray(items) && items.length > 0;
    } catch {
      return false;
    }
  };

  // ── Logout button clicked ────────────────────────────────────────────────
  const handleLogOut = () => {
    if (cartHasItems()) {
      setShowSaveCartDialog(true); // ← show dialog instead of direct logout
      return;
    }
    logout({});
  };

  // ── User chose to SAVE cart ──────────────────────────────────────────────
  const handleSaveCart = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const orderProducts = cartItems.map((item: IItem, index: number) => {
        const productId = item.productId;
        if (!productId) {
          throw new Error(
            `Cart item at index ${index} is missing its product identifier.`,
          );
        }

        // Ensure quantity is a valid number.
        const quantity = Number(item.quantity);
        if (isNaN(quantity) || quantity <= 0) {
          throw new Error(
            `Invalid or missing quantity for product with ID ${productId}.`,
          );
        }

        return {
          product: productId,
          quantity: quantity,
          price: Number(item.price) || 0, // Ensure price is a number, default to 0 if invalid
        };
      });
      saveOrder({
        orderItemsId: orderProducts,
        user: data!._id,
        totalPrice: totalPrice,
        phone: "0000000000",
        address: "Saved Cart",
        customerEmail: data!.email,
        status: "pending",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        (error as Error).message || "Something went wrong preparing the cart.",
      );
    }
  };

  // ── User chose to DISCARD cart ───────────────────────────────────────────
  const handleDiscardCart = () => {
    localStorage.removeItem("cartItems");
    setShowSaveCartDialog(false);
    logout({});
  };

  const isProcessingLogout = isSavingOrder || isLoggingOut;

  return (
    <>
      {/* Save Cart Dialog */}
      <SaveCartDialog
        isOpen={showSaveCartDialog}
        isSaving={isSavingOrder}
        onSave={handleSaveCart}
        onDiscard={handleDiscardCart}
        onClose={() => setShowSaveCartDialog(false)}
      />

      {/* Dropdown — unchanged */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-0 hover:opacity-80"
          >
            <img
              src={
                data?.userImage && !isLoading
                  ? data.userImage.url
                  : defaultImage
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-lg"
        >
          <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
            Signed in as{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {data?.firstName && !isLoading
                ? (data.firstName + " " + data.lastName).length > 7
                  ? (data.firstName + " " + data.lastName).substring(0, 7) +
                    "..."
                  : data.firstName + " " + data.lastName
                : "Guest"}
            </span>
          </div>

          <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

          <DropdownMenuItem
            onClick={() => navigate({ to: "/profile" })}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User className="w-4 h-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

          <DropdownMenuItem
            onClick={handleLogOut}
            disabled={isProcessingLogout}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isProcessingLogout ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

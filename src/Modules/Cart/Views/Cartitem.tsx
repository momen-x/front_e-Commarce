import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../Context/CardContext";

const CartItem = ({
  item,
}: {
  item: {
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
}) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">
          {item.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ${item.price.toFixed(2)} each
        </p>

        {/* Qty Controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            >
              <Minus size={13} />
            </Button>
            <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            >
              <Plus size={13} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => removeFromCart(item.productId)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>

      {/* Subtotal */}
      <p className="font-bold text-gray-900 dark:text-white flex-shrink-0">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartItem;

import { useEffect, useState } from "react";
import { useCart } from "../Context/CardContext";
import { useResCart } from "../Repo/resCart";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";

export const useRestoreCart = () => {
  const { data: user } = useGetCurrentUser();
  const { addToCart, cartItems } = useCart();
  const { getTheLastOrder, deleteOrder } = useResCart();
  const [isRestored, setIsRestored] = useState(false); // ← new

  useEffect(() => {
    if (!user) {
      setIsRestored(true); // not logged in, no restore needed
      return;
    }

    const restore = async () => {
      try {
        const lastOrder = await getTheLastOrder();

        if (lastOrder && !lastOrder.isPaid) {
          if (cartItems.length === 0) {
            lastOrder.orderItemsId.forEach((item: any) => {
              addToCart({
                productId: item.product._id,
                title: item.product.title,
                price: item.product.price,
                image: item.product.image?.url ?? "",
                quantity: item.quantity,
              });
            });
          }
          await deleteOrder((lastOrder as any)._id);
        }
      } catch {
        // no last order — do nothing
      } finally {
        setIsRestored(true); // ← always mark as done
      }
    };

    restore();
  }, [user?._id]);

  return { isRestored }; // ← return this
};

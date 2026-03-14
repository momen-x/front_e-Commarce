import { useEffect, useState } from "react";
import { useCart } from "../Context/CardContext";
import { useResCart } from "../Repo/resCart";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";

interface IItem {
  quantity: number;
  product: {
    _id: string;
    title: string;
    price: number;
    image: { url: string };
  };
}

export const useRestoreCart = () => {
  const { data: user, isLoading } = useGetCurrentUser();
  const { addToCart, cartItems } = useCart();
  const { getTheLastOrder, deleteOrder } = useResCart();
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    // If still loading user data, don't do anything yet
    if (isLoading) {
      return;
    }

    if (!user) {
      setIsRestored(true); // not logged in, no restore needed
      return;
    }

    const restore = async () => {
      try {
        const lastOrder = await getTheLastOrder();

        if (lastOrder && !lastOrder.isPaid) {
          if (cartItems.length === 0) {
            (lastOrder.orderItemsId as unknown as IItem[]).forEach(
              (item: IItem) => {
                addToCart({
                  productId: item.product._id,
                  title: item.product.title,
                  price: item.product.price,
                  image: item.product.image?.url ?? "",
                  quantity: item.quantity,
                });
              },
            );
          }
          await deleteOrder((lastOrder as { _id: string })._id);
        }
      } catch {
        // no last order — do nothing
      } finally {
        setIsRestored(true);
      }
    };

    restore();
  }, [
    user?._id,
    isLoading,
    addToCart,
    cartItems.length,
    deleteOrder,
    getTheLastOrder,
  ]);

  return { isRestored };
};

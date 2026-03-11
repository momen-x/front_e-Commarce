import api from "@/Utils/axiosInstance";
import { useCart } from "../Context/CardContext";
import type { CartAPI, Order } from "./Cart";

const ORDERERS_ITEM_URL = "/api/order-items";
const ORDERERS_URL = "/api/orders";

export const useResCart = (): CartAPI => {
  const { cartItems, totalPrice, clearCart } = useCart();

  return {
    addOrderItems: async () => {
      const ids = await Promise.all(
        cartItems.map(async (item) => {
          const res = await api.post(ORDERERS_ITEM_URL, {
            product: item.productId, // ✅ correct field name
            quantity: item.quantity,
          });
          return res.data._id;
        }),
      );
      return { ids };
    },

    addOrder: async (order: Order) => {
      const { address, phone, customerEmail, orderItemsId } = order;
      const res = await api.post(ORDERERS_URL, {
        address,
        phone,
        customerEmail,
        orderItemsId,
        totalPrice,
        status: "pending",
      });
      clearCart();
      return res.data;
    },

    saveCartOnLogout: async (data: Order) => {
      const orderItemIds = await Promise.all(
        data.orderItemsId.map(async (item) => {
          const res = await api.post(ORDERERS_ITEM_URL, {
            product: item.product,
            quantity: item.quantity,
            price: item.price,
          });
          return res.data._id;
        }),
      );

      const orderRes = await api.post(ORDERERS_URL, {
        orderItemsId: orderItemIds,
        user: data.user,
        totalPrice: totalPrice,
        phone: data.phone,
        address: data.address,
        customerEmail: data.customerEmail,
        status: data.status || "pending",
      });

      return orderRes.data;
    },
    getTheLastOrder: async () => {
      const res=await api.get(`/api/orders/last-order`);
      return res.data;
    }
  };
};

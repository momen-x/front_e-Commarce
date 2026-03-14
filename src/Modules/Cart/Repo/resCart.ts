import api from "@/Utils/axiosInstance";
import { useCart } from "../Context/CardContext";
import type { CartAPI, IOrderToAdd } from "./Cart";

const ORDERERS_ITEM_URL = "/api/order-items";
const ORDERERS_URL = "/api/orders";

export const useResCart = (): CartAPI => {
  const { cartItems, totalPrice, } = useCart();

  return {
    addOrderItems: async () => {
      const ids = await Promise.all(
        cartItems.map(async (item) => {
          const res = await api.post(ORDERERS_ITEM_URL, {
            product: item.productId, // ✅ correct field name
            quantity: item.quantity,
            price: item.price,
          });
          return res.data._id;
        }),
      );
      return { ids };
    },

    addOrder: async (order: IOrderToAdd) => {
      const { user, address, phone, customerEmail } = order;
      const orderItemIds = await Promise.all(
        order.orderItemsId.map(async (item) => {
          const res = await api.post(ORDERERS_ITEM_URL, {
            product: item.product,
            quantity: item.quantity,
            price: item.price,
          });
          return res.data._id;
        }),
      );
      const res = await api.post(ORDERERS_URL, {
        orderItemsId: orderItemIds,
        user,
        totalPrice: order.totalPrice, // ← use order.totalPrice not totalPrice from context
        phone,
        address,
        customerEmail,
        status: "pending",
      });
      return res.data;
    },

    saveCartOnLogout: async (data: IOrderToAdd) => {
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
      const res = await api.get(`/api/orders/last-order`);
      return res.data;
    },
    deleteOrder: async (orderId: string) => {
      const res = await api.delete(`/api/orders/${orderId}`);
      return res.data;
    },
  };
};

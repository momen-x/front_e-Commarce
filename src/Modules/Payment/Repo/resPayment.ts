import api from "@/Utils/axiosInstance";

const BASE_URL = "/api/payment";

export const resPayment = {
  createPaymentIntent: async (orderId: string) => {
    const res = await api.post(`${BASE_URL}/create-payment-intent`, { orderId });
    return res.data; // { clientSecret }
  },

  confirmPayment: async (orderId: string) => {
    const res = await api.post(`${BASE_URL}/confirm`, { orderId });
    return res.data;
  },
};
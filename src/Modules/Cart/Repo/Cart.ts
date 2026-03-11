export interface Order {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    userImage: {
      public_id: string;
      url: string;
    };
    email: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  orderItemsId: {
    product: string;
    quantity: number;
    price: number;
  }[];
  phone: string;
  address: string;
  customerEmail: string;
  totalPrice: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export interface SaveOrderResponse {
  message: string;
  orderId: string;
}

export interface CartAPI {
  addOrderItems: () => Promise<{ ids: string[] }>;
  addOrder: (order: Order) => Promise<void>;
  saveCartOnLogout: (payload: Order) => Promise<void>;
  getTheLastOrder: () => Promise<Order>;
}

export interface Order {
  _id:string;
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
  isPaid: boolean;
  paidAt: Date | null;
  phone: string;
  address: string;
  customerEmail: string;
  totalPrice: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
export interface IOrderToAdd {
  user: string;
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
  addOrderItems: () => Promise<{ ids: string[]}>;
  addOrder: (order: IOrderToAdd) => Promise<Order>;
  saveCartOnLogout: (payload: IOrderToAdd) => Promise<void>;
  getTheLastOrder: () => Promise<Order>;
  deleteOrder: (orderId: string) => Promise<void>;
}

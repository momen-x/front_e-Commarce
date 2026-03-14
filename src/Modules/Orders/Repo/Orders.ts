export interface IOrder {
  _id: string;
  user: string;
  orderItemsId: {
    _id: string;
    product: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
  isPaid: boolean;
  phone: string;
  address: string;
  customerEmail: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAllOrder {
  createdAt: Date;
  updatedAt: Date;
  isPaid: boolean;
  phone: string;
  totalPrice: number;
  address: string;
  status: string;
  customerEmail: string;
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    userImage: {
      public_id: string;
      url: string;
    };
  };
  orderItemsId: {
    _id: string;
    product: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
}

export interface IGetOrder {
  getOrders: () => Promise<IOrder[]>;
  getAllOrdersByAdmin: () => Promise<IAllOrder[]>;
}

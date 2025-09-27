export type OrderDto = {
    orderId: number;
    email: string;
    status: "DELIVERED" | "ORDERED" | "CANCELLED";
    address: string;
    orderDate: string;
    deliveryDate?: string;
    orderItems: { id:number, name: string, quantity: number, price: number, itemTotalPrice: number }[];
    orderTotalPrice: number;
  };
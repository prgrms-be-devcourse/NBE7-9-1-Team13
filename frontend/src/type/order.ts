//추후 백엔드와 연동 시 Dto로 변경해주면 된다. ex)OrderDto
//지금은 임시 데이터

export type Order = {
    orderId: number;
    email: string;
    status: "DELIVERED" | "ORDERED" | "CANCELLED";
    address: string;
    orderDate: string;
    deliveryDate?: string;
    orderItems: { name: string; quantity: number; price: number }[];
    total: number;
  };
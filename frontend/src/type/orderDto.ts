//추후 백엔드와 연동 시 Dto로 변경해주면 된다. ex)OrderDto
//지금은 임시 데이터

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
"use client";

import { useEffect, useState } from "react";
import { OrderDto } from "@/type/orderDto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/client";

//관리자 주문 관리 페이지
export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchApi("/api/v1/admin/orders");
        setOrders(res.data ?? []);
      } catch (err) {
        console.error("주문 조회 에러:", err);
      }
    };
    fetchOrders();
  }, []);


  return (
    <>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-10 text-center">관리자 주문 내역 관리</h1>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">주문번호</th>
                <th className="px-4 py-2 border">이메일</th>
                <th className="px-4 py-2 border">상태</th>
                <th className="px-4 py-2 border">주소</th>
                <th className="px-4 py-2 border">주문일자</th>
                <th className="px-4 py-2 border">배송일자</th>
                <th className="px-4 py-2 border">상품 내역</th>
                <th className="px-4 py-2 border">총 금액</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  onClick={() => router.push(`/admin/orders/${order.orderId}`)}
                  className="text-center hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-4 py-2 border">{order.orderId}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td
                    className={`px-4 py-2 border font-semibold ${order.status === "DELIVERED"
                      ? "text-green-600"
                      : order.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-yellow-600"
                      }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border">{order.address}</td>
                  <td className="px-4 py-2 border">{new Date(order.orderDate).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  })}</td>
                  <td className="px-4 py-2 border">{new Date(order.deliveryDate).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  })}</td>
                  <td className="px-4 py-2 border text-left">
                    <ul className="list-disc list-inside text-sm">
                      {order.orderItems.map((item, idx) => (
                        <li key={`${order.orderId}-${item.id ?? idx}`}>
                          {item.name} ({item.quantity}개)
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border font-bold">
                    {order.orderTotalPrice.toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
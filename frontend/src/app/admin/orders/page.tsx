"use client";

import { useState } from "react";
import { Order } from "@/type/orderDto"; 
import Link from "next/link";
import { useRouter } from "next/navigation";

//관리자 주문 내역 관리 페이지
//모든 주문이 다 보이도록 함

export default function AdminOrdersPage() {
    // 임시 주문 데이터 (추후 서버 연동 예정)
    const router = useRouter();
    const [orders] = useState<Order[]>([
        {
          id: 1,
          email: "test@example.com",
          status: "ORDERED",
          address: "서울시 강남구 테헤란로 123",
          order_date: "2025-09-24",
          delivery_date: "2025-09-26",
          items: [
            { name: "케냐 AA Plus 오타야", quantity: 2, price: 21000 },
            { name: "고도의 시간", quantity: 1, price: 11000 },
          ],
          total: 53000,
        },
        {
          id: 2,
          email: "hello@cafe.com",
          status: "DELIVERED",
          address: "서울시 서초구 반포대로 45",
          order_date: "2025-09-23",
          delivery_date: "2025-09-25",
          items: [
            { name: "에티오피아 예가체프", quantity: 1, price: 21000 },
            { name: "고도의 시간", quantity: 3, price: 11000 },
          ],
          total: 54000,
        },
        {
          id: 3,
          email: "hello@cafe.com",
          status: "ORDERED",
          address: "서울시 서초구 반포대로 45",
          order_date: "2025-09-23",
          delivery_date: "2025-09-25",
          items: [
            { name: "에티오피아 예가체프", quantity: 1, price: 21000 },
            { name: "고도의 시간", quantity: 3, price: 11000 },
          ],
          total: 54000,
        },
        {
          id: 4,
          email: "hello@cafe.com",
          status: "ORDERED",
          address: "서울시 서초구 반포대로 45",
          order_date: "2025-09-23",
          delivery_date: "2025-09-25",
          items: [
            { name: "에티오피아 예가체프", quantity: 1, price: 21000 },
            { name: "고도의 시간", quantity: 3, price: 11000 },
          ],
          total: 54000,
        },
      ]);
  
    return (
      <>
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-10 text-center">
            관리자 주문 내역 관리
          </h1>
  
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
                  key={order.id}
                  onClick={() => router.replace(`/admin/orders/${order.id}`)}
                  className="text-center hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.email}</td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      order.status === "DELIVERED"
                        ? "text-green-600"
                        : order.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border">{order.address}</td>
                  <td className="px-4 py-2 border">{order.order_date}</td>
                  <td className="px-4 py-2 border">
                    {order.delivery_date || "미정"}
                  </td>
                  <td className="px-4 py-2 border text-left">
                    <ul className="list-disc list-inside text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} ({item.quantity}개)
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border font-bold">
                    {order.total.toLocaleString()}원
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
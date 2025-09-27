"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Order } from "@/type/orderDto";
import Link from "next/link";

//주문 단건 조회 페이지
export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  // 임시 데이터 (추후 서버 연동 예정)
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
  ]);

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <p className="text-center text-xl mt-20 text-gray-500">
        주문을 찾을 수 없습니다.
      </p>
    );
  }

  return (
    <>
      <div className="flex justify-center min-h-screen">
        <div className="max-w-xl w-full bg-white p-6 rounded shadow">
          <h1 className="text-xl text-center font-bold mb-10">
            관리자 주문 상세
          </h1>

          <p className="text-lg text-gray-600 mb-2">주문번호: {order.id}</p>
          <p className="text-lg text-gray-600 mb-2">이메일: {order.email}</p>
          <p className="text-lg text-gray-600 mb-2">주소: {order.address}</p>
          <p className="text-lg text-gray-600 mb-2">
            주문일자: {order.order_date}
          </p>
          <p className="text-lg text-gray-600 mb-3">
            배송일자: {order.delivery_date || "미정"}
          </p>

          <p
            className={`mt-2 font-semibold ${
              order.status === "DELIVERED"
                ? "text-green-600"
                : order.status === "CANCELLED"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            상태: {order.status}
          </p>

          <h2 className="font-bold text-lg mt-4 mb-2">주문 상품</h2>
          <ul className="space-y-2">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>
                  {item.name} ({item.quantity}개)
                </span>
                <span>{(item.price * item.quantity).toLocaleString()}원</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-bold text-right">
            총 금액: {order.total.toLocaleString()}원
          </p>

          <div className="mt-6 flex justify-end">
            <Link
              href="/admin/orders"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              목록으로
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
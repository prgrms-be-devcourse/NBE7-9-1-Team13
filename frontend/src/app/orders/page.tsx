"use client"

import Link from "next/link";
import { useState } from "react";
import { Order } from "@/type/order";
import { useSearchParams } from "next/navigation";

//주문 내역 페이지(다건 조회)
//이메일을 입력하고 들어갈 수 있다.
//지금은 임시 데이터로 작업한 것!

export default function OrdersPage() {
  // 주문내역 데이터 임시 (추후 서버 연동)
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

  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [submitted, setSubmitted] = useState(!!initialEmail);

  // 해당 이메일 주문 필터링
  const userOrders = orders.filter((order) => order.email === email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // 이메일 입력 후 주문 페이지 리로드 시 쿼리스트링에 email 포함
      window.location.href = `/orders?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold p-10 text-center">주문 내역 확인</h1>

      {!submitted ? (
        // 이메일 입력창
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded shadow flex flex-col gap-8"
        >
          <p className="text-lg text-gray-600 text-center">
            주문 내역 확인을 위해 이메일을 입력해주세요.
          </p>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-4 rounded hover:bg-gray-900"
          >
            주문 내역 확인
          </button>
        </form>
      ) : (
        // 주문 내역 표시
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg mb-4 text-center">내 주문 내역</h2>

          {userOrders.length === 0 ? (
            <p className="text-gray-500 text-center">
              해당 이메일은 주문 내역이 없습니다.
            </p>
          ) : (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="border-b border-gray-200 pb-4 mb-4 last:mb-0 last:pb-0 last:border-0"
              >
                {/* 주문 클릭 → 상세 페이지 이동 */}
                <Link
                  href={`/orders/${order.id}`}
                  className="block cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    주문일자: {order.order_date}
                  </p>
                  <p
                    className={`text-sm font-semibold mb-2 ${
                      order.status === "DELIVERED"
                        ? "text-green-600"
                        : order.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    상태: {order.status}
                  </p>
                  <p className="font-bold">
                    총 금액: {order.total.toLocaleString()}원
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
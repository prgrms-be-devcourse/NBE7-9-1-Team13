"use client"

import { useState } from "react";

//주문 내역 페이지

type Order = {
    id: number;
    email: string;
    status: "DELIVERY" | "ORDERED" | "CANCELLED";
    address: string;
    order_date: string;
    delivery_date?: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
  };
export default function OrdersPage() {
      // 주문내역 데이터 임시 (추후 서버 연동)
      const [orders, setOrders] = useState<Order[]>([
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
          status: "DELIVERY",
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
            id: 2,
            email: "hello@cafe.com",
            status: "DELIVERY",
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

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); //로그인 상태 확인 용용

  // 해당 이메일 주문 필터링
  const userOrders = orders.filter((order) => order.email === email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <p className="text-gray-500 text-center">해당 이메일은 주문 내역이 없습니다.</p>
            ) : (
              userOrders.map((order) => (
                <div
                  key={order.id}
                  className="border-b border-gray-200 pb-4 mb-4 last:mb-0 last:pb-0 last:border-0"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    주문일자: {order.date}
                  </p>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>
                          {item.name} ({item.quantity}개)
                        </span>
                        <span>
                          {(item.price * item.quantity).toLocaleString()}원
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-right">
                    총 금액: {order.total.toLocaleString()}원
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        </>
    );
  }
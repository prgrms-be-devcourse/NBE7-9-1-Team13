"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Order } from "@/type/order";
import { useSearchParams } from "next/navigation";

//주문 내역 페이지(다건 조회)
//이메일을 입력하고 들어갈 수 있다.
//지금은 임시 데이터로 작업한 것!

export default function OrdersPage() {
  // 변수 정의
  const [orders, setOrders] = useState<Order[]>([]);
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [submitted, setSubmitted] = useState(!!initialEmail);

  const [loading, setLoading] = useState(false);
  // 이메일 제출 시 fetch 호출
  useEffect(() => {
    if (submitted && email) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data.data ?? []); // RsData 안의 data 배열 사용
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [submitted, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // 이메일 입력 후 주문 페이지 리로드 시 쿼리스트링에 email 포함
      window.location.href = `/orders?email=${encodeURIComponent(email)}`;
    }
  };

  const userOrders = [...orders].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

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
                key={order.orderId}
                className="border-b border-gray-200 pb-4 mb-4 last:mb-0 last:pb-0 last:border-0"
              >
                {/* 주문 클릭 → 상세 페이지 이동 */}
                <Link
                  href={`/orders/${order.orderId}`}
                  className="block cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    주문일자: {new Date(order.orderDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    })}
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
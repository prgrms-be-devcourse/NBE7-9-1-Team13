"use client";
import { OrderDto } from "@/type/orderDto";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/client";

// 주문 상세보기 페이지 (단건 조회)
export default function OrderDetailPage() {
  const [order, setOrder] = useState<OrderDto | null>(null);
  const { id: orderId } = useParams();
  const router = useRouter();

  // 주문 단건 조회
  useEffect(() => {
    fetchApi(`/api/v1/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch((err) => {
        console.error(err);
        alert("주문 불러오기 실패");
      });
  }, [orderId]);

  const handleCancel = () => {
    if (confirm("정말 주문을 취소하시겠습니까?")) {
      fetchApi(`/api/v1/orders/${orderId}`, {
        method: "PATCH",
      }).then((data) => {
        alert(data.msg);
        router.replace(`/orders?email=${encodeURIComponent(order!.email)}`);
      });
    }
  };

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
          <h1 className="text-xl text-center font-bold mb-10">주문 상세</h1>
          <p className="text-lg text-gray-600 mb-2">주문번호: {order.orderId}</p>
          <p className="text-lg text-gray-600 mb-2">이메일: {order.email}</p>
          <p className="text-lg text-gray-600 mb-2">주소: {order.address}</p>
          <p className="text-lg text-gray-600 mb-2">주문일자: {new Date(order.orderDate).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}</p>
          <p className="text-lg text-gray-600 mb-3">
            배송일자: {order.status === "DELIVERED" || order.status === "CANCELLED"
              ? ""
              : new Date(order.deliveryDate).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // 오전/오후 표시
              })}
          </p>
          <p
            className={`mt-2 font-semibold ${order.status === "DELIVERED"
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
            {order.orderItems.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>
                  {item.name} ({item.quantity}개)
                </span>
                <span>{item.itemTotalPrice.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-right">
            총 금액: {order.orderTotalPrice.toLocaleString()}원
          </p>
          {/* 버튼 */}
          <div className="mt-6 flex justify-between">
            <a
              href={`/orders?email=${order.email}`}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              뒤로가기
            </a>
            {order.status === "ORDERED" && (
              <div className="flex gap-2">
                <Link
                  href={`/orders/${order.orderId}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  주문 수정
                </Link>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  주문 취소
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
"use client"

import { Order } from "@/type/order";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { fetchApi } from "@/lib/client";


//주문 상세보기 페이지(단건 조회)
//수정 -> 백엔드와 연동해서 잘 수정되는지 확인 필요. 아직 정상 작동x
//삭제 -> 상세 보기 페이지에서는 cancelled로 잘 바뀌지만 다건 조회로 다시 돌아가면 아직 상태 변경x
//-> 페이지마다 데이터 임시로 지정해두고 작업해서 생기는 현상. 백엔드 연동 후 잘 작동하는지 확인 필수
export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();

    const id = Number(params.id);
  
    // 임시 데이터 (추후 서버 연동 예정)
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
  
    const order = orders.find((o) => o.id === id);
  
    // 주문 취소 핸들러
    const handleCancel = (id: number) => {
      if (confirm("정말 주문을 취소하시겠습니까?")) {
        fetchApi(`/api/orders/${id}`, {
          method: "PATCH",
        }).then((data) => {
          alert(data.msg);
          router.replace(`/orders`);
      });
    }
    };
  
    return (
      <>
        {!order ? (
          <p className="text-center text-xl mt-20 text-gray-500">주문을 찾을 수 없습니다.</p>
        ) : (
          <div className="flex justify-center min-h-screen">
            <div className="max-w-xl w-full bg-white p-6 rounded shadow">
              <h1 className="text-xl text-center font-bold mb-10">주문 상세</h1>
  
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
                    <span>
                      {(item.price * item.quantity).toLocaleString()}원
                    </span>
                  </li>
                ))}
              </ul>
  
              <p className="mt-4 font-bold text-right">
                총 금액: {order.total.toLocaleString()}원
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
                      href={`/orders/${order.id}/edit`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      주문 수정
                    </Link>
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      주문 취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
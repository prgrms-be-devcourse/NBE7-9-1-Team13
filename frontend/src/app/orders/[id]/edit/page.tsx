"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Order } from "@/type/order";
import Link from "next/link";
import { fetchApi } from "@/lib/client";


//주문 수정 페이지
//주소만 수정할 수 있도록 함

export default function OrderEditPage() {
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

    // 주소만 수정
    const [address, setAddress] = useState(order?.address || "");
  
    if (!order) {
      return (
        <p className="text-center text-gray-500 mt-20">주문을 찾을 수 없습니다.</p>
      );
    }
  
    const handleSave = (e: any) => {
      e.preventDefault();

      const form = e.target;
      const addressInput = form.address;
    
      fetchApi(`/api/v1/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          address: addressInput.value
        }),
      }).then((data) => {
        alert(data.msg);
        router.replace(`/orders/${id}`);
      });
    };
  
    return (
        <>
        <div className="flex justify-center min-h-screen">
          <form
            onSubmit={handleSave}
            className="max-w-xl w-full bg-white p-6 rounded shadow"
          >
            <h1 className="text-xl text-center font-bold mb-10">주문 수정</h1>
  
            <p className="mb-4 text-lg font-semibold">
              <span>이메일:</span> {order.email}
            </p>
  
            <h2 className="font-bold text-lg mt-4 mb-4">주문 상품</h2>
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
  
            <p className="mt-4 font-bold text-lg text-right">
              총 금액: {order.total.toLocaleString()}원
            </p>
  
            {/* 주소 수정 */}
            <label className="block mt-6 mb-2 text-lg font-bold">주소</label>
            <textarea
              name="address"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              defaultValue={order.address}
              required
            />
  
            {/* 버튼 */}
            <div className="mt-6 flex justify-between">
              <Link
                href={`/orders?email=${encodeURIComponent(order.email)}`}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                취소
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      </>

    );
  }
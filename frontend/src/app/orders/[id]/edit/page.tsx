"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderDto } from "@/type/orderDto";
import Link from "next/link";
import { fetchApi } from "@/lib/client";

//주문 수정 페이지
export default function OrderEditPage() {

  const [order, setOrder] = useState<OrderDto | null>(null);
  const { id: orderId } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchApi(`/api/v1/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err));
  }, [orderId]);

  if (!order) {
    return (
      <p className="text-center text-gray-500 mt-20">주문을 찾을 수 없습니다.</p>
    );
  }

  const handleSave = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const addressInput = form.address;

    fetchApi(`/api/v1/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        address: addressInput.value
      }),
    }).then((data) => {
      alert(data.msg);
      router.replace(`/orders?email=${encodeURIComponent(order!.email)}`);
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
            {order.orderItems.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>
                  {item.name} ({item.quantity}개)
                </span>
                <span>{item.itemTotalPrice.toLocaleString()}원</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-bold text-lg text-right">
            총 금액: {order.orderTotalPrice.toLocaleString()}원
          </p>

          <label className="block mt-6 mb-2 text-lg font-bold">주소</label>
          <textarea
            name="address"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            defaultValue={order.address}
            required
          />

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
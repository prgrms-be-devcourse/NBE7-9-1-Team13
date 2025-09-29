"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Item } from "@/type/item";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/client";

// 메인 주문 페이지
export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchApi("/api/v1/items", {
          cache: "no-store",
        });
        setItems(data);
      } catch (err: any) {
        console.error(err);
        alert(err.message || "상품을 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchItems();
  }, []);


  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      }
      else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const totalPrice = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const item = items.find((i) => i.id === Number(id));
    return sum + (item ? item.price * quantity : 0);
  }, 0);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(cart).length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }
    if (email.trim().length === 0) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (address.trim().length === 0) {
      alert("주소를 입력해주세요.");
      return;
    }

    fetchApi(`/api/v1/orders`, {
      method: "POST",
      body: JSON.stringify({
        email,
        address,
        orderItems: Object.entries(cart).map(([id, quantity]) => ({
          productId: Number(id),
          quantity
        }))
      })
    })
      .then(() => {
        alert("결제가 완료되었습니다!");
        router.replace(`/orders?email=${encodeURIComponent(email)}`);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || "주문 처리 실패");
      });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item.id)}
                className="flex flex-col bg-gray-50 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={250}
                  height={250}
                  className="object-contain mx-auto"
                />
                <h3 className="mt-4 font-bold">{item.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {item.content}
                </p>
                <div className="mt-4 text-right font-semibold">
                  {item.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-inner gap-10">
            <h2 className="font-bold text-lg text-center">장바구니</h2>

            {Object.keys(cart).length === 0 ? (
              <p className="text-sm text-center text-gray-500">
                장바구니가 비어있습니다.
              </p>
            ) : (
              <ul className="mb-4 space-y-3 text-sm">
                {Object.entries(cart).map(([id, quantity]) => {
                  const item = items.find((i) => i.id === Number(id));
                  if (!item) return null;
                  const itemTotal = item.price * quantity;
                  return (
                    <li
                      key={id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div className="w-1/2">
                        <span className="block font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">
                          {quantity}개 × {item.price.toLocaleString()}원 ={" "}
                          <strong>{itemTotal.toLocaleString()}원</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <form onSubmit={handlePay} className="flex flex-col gap-6 p-2">
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="주소"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border-2 rounded"
                required
              />

              <p className="text-sm text-gray-500">
                당일 오후 2시 이후 주문은 다음날 배송을 시작합니다.
              </p>

              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>총 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-4 rounded hover:bg-gray-900"
              >
                결제하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
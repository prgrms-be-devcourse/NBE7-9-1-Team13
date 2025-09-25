"use client";

import { useState } from "react";
import Image from "next/image";

//이후 백엔드와 연동하며 데이터 가져오는 과정 테스트 예정. 
//임시로 데이터를 넣어두고 진행한다
//결제하기 처리는 아직 안했음
type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};


export default function Home() {
  const items: Item[] = [
    {
      id: 1,
      name: "케냐 AA Plus 오타야 (500g)",
      description:
        "과일향과 꽃향기 그리고 세련된 후미와 간결한 바디가 특징이며, 전체적인 밸런스가 좋은 커피",
      price: 21000,
      image: "/kenya.png", // public 폴더에 kenya.png 넣으세요
    },
    {
      id: 2,
      name: "에티오피아 예가체프 G1 코케 허니 내추럴",
      description:
        "well balanced cup, smooth, sweet nectar, wild floral notes와 berry fruit 향이 특징",
      price: 21000,
      image: "/eth.png",
    },
    {
      id: 3,
      name: "고도의 시간 (500g)",
      description: "견과류의 풍부한 고소함이 특징이며, 가볍게 즐기기 좋은 원두",
      price: 11000,
      image: "/good.png",
    },
    {
      id: 4,
      name: "에티오피아 예가체프 G1 코케 허니 내추럴",
      description:
        "well balanced cup, smooth, sweet nectar, wild floral notes와 berry fruit 향이 특징",
      price: 21000,
      image: "/eth.png",
    },
    {
      id: 5,
      name: "에티오피아 예가체프 G1 코케 허니 내추럴",
      description:
        "well balanced cup, smooth, sweet nectar, wild floral notes와 berry fruit 향이 특징",
      price: 21000,
      image: "/eth.png",
    },
  ];

  // 🛒 장바구니 상태
  const [cart, setCart] = useState<{ [id: number]: number }>({});

  // 아이템 추가
  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // 아이템 제거
  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  // 총 금액 계산
  const totalPrice = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const item = items.find((i) => i.id === Number(id));
    return sum + (item ? item.price * quantity : 0);
  }, 0);
  return (
    <>
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 아이템 목록 */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item.id)} // 아이템 클릭 시 장바구니 추가
                className="flex flex-col bg-gray-50 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={250}
                  height={250}
                  className="object-contain mx-auto"
                />
                <h3 className="mt-4 font-bold">{item.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-4 text-right font-semibold">
                  {item.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>

          {/* 장바구니 */}
          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-inner  gap-10">
            <h2 className="font-bold text-lg text-center">장바구니</h2>

            {Object.keys(cart).length === 0 ? (
              <p className="text-sm text-center text-gray-500">장바구니가 비어있습니다.</p>
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
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button
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

            {/* 주문자 정보 입력 폼폼 */}
            <form className="flex flex-col gap-10 p-2">
              <input
                type="email"
                placeholder="이메일"
                className="p-3 border-2 rounded"
              />
              <input
                type="text"
                placeholder="주소"
                className="p-3 border-2 rounded"
              />
              <input
                type="text"
                placeholder="우편번호"
                className="p-3 border-2 rounded"
              />
            </form>

            <p className="text-lg text-gray-500 mb-2">
              당일 오후 2시 이후 주문은 다음날 배송을 시작합니다.
            </p>

            {/* 총 금액 */}
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>총 금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>

            <button className="w-full bg-gray-800 text-white p-4 rounded hover:bg-gray-900">
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
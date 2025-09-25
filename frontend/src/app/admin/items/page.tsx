"use client";

import { useState } from "react";
import Link from "next/link";
import { Item } from "@/type/item"; // 👉 types/item.ts 에 정의된 타입 사용

//전체 상품 목록 페이지 - 관리자 전용

export default function AdminItemsPage() {
  // 임시 아이템 데이터 (추후 서버 연동 예정)
  const [items, setItems] = useState<Item[]>([
    {
        id: 1,
        name: "케냐 AA Plus 오타야 (500g)",
        description:
          "과일향과 꽃향기 그리고 세련된 후미와 간결한 바디가 특징이며, 전체적인 밸런스가 좋은 커피",
        price: 21000,
        image: "/kenya.png", // public 폴더에 임시로 png 파일 넣어서 작업 진행함
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
  ]);

  // 아이템 삭제 (임시)
  const handleDelete = (id: number) => {
    if (confirm("정말 이 상품품을 삭제하시겠습니까?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-10 text-center">상품 관리</h1>

        <div className="mb-4 text-right">
          <Link
            href="/admin/items/new"
            className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            
          >
            상품 추가
          </Link>
        </div>

        <div className="overflow-x-auto ">
          <table className="w-full border border-gray-300 bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">이미지</th>
                <th className="px-4 py-2 border">상품명</th>
                <th className="px-4 py-2 border">설명</th>
                <th className="px-4 py-2 border">가격</th>
                <th className="px-4 py-2 border">관리</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="text-center hover:bg-gray-50 text-sm"
                >
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border text-left">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 border font-semibold">
                    {item.price.toLocaleString()}원
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/items/${item.id}/edit`}
                        className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 border border-red-400 text-red-600 rounded hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import type { Item } from "@/type/item";

//상품 수정 페이지

export default function ItemEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  // 임시 데이터 (추후 서버 연동 예정)
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

  const item = items.find((i) => i.id === id);

  // 수정용 state
  const [name, setName] = useState(item?.name || "");
  const [price, setPrice] = useState(item?.price || 0);
  const [description, setDescription] = useState(item?.description || "");

  if (!item) {
    return <p className="text-center text-gray-500 mt-20">상품을 찾을 수 없습니다.</p>;
  }

  // 저장 버튼 클릭
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem: Item = {
      ...item,
      name,
      price,
      description,
    };

    alert("상품이 수정되었습니다!");

    // 수정 후 상품 관리 페이지로 이동
    router.replace("/admin/items");
  };

  return (
    <>
      <div className="flex justify-center min-h-screen items-center bg-gray-100">
        <form
          onSubmit={handleSave}
          className="max-w-xl w-full bg-white p-8 rounded shadow space-y-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">상품 수정</h1>


          {/* 상품 이미지 (수정 불가) */}
          <div className="flex justify-center">
            <img src={item.image} alt={item.name} className="w-40 h-40 object-contain" />
          </div>

          {/* 상품 이름 */}
          <label className="block text-sm font-medium">상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />

          {/* 가격 */}
          <label className="block text-sm font-medium">가격</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          />

          {/* 설명 */}
          <label className="block text-sm font-medium">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
            required
          />

          {/* 버튼 */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
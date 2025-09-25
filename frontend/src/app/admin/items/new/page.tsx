"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Item } from "@/type/item"; 

//상품 추가 페이지

export default function ItemCreatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  // 저장 버튼 클릭
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 임시 id와 이미지 (추후 서버에서 처리)
    const newItem: Item = {
      id: Date.now(), // 임시 id
      name,
      price,
      description,
      image: "/kenya.png", // 임시 이미지
    };

    alert("새 상품이 추가되었습니다!");

    // 저장 후 상품 관리 페이지로 이동
    router.replace("/admin/items");
  };

  return (
    <>
      <div className="flex justify-center min-h-screen items-center bg-gray-100">
        <form
          onSubmit={handleSave}
          className="max-w-xl w-full bg-white p-8 rounded shadow space-y-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">상품 추가</h1>


          <label className="block text-sm font-medium">상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />

          <label className="block text-sm font-medium">가격</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          />

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
              추가하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
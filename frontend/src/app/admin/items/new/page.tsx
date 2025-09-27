"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchApi } from "@/lib/client";

//관리자 상품 생성
export default function ItemCreatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("/kenya.jpg");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetchApi(`/api/v1/admin/items`, {
        method: "POST",
        body: JSON.stringify({ name, content, price, imageUrl }),
      });

      alert(res.msg || "상품이 추가되었습니다!");
      router.replace("/admin/items");
    } 
    catch (err: any) {
      console.error("상품 등록 에러:", err);
      alert(err.message || "상품 등록 중 오류 발생");
    }
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
          placeholder="가격을 입력하세요"
        />
  
        <label className="block text-sm font-medium">설명</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          rows={4}
          required
        />

        <label className="block text-sm font-medium">이미지 URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />

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
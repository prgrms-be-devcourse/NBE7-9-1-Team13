"use client";

import { fetchApi } from "@/lib/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ItemResponse {
  id: number;
  name: string;
  content: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

//관리자 상품 수정 페이지
export default function AdminItemEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [item, setItem] = useState<ItemResponse | null>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetchApi(`/api/v1/admin/items/${id}`);

        if (!res.data) {
          alert("상품을 찾을 수 없습니다.");
          router.replace("/admin/items");
          return;
        }

        const found: ItemResponse = res.data;
        setItem(found);
        setName(found.name);
        setContent(found.content);
        setPrice(found.price);
        setImageUrl(found.imageUrl);
      }
      catch (err: any) {
        console.error("상품 불러오기 에러:", err);
        alert(err.message || "상품 불러오기 실패");
      }
    };
    fetchItem();
  }, [id, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchApi(`/api/v1/admin/items/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, content, price, imageUrl }),
      });

      alert(res.msg || "상품이 수정되었습니다.");
      router.replace("/admin/items");
    }
    catch (err: any) {
      console.error("상품 수정 에러:", err);
      alert(err.message || "상품 수정 중 오류 발생");
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetchApi(`/api/v1/admin/items/${id}`, {
        method: "DELETE",
      });

      alert(res.msg || "상품이 삭제되었습니다.");
      router.replace("/admin/items");
    }
    catch (err: any) {
      console.error("상품 삭제 에러:", err);
      alert(err.message || "상품 삭제 중 오류 발생");
    }
  };

  if (!item) {
    return <p className="text-center mt-20 text-gray-500">상품을 불러오는 중...</p>;
  }

  return (
    <>
      <div className="flex justify-center min-h-screen items-center bg-gray-100">
        <form
          onSubmit={handleSave}
          className="max-w-xl w-full bg-white p-8 rounded shadow space-y-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">상품 수정</h1>

          <div className="flex justify-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name}
                className="w-40 h-40 object-contain border"
              />
            )}
          </div>

          <label className="block text-sm font-medium">상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />

          <label className="block text-sm font-medium">설명</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
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
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              삭제하기
            </button>
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
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Item } from "@/type/item"; 
import { fetchApi } from "@/lib/client";
import { useRouter } from "next/navigation";

//관리자 전체 상품 목록 
export default function AdminItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const router = useRouter();

  // 상품 조회
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetchApi(`/api/v1/admin/items`, {
          cache: "no-store",
        });

        setItems(res.data ?? []);
      } catch (err: any) {
        console.error(err);
        alert(err.message || "상품을 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchItems();
  }, []);


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

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">이미지</th>
              <th className="px-4 py-2 border">상품명</th>
              <th className="px-4 py-2 border">설명</th>
              <th className="px-4 py-2 border">가격</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => router.push(`/admin/items/${item.id}/edit`)}
                className="text-center hover:bg-gray-50 text-sm cursor-pointer"
              >
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border font-medium">{item.name}</td>
                <td className="px-4 py-2 border text-left">{item.content}</td>
                <td className="px-4 py-2 border font-semibold">
                  {item.price.toLocaleString()}원
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
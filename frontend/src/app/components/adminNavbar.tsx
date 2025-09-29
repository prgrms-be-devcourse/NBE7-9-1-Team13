"use client"

import { fetchApi } from "@/lib/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetchApi("/api/v1/admin/logout", { method: "DELETE" });
      alert(res.msg || "로그아웃 되었습니다.");
      router.replace("/");
    }
    catch (err: any) {
      console.error("로그아웃 에러:", err);
      alert(err.message || "로그아웃 중 오류 발생");
    }
  };

  return (
    <>
      <nav className="w-full bg-gray-300 text-gray-800 px-6 py-3 flex justify-between items-center">
        <Link href="/admin/dashboard" className="font-bold text-3xl">
          관리자 페이지
        </Link>

        <ul className="flex gap-10 text-lg text-black">
          <li>
            <Link href="/" className="font-bold hover:underline">
              홈
            </Link>
          </li>
          <li>
            <Link href="/admin/items" className="font-bold hover:underline">
              상품 관리
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" className="font-bold hover:underline">
              주문 관리
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:underline font-bold"
            >
              로그아웃
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
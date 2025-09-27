"use client"

import Link from "next/link";

export default function Navbar() {
    return (
      <>
        <nav className="w-full bg-gray-300 text-gray-800 px-6 py-3 flex justify-between items-center">
          {/* 좌측 로고 */}
          <Link href="/" className="font-bold text-3xl">
            Grids & Circles
          </Link>
    
          {/* 우측 메뉴 */}
          <ul className="flex gap-10 text-lg text-black">
            <li>
              <Link href="/" className="font-bold hover:underline">
                홈
              </Link>
            </li>
            <li>
              <Link href="/orders" className="font-bold hover:underline">
                주문 내역
              </Link>
            </li>
            <li>
              <Link href="/admin" className="font-bold hover:underline">
                관리자
              </Link>
            </li>
          </ul>
        </nav>
      </>  
    );
}
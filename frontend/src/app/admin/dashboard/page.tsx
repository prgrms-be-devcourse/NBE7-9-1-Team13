"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="flex flex-row gap-50">
                    <Link href="/admin/items">
                        <div className="w-60 h-60 p-6 mb-10 flex items-center justify-center bg-gray-300 text-black font-bold text-3xl rounded hover:bg-gray-400 transition">
                            상품관리
                        </div>
                    </Link>

                    <Link href="/admin/orders">
                        <div className="w-60 h-60 p-6 flex items-center justify-center bg-gray-300 text-black font-bold text-3xl rounded hover:bg-gray-400 transition">
                            주문내역관리
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
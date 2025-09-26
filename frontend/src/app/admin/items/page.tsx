"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Item } from "@/type/item";
import { useRouter } from "next/navigation";

// 메인 주문 페이지
export default function Home() {
    const [items, setItems] = useState<Item[]>([]);

    // 백엔드 API에서 상품 목록 불러오기
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/items`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("상품 목록 조회 실패");
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.error(err);
                alert("상품을 불러오는 중 오류가 발생했습니다.");
            }
        };
        fetchItems();
    }, []);

    // 장바구니 상태
    const [cart, setCart] = useState<{ [id: number]: number }>({});
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

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

    // 결제하기 처리
    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("주문 버튼 클릭됨"); // 여기

        if (Object.keys(cart).length === 0) {
            alert("장바구니가 비어있습니다.");
            return;
        }
        if (email.trim().length === 0) {
            alert("이메일을 입력해주세요.");
            return;
        }
        if (address.trim().length === 0) {
            alert("주소를 입력해주세요.");
            return;
        }


        // 여기서 주문 데이터 저장 로직 추가 예정 (백엔드 API 연결. fetch)
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                address,
                orderItems: Object.entries(cart).map(([id, quantity]) => ({
                    productId: Number(id),
                    quantity
                }))
            })
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => console.log(data))
            .catch(err => console.error("주문 전송 실패:", err));
        alert("결제가 완료되었습니다!");

        // 주문 내역 페이지로 이동 (email 포함) -> 연동 후 다시 테스트 예정. 일단 보류류
        //router.replace(`/orders?email=${encodeURIComponent(email)}`);
    };
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 아이템 목록 */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => addToCart(item.id)}
                                className="flex flex-col bg-gray-50 p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={250}
                                    height={250}
                                    className="object-contain mx-auto"
                                />
                                <h3 className="mt-4 font-bold">{item.name}</h3>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                    {item.content}
                                </p>
                                <div className="mt-4 text-right font-semibold">
                                    {item.price.toLocaleString()}원
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 장바구니 */}
                    <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-inner gap-10">
                        <h2 className="font-bold text-lg text-center">장바구니</h2>

                        {Object.keys(cart).length === 0 ? (
                            <p className="text-sm text-center text-gray-500">
                                장바구니가 비어있습니다.
                            </p>
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
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span className="font-semibold">{quantity}</span>
                                                <button
                                                    type="button"
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


                        {/* 주문자 정보 입력 폼 */}
                        <form
                            onSubmit={handleCheckout}
                            className="flex flex-col gap-6 p-2"
                        >
                            <input
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 border-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="주소"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="p-3 border-2 rounded"
                                required
                            />

                            <p className="text-sm text-gray-500">
                                당일 오후 2시 이후 주문은 다음날 배송을 시작합니다.
                            </p>

                            {/* 총 금액 */}
                            <div className="flex justify-between items-center font-bold text-lg mb-4">
                                <span>총 금액</span>
                                <span>{totalPrice.toLocaleString()}원</span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-800 text-white p-4 rounded hover:bg-gray-900"
                            >
                                결제하기
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
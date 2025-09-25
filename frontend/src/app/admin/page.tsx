"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchApi } from "@/lib/client";

//관리자 로그인 페이지 - 진행중
export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length < 2 || password.length < 2) {
      alert("이메일과 비밀번호는 2자 이상 입력해주세요.");
      return;
    }

    try {
      const data = await fetchApi("/api/v1/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      alert(data.msg);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      alert(err.message || "로그인 실패");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold p-10 text-center">관리자 로그인</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow flex flex-col gap-6"
      >
        <p className="text-lg text-gray-600 text-center">
          관리자 전용 로그인 페이지입니다.
        </p>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-4 rounded hover:bg-gray-900"
        >
          로그인
        </button>
      </form>
    </>
  );
}
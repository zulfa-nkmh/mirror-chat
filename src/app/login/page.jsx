"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Cari user berdasarkan email saja
      const res = await fetch(
        `https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/userid?email=${encodeURIComponent(email)}`
      );

      if (res.ok) {
        const users = await res.json();

        // Jika user ditemukan
        if (users.length > 0) {
          const userData = users[0];

          // Validasi password manual
          if (userData.password === password) {
            // Fetch detail user lengkap
            const detailRes = await fetch(
              `https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/userid/${userData.id}`
            );
            const detailUser = await detailRes.json();

            login(detailUser); // simpan detail user lengkap
            router.push("/chat");
            return;
          }
        }
      }

      // Jika gagal login
      alert("Email or password incorrect. Please try again.");
      setIsLoading(false);
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0B0F] text-white px-4">
      {/* Info Skillmatch */}
      <div className="max-w-lg text-center mb-8">
        <p className="text-lg text-gray-300">
          Have you used <span className="font-semibold text-purple-400">Skillmatch</span>?{" "}
          If not, you must try Skillmatch first to synchronize your data with the{" "}
          <span className="font-semibold text-blue-400">Mirror Chat</span> system.
        </p>
        <a
          href="https://arunika-six.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm mt-3 inline-block text-purple-400 hover:text-purple-300 underline"
        >
          Go to Skillmatch →
        </a>
      </div>

      {/* Box Login */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 text-center">
          Sign In
        </h1>

        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          required
          disabled={isLoading}
        />

        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition shadow-lg shadow-purple-600/30 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

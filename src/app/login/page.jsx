// src/app/login/page.jsx

"use client";

import { useState } from 'react';
// Pastikan path ke UserContext sudah benar
import { useUser } from '@/context/UserContext'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [inputID, setInputID] = useState('');
  const { login } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Asumsi ID yang valid adalah '1', '2', atau '3' sesuai MOCKAPI
    if (inputID && ['1', '2', '3'].includes(inputID.trim())) { 
      setIsLoading(true);
      
      // Lakukan proses login (simpan ID ke Context & Local Storage)
      login(inputID.trim());
      
      // KOREKSI UTAMA: Tambahkan penundaan 100ms sebelum redirect
      // dan arahkan ke path /chat
      setTimeout(() => {
          router.push('/chat'); // <-- Mengarahkan ke halaman chat Anda
      }, 100); 

    } else {
      alert('Masukkan User ID yang valid (misal: 1 atau 2).');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0B0F] text-white">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
        Simulasi Sign In (Mirror ID)
      </h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-300 mb-2">
          Masukkan User ID Anda (1 atau 2):
        </label>
        <input
          id="userId"
          type="number"
          value={inputID}
          onChange={(e) => setInputID(e.target.value)}
          placeholder="Contoh: 1"
          className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition shadow-lg shadow-purple-600/30 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Memuat...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
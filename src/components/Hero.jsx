"use client";

import { Battery, Wifi, SignalHigh } from "lucide-react";

export default function Hero() {
  const PhoneMockup = () => {
    return (
      <section className="relative min-h-screen flex items-center justify-between px-12 pt-32">
        {/* Left content */}
        <div className="max-w-xl z-10">
          <span className="px-4 py-1 text-sm font-semibold rounded-full bg-purple-900/40 text-purple-400">
            Artificial Intelligence
          </span>
          {/* Judul Utama */}
        <h1 className="text-7xl font-extrabold mt-8 leading-tight">
          Empower Conversations <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Smarter AI</span>
        </h1>
          <p className="text-gray-400 mt-6 text-lg">
            ARUNIKA MC (MirrorChat) is your AI twin that helps you reflect, grow, and face your truth
            with powerful digital conversations.
          </p>

          <div className="flex gap-6 mt-8">
            <a
              href="/chat"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold transition"
            >
              Start Now
            </a>
            <a
              href="#download"
              className="px-6 py-3 border border-gray-600 rounded-xl text-lg font-semibold hover:border-purple-600 transition"
            >
              Download App
            </a>
          </div>
        </div>

        {/* Right mockup */}
        <div className="relative w-[340px] h-[680px] bg-black border-[12px] border-gray-700 rounded-[40px] shadow-[0_0_80px_rgba(109,40,217,0.4)] overflow-hidden">
          {/* Notch Ponsel */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>
    
          {/* Konten Layar Ponsel */}
          <div className="absolute inset-0 p-4 text-white z-10 bg-black flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-xs pt-1 mb-2 text-gray-200 font-semibold">
              <span>23:23</span>
              <div className="flex items-center space-x-2">
                <SignalHigh size={14} />
                <Wifi size={14} />
                <Battery size={14} className="animate-pulse text-green-400" /> {/* <- di sini */}
              </div>
            </div>

            {/* Header Aplikasi */}
            <div className="flex justify-between items-center mb-6 text-lg">
              <span className="text-gray-400 font-light">{'<'}</span>
              <span className="font-semibold text-white">Arunika MC</span>
              <span className="text-gray-400 font-light">ⓘ</span>
            </div>

            {/* Konten Utama */}
            <div className="flex flex-col items-center">
              {/* Logo Maestro Glow */}
              <div className="flex justify-center items-center h-36">
        <div className="relative w-28 h-28 bg-transparent flex justify-center items-center">
          
          {/* Efek Glow Ungu (Blur) - Gunakan animasi soft-pulse */}
          <div className="absolute w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-40 animate-soft-pulse"></div>
          
          {/* Ikon Maestro - Gunakan animasi spin-slow */}
          <div className="relative w-20 h-20 bg-purple-600 rounded-2xl flex justify-center items-center transform rotate-45 perspective-[1000px] animate-spin-slow">
            
            {/* Efek cahaya internal di dalam ikon */}
            <div className="w-10 h-10 bg-white rounded-full blur-sm opacity-20 absolute -z-10"></div>
            
            {/* Elemen Ikon Utama */}
            <div className="w-16 h-16 bg-purple-400 rounded-full transform -rotate-45"></div>
          </div>
        </div>
      </div>


              {/* Pesan */}
              <div className="text-center mb-6 mt-4">
                <p className="text-2xl font-bold">Hello I'm Arunika MC</p>
                <p className="text-sm text-gray-400">Your AI Digital Career Consultant</p>
              </div>

              {/* Kartu Konten Interaktif */}
              <div className="space-y-4 w-full">
                <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700/50">
                  <p className="font-semibold text-base mb-1">Gimana cara aku skill up skill gap ku ini?</p>
                  <p className="text-xs text-gray-400">
                    Pecah materi JavaScript jadi bagian kecil. Mulai dari variable, function, lalu DOM manipulation. Latihan kecil akan membuatmu terbiasa.
                  </p>
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    ↗
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700/50">
                    <p className="font-semibold text-base mb-1">Database itu ribet ga sih?</p>
                    <p className="text-xs text-gray-400">Database bisa jadi rumit, tapi dengan pemahaman yang tepat, kamu bisa menguasainya. Mulailah dengan konsep dasar seperti tabel, relasi, dan query sederhana.</p>
                    <span className="absolute right-4 top-4 text-gray-400 text-sm">↗</span>
                  </div>
                  <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700/50">
                    <p className="font-semibold text-base mb-1">Mulai dari mana belajar UI/UX?</p>
                    <p className="text-xs text-gray-400">Mulai dengan memahami prinsip dasar desain, seperti hierarki visual, warna, dan tipografi. Kemudian, eksplorasi alat desain seperti Figma atau Adobe XD untuk praktik langsung.</p>
                    <span className="absolute right-4 top-4 text-gray-400 text-sm">↗</span>
                  </div>
                  {/* Garis putih di bawah layar (Bar Home) */}
        <div className="absolute bottom-2 w-1/3 h-1 bg-white rounded-full left-1/2 transform -translate-x-1/2"></div>
      
                </div>
              </div>
            </div>

            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-black -z-10" />
          </div>
        </div>
      </section>
    );
  };

  return <PhoneMockup />;
}

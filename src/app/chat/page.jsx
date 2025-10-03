// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useChatStore } from "@/store/chatStore"; 
// import { useUser } from '@/context/UserContext'; 
// import { useRouter } from 'next/navigation'; 

// import { Send, User, Bot, Trash2, Search, BookOpen, Clock, X } from "lucide-react"; 

// // --- Komponen Modal Pencarian ---
// const SearchModal = ({ onClose }) => {
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleKeydown = (event) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleKeydown);
//     return () => {
//       document.removeEventListener('keydown', handleKeydown);
//     };
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20">
//       <div 
//         ref={modalRef}
//         className="relative bg-gray-900 border border-gray-700 rounded-xl w-[90%] max-w-xl p-6 shadow-2xl transform transition-all duration-300 scale-100"
//       >
//         <div className="flex justify-between items-center mb-4 border-b border-gray-700/50 pb-3">
//           <h2 className="text-2xl font-semibold text-white">Cari Refleksi</h2>
//           <button 
//             onClick={onClose}
//             className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition"
//             title="Tutup (Esc)"
//           >
//             <X size={20} />
//           </button>
//         </div>
//         <div className="relative">
//           <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Cari kata kunci, skill gap, atau riwayat..."
//             className="w-full bg-gray-800 text-white placeholder-gray-500 py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 border border-transparent focus:border-purple-600 transition"
//             autoFocus
//           />
//         </div>
//         <p className="text-xs text-gray-500 mt-4">
//           Tekan **Enter** untuk mencari, atau **Esc** untuk menutup.
//         </p>
//       </div>
//     </div>
//   );
// };
// // ------------------------------------------

// // --- Komponen Sidebar Kanan ---
// const RightSidebar = ({ activeMenu, setActiveMenu }) => {
  
//   const getButtonClasses = (menuName) => {
//     const isActive = activeMenu === menuName;
//     return `p-3 rounded-xl transition shadow-lg ${
//       isActive
//         ? "text-purple-400 bg-purple-900/30 hover:bg-purple-900"
//         : "text-gray-400 hover:bg-gray-700/50"
//     }`;
//   };

//   const handleMenuClick = (menuName) => {
//     setActiveMenu(activeMenu === menuName ? null : menuName);
//   };

//   return (
//     <div className="hidden lg:flex flex-col w-20 h-screen p-4 border-l border-gray-800 bg-gray-900/50 space-y-8 items-center pt-10 flex-shrink-0 sticky top-0 self-start">
//       <button title="Account" onClick={() => handleMenuClick("account")} className={getButtonClasses("account")}><User size={24} /></button>
//       <button title="Search" onClick={() => handleMenuClick("search")} className={getButtonClasses("search")}><Search size={24} /></button>
//       <button title="Library" onClick={() => handleMenuClick("library")} className={getButtonClasses("library")}><BookOpen size={24} /></button>
//       <button title="History Chat" onClick={() => handleMenuClick("history")} className={getButtonClasses("history")}><Clock size={24} /></button>
//     </div>
//   );
// };
// // ----------------------------------------------------


// export default function ChatLayout() { 
//   const { messages, addMessage, clearMessages } = useChatStore();
//   const { userId, isLoggedIn, logout } = useUser(); 
//   const router = useRouter(); 
  
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [scenarios, setScenarios] = useState([]); 
//   const [activeMenu, setActiveMenu] = useState(null); 
//   const [activeScenarioId, setActiveScenarioId] = useState(null); 
//   const messagesEndRef = useRef(null);

//   // Kata kunci penolakan/keraguan & mentor
//   const MENTOR_KEYWORDS = ["mentor", "stuck", "deadlock", "ahli"];

//   // 🔹 Efek: Redirect jika belum login
//   useEffect(() => {
//     // Jika tidak sedang login dan tidak sedang memuat, arahkan ke /home
//     if (!isLoggedIn && typeof window !== 'undefined') {
//       router.push('/'); 
//     }
//   }, [isLoggedIn, router]);


//   // 🔹 Efek: Fetch scenario dan Tentukan Skenario Awal
//   useEffect(() => {
//     // Hanya berjalan jika sudah login (userId tersedia)
//     if (!userId) return; 

//     fetch("https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/scenarios")
//       .then((res) => res.json())
//       .then((data) => {
//         setScenarios(data);
        
//         // Tentukan Skenario Awal berdasarkan User ID
//         const initialScenario = data.find(sc => sc.id === userId);
//         if (initialScenario) {
//           setActiveScenarioId(initialScenario.id);
          
//           // Kirim pesan perkenalan bot (Hanya jika chat kosong)
//           if (messages.length === 0) {
//               addMessage({ 
//                 role: "bot", 
//                 content: `Halo! Saya melihat data Anda menunjukkan masalah utama di area **${initialScenario.skillGap}**. \n\nBagaimana kabarmu hari ini? Aku siap menjadi cermin refleksimu.`
//               });
//           }
//         }
//       })
//       .catch((err) => console.error("Error fetch scenario:", err));
      
//       // Clear messages saat userId berganti (simulasi login user lain)
//       return () => {
//           clearMessages();
//       };
      
//   }, [userId]); 

//   // 🔹 Scroll otomatis
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 🔹 Kirim pesan user dan tentukan balasan bot
//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading || !activeScenarioId) return;

//     const userQuery = input.trim();
//     const normalizedQuery = userQuery.toLowerCase().replace(/[?,.!-]/g, '').trim(); 
//     setInput("");
//     setIsLoading(true);

//     const userMsg = { role: "user", content: userQuery };
//     addMessage(userMsg);

//     // Temukan skenario yang sedang aktif
//     const activeScenario = scenarios.find(sc => sc.id === activeScenarioId);

//     setTimeout(() => {
//       let botResponse = null;

//       // 1. Cek Trigger Deadlock/Mentor (PRIORITAS TERTINGGI)
//       if (MENTOR_KEYWORDS.some(keyword => normalizedQuery.includes(keyword))) {
//         const mentorData = activeScenario || scenarios[0];
        
//         if (mentorData && mentorData.mentors) {
//   const mentorList = mentorData.mentors
//     .map(
//       (m) => 
//         `**${m.name}**\n` +
//         `(${m.role})\n` +
//         `Expertise: ${m.expertise}\n` +
//         `Contact: ${m.contact}\n`
//         )
//         .join("\n");

//           const generalMessage = mentorData.mentorIntroMessage || "Aku hanyalah sebuah mesin. Jika kamu masih bingung dan merasa stuck, aku bisa memberimu pilihan beberapa mentor ahli untuk konsultasi lebih lanjut.";
          
//           botResponse = {
//             role: "bot",
//             content: 
//               `🔔 Catatan dari Reflektor: "${generalMessage}"\n\n` +
//               `👩‍🏫 Mentor yang disarankan:\n${mentorList}`
//           };
//         }
//       }

//       // 2. Cek Respon di Skenario AKTIF (Normal/Mirror)
//       if (botResponse === null && activeScenario) {
          
//           // A. Cek Mirror Response/Penolakan (TINGKAT 2)
//           if (botResponse === null) {
//   const matchedMirrorResponse = activeScenario.mirrorResponses?.find((resp) => {
//     const question = resp.userQuestion2?.toLowerCase().replace(/[?,.!-]/g, '').trim();
//     return question && normalizedQuery.includes(question);
//   });

//   if (matchedMirrorResponse) {
//     botResponse = {
//       role: "bot",
//       content: `🪞 Cermin Refleksi (Skenario Aktif - ${activeScenario.skillGap}):\n\n${matchedMirrorResponse.botAnswer2}`,
//     };
//   }
// }

//           // B. Cek Normal Response (TINGKAT 1)
//           if (botResponse === null) {
//               const matchedNormalResponse = activeScenario.normalResponses?.find((resp) => {
//               const question = resp.userQuestion1?.toLowerCase().replace(/[?,.!-]/g, '').trim();
//               return question && normalizedQuery.includes(question);
//             });
              
//               if (matchedNormalResponse) {
//   botResponse = {
//     role: "bot",
//     content: `💡 Saran Spesifik (Skenario Aktif - ${activeScenario.skillGap}):\n\n${matchedNormalResponse.botAnswer1}`,
//   };
// }
              
//           }
//       }
      
//       // . Final Fallback (Jika skenario aktif entah bagaimana hilang)
//       if (botResponse === null) {
//            botResponse = {
//             role: "bot",
//             content: `Cermin Refleksi: "Saya mendengar Anda mengatakan: '${userQuery}'. Bisa ceritakan lebih lanjut?"`,
//           };
//       }

//       addMessage(botResponse);
//       setIsLoading(false);
//     }, 1200);
//   };

//   // 🔹 Komponen bubble chat
//   const MessageBubble = ({ message }) => (
//     <div
//       className={`flex items-start gap-3 max-w-[85%] ${
//         message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
//       }`}
//     >
//       <div
//         className={`p-2 rounded-full ${
//           message.role === "user" ? "bg-purple-600/70" : "bg-gray-700/70"
//         }`}
//       >
//         {message.role === "user" ? <User size={18} /> : <Bot size={18} />}
//       </div>
//       <div
//         className={`p-4 rounded-3xl ${
//           message.role === "user"
//             ? "bg-purple-600 rounded-br-none shadow-md"
//             : "bg-gray-800 rounded-tl-none shadow-md border border-gray-700"
//         } text-sm whitespace-pre-wrap`}
//       >
//         {message.content}
//       </div>
//     </div>
//   );
  
//   // Render loading state jika belum login
//   if (!isLoggedIn) {
//       return (
//           <div className="flex items-center justify-center min-h-screen bg-[#0B0B0F] text-white">
//               <p>Mengalihkan ke halaman login...</p>
//           </div>
//       );
//   }

//   return (
//     <div className="flex min-h-screen bg-[#0B0B0F] text-white">
      
//       {/* Area Chat Utama */}
//       <div className="flex flex-col flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 pt-10">
        
//         {/* Header Chat */}
//         <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-6">
//           <a href="/" className="cursor-pointer"> 
//             <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition">
//               Arunika MC (User ID: {userId})
//             </h1>
//           </a>
//           <div className="flex gap-4">
//              {/* Tombol Logout */}
//             <button
//                 onClick={logout}
//                 className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm"
//             >
//                 <X size={16} /> Logout
//             </button>
//             {/* Tombol Hapus Chat Lama */}
//             <button
//                 onClick={() => {
//                     if (window.confirm("Yakin ingin menghapus semua pesan?")) {
//                         clearMessages();
//                         setActiveScenarioId(null); 
//                     }
//                 }}
//                 className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm"
//             >
//                 <Trash2 size={16} /> Hapus Chat
//             </button>
//           </div>
//         </div>

//         {/* Area Pesan */}
//         <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-500 mt-20">
//               <Bot size={32} className="mx-auto mb-3 text-purple-400" />
//               <p className="text-lg font-semibold">Memuat Konteks...</p>
//               <p className="text-sm">
//                 Sistem sedang memuat skenario dari User ID **{userId}**
//               </p>
//             </div>
//           )}
//           {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
//           {isLoading && (
//             <div className="flex items-start gap-3 mr-auto">
//               <div className="p-2 rounded-full bg-gray-700/70"><Bot size={18} /></div>
//               <div className="p-4 rounded-3xl bg-gray-800 rounded-tl-none shadow-md border border-gray-700 text-sm">
//                 <span className="animate-pulse">Mengetik...</span>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Form */}
//         <form onSubmit={handleSend} className="mt-6">
//           <div className="flex gap-3 bg-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl">
//             <input
//               className="flex-1 px-4 py-2 bg-transparent focus:outline-none placeholder-gray-500 text-base"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               // Placeholder menyesuaikan skenario aktif
//               placeholder={activeScenarioId ? `Bertanya tentang ${scenarios.find(sc => sc.id === activeScenarioId)?.skillGap}...` : "Ketik refleksi atau pertanyaan Anda di sini..."}
//               disabled={isLoading || !activeScenarioId}
//             />
//             <button
//               type="submit"
//               className={`p-3 rounded-full transition ${
//                 input.trim() && !isLoading && activeScenarioId
//                   ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30"
//                   : "bg-gray-700 text-gray-500 cursor-not-allowed"
//               }`}
//               disabled={!input.trim() || isLoading || !activeScenarioId}
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Sidebar Kanan (Sticky) */}
//       <RightSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
//       {/* RENDER MODAL DAN PLACEHOLDER MENU */}
//       {activeMenu === 'search' && (<SearchModal onClose={() => setActiveMenu(null)} />)}
//       {activeMenu && activeMenu !== 'search' && (
//         <div className="absolute right-20 top-0 h-screen w-80 bg-gray-800/90 backdrop-blur-sm p-6 border-l border-gray-700 z-50">
//           <h2 className="text-xl font-bold capitalize mb-4">Menu: {activeMenu}</h2>
//           <p className="text-gray-400">Konten menu **{activeMenu}** akan tampil di sini.</p>
//           <button onClick={() => setActiveMenu(null)} className="mt-4 text-purple-400 hover:text-purple-300">Tutup</button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore"; 
import { useUser } from '@/context/UserContext'; 
import { useRouter } from 'next/navigation'; 
import { Send, User, Bot, Trash2, Search, BookOpen, Clock, X } from "lucide-react"; 

// --- Komponen Modal Pencarian ---
const SearchModal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20">
      <div 
        ref={modalRef}
        className="relative bg-gray-900 border border-gray-700 rounded-xl w-[90%] max-w-xl p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4 border-b border-gray-700/50 pb-3">
          <h2 className="text-2xl font-semibold text-white">Cari Refleksi</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari kata kunci, skill gap, atau riwayat..."
            className="w-full bg-gray-800 text-white placeholder-gray-500 py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 border border-transparent"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

// --- Komponen Sidebar ---
const RightSidebar = ({ activeMenu, setActiveMenu }) => {
  const getButtonClasses = (menuName) => {
    const isActive = activeMenu === menuName;
    return `p-3 rounded-xl transition shadow-lg ${
      isActive
        ? "text-purple-400 bg-purple-900/30 hover:bg-purple-900"
        : "text-gray-400 hover:bg-gray-700/50"
    }`;
  };

  return (
    <div className="hidden lg:flex flex-col w-20 h-screen p-4 border-l border-gray-800 bg-gray-900/50 space-y-8 items-center pt-10 flex-shrink-0 sticky top-0">
      <button title="Account" onClick={() => setActiveMenu("account")} className={getButtonClasses("account")}><User size={24} /></button>
      <button title="Search" onClick={() => setActiveMenu("search")} className={getButtonClasses("search")}><Search size={24} /></button>
      <button title="Library" onClick={() => setActiveMenu("library")} className={getButtonClasses("library")}><BookOpen size={24} /></button>
      <button title="History" onClick={() => setActiveMenu("history")} className={getButtonClasses("history")}><Clock size={24} /></button>
    </div>
  );
};

export default function ChatLayout() {
  const { messages, addMessage, clearMessages } = useChatStore();
  const { user, userId, isLoggedIn, logout } = useUser(); 
  const router = useRouter(); 

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); 
  const messagesEndRef = useRef(null);

  // Redirect jika belum login
  useEffect(() => {
    if (!isLoggedIn && typeof window !== 'undefined') {
      router.push('/'); 
    }
  }, [isLoggedIn, router]);

  // Scroll otomatis
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 handleSend: kirim ke API Gemini
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ role: "user", content: input });
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          profile: user,
          message: currentInput,
        }),
      });

      const data = await res.json();
      console.log("[DEBUG FRONTEND] Balasan dari backend:", data);

      if (data.reply) {
        addMessage({ role: "bot", content: data.reply });
      } else {
        addMessage({ role: "bot", content: "⚠️ Bot tidak memberikan balasan." });
      }
    } catch (err) {
      console.error("[DEBUG FRONTEND] error fetch:", err);
      addMessage({ role: "bot", content: "⚠️ Error koneksi ke server." });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Komponen bubble chat
  const MessageBubble = ({ message }) => (
    <div
      className={`flex items-start gap-3 max-w-[85%] ${
        message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          message.role === "user" ? "bg-purple-600/70" : "bg-gray-700/70"
        }`}
      >
        {message.role === "user" ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div
        className={`p-4 rounded-3xl ${
          message.role === "user"
            ? "bg-purple-600 rounded-br-none shadow-md"
            : "bg-gray-800 rounded-tl-none shadow-md border border-gray-700"
        } text-sm whitespace-pre-wrap`}
      >
        {message.content}
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0B0F] text-white">
        <p>Mengalihkan ke halaman login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0B0B0F] text-white">
      {/* Chat Area */}
      <div className="flex flex-col flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 pt-10">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-6">
          <a href="/" className="cursor-pointer"> 
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Arunika MC (User ID: {userId})
            </h1>
          </a>
          <div className="flex gap-4">
            <button onClick={logout} className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm">
              <X size={16} /> Logout
            </button>
            <button onClick={() => { if (window.confirm("Yakin hapus semua pesan?")) clearMessages(); }}
              className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm">
              <Trash2 size={16} /> Hapus Chat
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <Bot size={32} className="mx-auto mb-3 text-purple-400" />
              <p className="text-lg font-semibold">Belum ada pesan</p>
              <p className="text-sm">Mulailah percakapan dengan bot di bawah.</p>
            </div>
          )}
          {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
          {isLoading && (
            <div className="flex items-start gap-3 mr-auto">
              <div className="p-2 rounded-full bg-gray-700/70"><Bot size={18} /></div>
              <div className="p-4 rounded-3xl bg-gray-800 shadow-md border border-gray-700 text-sm">
                <span className="animate-pulse">Mengetik...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="mt-6">
          <div className="flex gap-3 bg-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl">
            <input
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none placeholder-gray-500 text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`p-3 rounded-full transition ${
                input.trim() && !isLoading
                  ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!input.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Sidebar */}
      <RightSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === 'search' && (<SearchModal onClose={() => setActiveMenu(null)} />)}
    </div>
  );
}

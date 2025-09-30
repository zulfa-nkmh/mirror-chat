"use client"; // Diperlukan untuk menggunakan hooks dan state di Next.js App Router

import { useState, useEffect, useRef } from "react";
// Asumsi 'chatStore.jsx' ada di lokasi yang dapat diakses (misalnya, di folder 'store')
import { useChatStore } from "@/store/chatStore";
import { Send, User, Bot, Trash2, Search, BookOpen, Clock } from "lucide-react"; // Menambahkan icon baru

// --- Komponen Sidebar Kanan ---
const RightSidebar = () => (
  // Perubahan: Menambahkan sticky, top-0, h-screen, dan self-start
  <div className="hidden lg:flex flex-col w-20 h-screen p-4 border-l border-gray-800 bg-gray-900/50 space-y-8 items-center pt-10 flex-shrink-0 sticky top-0 self-start">
    
    {/* Account */}
    <button title="Account" className="p-3 rounded-xl text-purple-400 bg-purple-900/30 hover:bg-purple-900 transition shadow-lg">
      <User size={24} />
    </button>
    
    {/* Search */}
    <button title="Search" className="p-3 rounded-xl text-gray-400 hover:bg-gray-700/50 transition">
      <Search size={24} />
    </button>
    
    {/* Library */}
    <button title="Library" className="p-3 rounded-xl text-gray-400 hover:bg-gray-700/50 transition">
      <BookOpen size={24} />
    </button>
    
    {/* History Chat */}
    <button title="History Chat" className="p-3 rounded-xl text-gray-400 hover:bg-gray-700/50 transition">
      <Clock size={24} />
    </button>
  </div>
);
// ------------------------------

export default function ChatPage() {
  const { messages, addMessage, clearMessages } = useChatStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const messagesEndRef = useRef(null);

  // 🔹 Fetch data scenario dari MockAPI (LOGIC TIDAK BERUBAH)
  useEffect(() => {
    fetch("https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/scenarios")
      .then((res) => res.json())
      .then((data) => {
        console.log("📥 Data dari API:", data); // DEBUG
        setScenarios(data);
      })
      .catch((err) => console.error("Error fetch scenarios:", err));
  }, []);

  // 🔹 Auto-scroll + simpan localStorage (LOGIC TIDAK BERUBAH)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("mirror-messages", JSON.stringify(messages));
  }, [messages]);

  // 🔹 Kirim pesan user + cari respon bot (LOGIC TIDAK BERUBAH)
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return console.error("Input tidak boleh kosong atau bot sedang memproses.");

    const userQuery = input.trim();
    setInput("");
    setIsLoading(true);

    const userMsg = { role: "user", content: userQuery };
    addMessage(userMsg);

    setTimeout(() => {
      // Cari scenario yang cocok
      const matchedScenario = scenarios.find((sc) => {
        const query = userQuery.toLowerCase().trim();
        const skillGap = sc.skillGap?.toLowerCase().trim() || "";
        const scenario = sc.scenario?.toLowerCase().trim() || "";

        return (
       
                query.includes(skillGap) ||
          query.includes(scenario) ||
          skillGap.includes(query) ||
          scenario.includes(query)
        );
      });

      let botResponse;
      if (matchedScenario) {
        botResponse = {
          role: "bot",
          content:
            `📌 Skill Gap: **${matchedScenario.skillGap}**\n\n` +
            `${matchedScenario.scenario}\n\n` +
            `💡 Contoh Tanya-Jawab:\n` +
            `${matchedScenario.normalResponses?.[0]?.userQuestion || ""} → ${
              matchedScenario.normalResponses?.[0]?.botAnswer || ""
            }\n\n` +
            `🪞 Refleksi:\n${
              matchedScenario.mirrorResponses?.[0]?.botAnswer || ""
            }\n\n` +
            `👩‍🏫 Mentor tersedia:\n${
              matchedScenario.mentors
                ?.map((m) => `- ${m.name} (${m.role})`)
                .join("\n") || ""
            }\n\n` +
            `🔔 Catatan: ${matchedScenario.mentorIntroMessage || ""}`,
        };
      } else {
        botResponse = {
          role: "bot",
          content: `Cermin Refleksi: "Saya mendengar Anda mengatakan: '${userQuery}'. Bisa ceritakan lebih lanjut?"`,
        };
      }

      addMessage(botResponse);
      setIsLoading(false);
    }, 1200);
  };

  // 🔹 Komponen bubble chat (LOGIC TIDAK BERUBAH)
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

  return (
    // Struktur utama: Flex horizontal yang membungkus Chat Area dan Sidebar
    <div className="flex min-h-screen bg-[#0B0B0F] text-white">
      
      {/* Area Chat Utama (Mengambil sebagian besar ruang) */}
      <div className="flex flex-col flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 pt-10">
        
        {/* Header Chat */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Mirror Chat AI
          </h1>
          <button
            onClick={() => {
              // NOTE: Confirmation dialogs (window.confirm) tidak diizinkan. 
              console.log("Chat history cleared (custom modal UI needed for confirmation).");
              clearMessages();
            }}
            className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm"
          >
            <Trash2 size={16} /> Hapus Chat
          </button>
        </div>

        {/* Area Pesan */}
        <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Bot size={32} className="mx-auto mb-3 text-purple-400" />
              <p className="text-lg font-semibold">Mulai Refleksi Anda</p>
              <p className="text-sm">
                Tuliskan pikiran, kekhawatiran, atau tujuan Anda di bawah ini.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
          )}
          {isLoading && (
            <div className="flex items-start gap-3 mr-auto">
              <div className="p-2 rounded-full bg-gray-700/70">
                <Bot size={18} />
              </div>
              <div className="p-4 rounded-3xl bg-gray-800 rounded-tl-none shadow-md border border-gray-700 text-sm">
                <span className="animate-pulse">Mengetik...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-6">
          <div className="flex gap-3 bg-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl">
            <input
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none placeholder-gray-500 text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik refleksi atau pertanyaan Anda di sini..."
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

      {/* Sidebar Kanan (Sekarang Sticky) */}
      <RightSidebar />
    </div>
  );
}

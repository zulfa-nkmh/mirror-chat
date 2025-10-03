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
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20 px-4">
      <div 
        ref={modalRef}
        className="relative bg-gray-900 border border-gray-700 rounded-xl w-full max-w-xl p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4 border-b border-gray-700/50 pb-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Cari Refleksi</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition"
          >
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
const SidebarButton = ({ title, icon, isActive, onClick }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
        isActive
          ? "text-purple-400 bg-purple-900/30 hover:bg-purple-900"
          : "text-gray-400 hover:bg-gray-700/50"
      }`}
    >
      {icon}
      <span className="text-xs mt-1 hidden sm:block">{title}</span>
    </button>
  );
};

const RightSidebar = ({ activeMenu, setActiveMenu, user, messages, logout }) => {
  const [panelContent, setPanelContent] = useState(null);

  const handleClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
      setPanelContent(null);
    } else {
      setActiveMenu(menuName);
      switch(menuName) {
        case "account":
          setPanelContent(
            <div className="flex flex-col gap-3">
              <p>User ID: {user?.userId || "-"}</p>
              <button onClick={logout} className="text-red-500 hover:text-red-400 flex items-center gap-2">
                <X size={16} /> Logout
              </button>
            </div>
          );
          break;
        case "search":
          setPanelContent(
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Cari kata kunci, skill gap, atau riwayat..."
                className="w-full bg-gray-800 text-white placeholder-gray-500 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-700"
              />
              <div className="text-gray-400 text-sm">Hasil pencarian akan muncul di sini (dummy)</div>
            </div>
          );
          break;
        case "library":
          setPanelContent(
            <div className="text-gray-400 text-sm">Library kosong (dummy content)</div>
          );
          break;
        case "history":
          setPanelContent(
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {messages.length === 0
                ? <p className="text-gray-400 text-sm">Belum ada riwayat</p>
                : messages.map((msg, idx) => (
                    <div key={idx} className={`text-sm p-1 rounded ${msg.role === 'user' ? 'bg-purple-700/30 ml-auto text-right' : 'bg-gray-700/30 mr-auto text-left'}`}>
                      {msg.content}
                    </div>
                  ))
              }
            </div>
          );
          break;
        default:
          setPanelContent(null);
      }
    }
  };

  const buttons = [
    { name: "account", icon: <User size={24} />, title: "Account" },
    { name: "search", icon: <Search size={24} />, title: "Search" },
    { name: "library", icon: <BookOpen size={24} />, title: "Library" },
    { name: "history", icon: <Clock size={24} />, title: "History" },
  ];

  return (
    <>
      {/* Sidebar desktop */}
      <div className="hidden lg:flex flex-col w-20 h-screen p-4 border-l border-gray-800 bg-gray-900/50 space-y-8 items-center pt-10 flex-shrink-0 sticky top-0">
        {buttons.map((btn) => (
          <SidebarButton
            key={btn.name}
            title={btn.title}
            icon={btn.icon}
            isActive={activeMenu === btn.name}
            onClick={() => handleClick(btn.name)}
          />
        ))}
      </div>

      {/* Bottom navigation mobile/tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 border-t border-gray-800 flex justify-around items-center p-2 z-50">
        {buttons.map((btn) => (
          <SidebarButton
            key={btn.name}
            title={btn.title}
            icon={btn.icon}
            isActive={activeMenu === btn.name}
            onClick={() => handleClick(btn.name)}
          />
        ))}
      </div>

      {/* Expandable mini-panel mobile/tablet */}
      {activeMenu && (
        <div className="lg:hidden fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-xl shadow-xl w-[90%] max-w-md z-50">
          {panelContent}
        </div>
      )}
    </>
  );
};

// --- ChatLayout utama ---
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

  // Kirim pesan
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
        body: JSON.stringify({ userId, profile: user, message: currentInput }),
      });

      const data = await res.json();
      if (data.reply) {
        addMessage({ role: "bot", content: data.reply });
      } else {
        addMessage({ role: "bot", content: "⚠️ Bot tidak memberikan balasan." });
      }
    } catch (err) {
      addMessage({ role: "bot", content: "⚠️ Error koneksi ke server." });
    } finally {
      setIsLoading(false);
    }
  };

  // Komponen Bubble Chat
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
    <div className="flex min-h-screen bg-[#0B0B0F] text-white flex-col lg:flex-row">
      {/* Area Chat Utama */}
      <div className="flex flex-col flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 pb-28 lg:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b border-gray-700 mb-6">
          <a href="/" className="cursor-pointer"> 
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Arunika MC (User ID: {userId})
            </h1>
          </a>
          <div className="flex gap-3 flex-wrap">
            <button onClick={logout} className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm">
              <X size={16} /> Logout
            </button>
            <button onClick={() => { if (window.confirm("Yakin hapus semua pesan?")) clearMessages(); }}
              className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm">
              <Trash2 size={16} /> Hapus Chat
            </button>
          </div>
        </div>

        {/* Pesan */}
        <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <Bot size={32} className="mx-auto mb-3 text-purple-400" />
              <p className="text-base sm:text-lg font-semibold">Belum ada pesan</p>
              <p className="text-xs sm:text-sm">Mulailah percakapan dengan bot di bawah.</p>
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
        <form onSubmit={handleSend} className="mt-6 relative z-20">
          <div className="flex gap-3 bg-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl">
            <input
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none placeholder-gray-500 text-sm sm:text-base"
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

      {/* Sidebar responsive interaktif */}
      <RightSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={{ userId }} messages={messages} logout={logout} />

      {activeMenu === 'search' && (<SearchModal onClose={() => setActiveMenu(null)} />)}
    </div>
  );
}

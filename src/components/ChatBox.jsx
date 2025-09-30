"use client";

import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { Send, User, Bot, Trash2 } from "lucide-react";

export default function ChatPage() {
  const { messages, addMessage, clearMessages } = useChatStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]); // data mockapi
  const messagesEndRef = useRef(null);

  // Fetch scenario dari mockapi sekali waktu load
  useEffect(() => {
    fetch("https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/scenarios")
      .then((res) => res.json())
      .then((data) => setScenarios(data))
      .catch((err) => console.error("Error fetch scenario:", err));
  }, []);

  // Scroll otomatis
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Kirim pesan user
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    setInput("");
    setIsLoading(true);

    const userMsg = { role: "user", content: userQuery };
    addMessage(userMsg);

    // Cari apakah query cocok dengan salah satu scenario
    const matchedScenario = scenarios.find((sc) =>
      userQuery.toLowerCase().includes(sc.title.toLowerCase())
    );

    setTimeout(() => {
      let botResponse;
      if (matchedScenario) {
        // Kalau ketemu scenario → balas sesuai description
        botResponse = {
          role: "bot",
          content: `📌 Skenario: **${matchedScenario.title}**\n\n${matchedScenario.description}`,
        };
      } else {
        // Kalau tidak ada match → balas default
        botResponse = {
          role: "bot",
          content: `Saya mendengar kamu bilang: "${userQuery}". Bisa ceritakan lebih lanjut?`,
        };
      }

      addMessage(botResponse);
      setIsLoading(false);
    }, 1200);
  };

  // Bubble chat
  const MessageBubble = ({ message }) => (
    <div
      className={`flex items-start gap-3 max-w-[85%] ${
        message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
      }`}
    >
      <div className={`p-2 rounded-full ${message.role === "user" ? "bg-purple-600/70" : "bg-gray-700/70"}`}>
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
    <div className="flex flex-col min-h-[calc(100vh-80px)] pt-4 bg-[#0B0B0F] text-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow p-4 md:p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Mirror Chat AI
          </h1>
          <button
            onClick={() => {
              if (window.confirm("Yakin ingin menghapus semua pesan?")) {
                clearMessages();
              }
            }}
            className="text-gray-400 hover:text-red-500 transition flex items-center gap-2 text-sm"
          >
            <Trash2 size={16} /> Hapus Chat
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Bot size={32} className="mx-auto mb-3 text-purple-400" />
              <p className="text-lg font-semibold">Mulai Refleksi Anda</p>
              <p className="text-sm">Tuliskan pikiran, kekhawatiran, atau tujuan Anda di bawah ini.</p>
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

        {/* Input */}
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
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useChatStore } from "@/store/chatStore";

export default function ChatPage() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");

  // Sync ke localStorage
  useEffect(() => {
    localStorage.setItem("mirror-messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return alert("Input tidak boleh kosong!");

    const userMsg = { role: "user", content: input };
    const botMsg = {
      role: "bot",
      content: `Mirror Reflection: "${input}"`,
    };

    addMessage(userMsg);
    addMessage(botMsg);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Mirror Chat</h1>
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.role === "user"
                  ? "bg-purple-600 self-end text-right"
                  : "bg-gray-700 self-start text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your reflection..."
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-purple-600 rounded-xl hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

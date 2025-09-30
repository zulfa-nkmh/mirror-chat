import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mirror Chat",
  description: "Empower Conversations with Smarter AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <header className="flex justify-between items-center px-10 py-6 bg-black/40 backdrop-blur-lg border-b border-gray-800">
          <h1 className="text-2xl font-bold text-purple-400">Mirror Chat</h1>
          <nav className="space-x-6">
            <a href="/" className="hover:text-purple-400">Home</a>
            <a href="/chat" className="hover:text-purple-400">Chat</a>
            <a href="/about" className="hover:text-purple-400">About</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

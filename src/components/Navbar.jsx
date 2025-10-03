"use client";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-lg md:text-xl font-bold text-white">
        ARUNIKA MC
      </Link>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-8 text-gray-300">
        <Link href="/about">About</Link>
        <Link href="/Pricing">Pricing</Link>
        <Link href="/download">Download</Link>
      </div>

      {/* Aksi */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-200 hover:text-white transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Icon akun */}
        <Link
          href="/login"
          className="hidden md:inline text-gray-200 hover:text-white transition"
          title="Account"
        >
          <User className="w-6 h-6" />
        </Link>
        <Link
          href="/login"
          className="hidden md:inline px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition"
        >
          Get Started →
        </Link>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-gray-800 flex flex-col items-center gap-6 py-6 md:hidden">
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/Pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/download" onClick={() => setIsOpen(false)}>Download</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <User className="w-5 h-5" /> Login
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition"
          >
            Get Started →
          </Link>
        </div>
      )}
    </nav>
  );
}

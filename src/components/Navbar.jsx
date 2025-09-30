"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm px-8 py-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">MirrorChat</h2>
      <div className="hidden md:flex gap-8 text-gray-300">
        <Link href="#about">About</Link>
        <Link href="#how">How it Works</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#contact">Contact Us</Link>
        <Link href="#download">Download</Link>
      </div>
      <Link
        href="/chat"
        className="ml-6 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition"
      >
        Get Started →
      </Link>
    </nav>
  );
}

"use client";
import Navbar from "@/components/Navbar";
import TypewriterLoop from "@/components/TypewriterLoop";


export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-6">
      <Navbar />
      <div>
        <TypewriterLoop />
      </div>
    </main>
  );
}

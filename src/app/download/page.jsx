"use client";
import Navbar from "@/components/Navbar";
import TypewriterLoop from "@/components/TypewriterLoop";

export default function DownloadPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-4 sm:px-6">
      <Navbar />
      <div className="mt-8 sm:mt-12">
        <TypewriterLoop />
      </div>
    </main>
  );
}

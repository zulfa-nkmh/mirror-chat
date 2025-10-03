"use client";
import Navbar from "@/components/Navbar";
import MembershipCards from "@/components/MembershipCards";
import SimpleFooter from "@/components/footer";

export default function PricingPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-4 sm:px-6">
      <Navbar />
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-8 leading-tight">
          Empower Conversations <br />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Arunika MC</span>
        </h1>
        <MembershipCards />
        <SimpleFooter />
      </div>
    </main>
  );
}

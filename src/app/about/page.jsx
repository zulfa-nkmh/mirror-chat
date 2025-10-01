"use client";
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/footer";


export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-6">
      <Navbar />
      <div>
        <h1 className="text-5xl font-extrabold mt-8 leading-tight">
          Empower Conversations <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Arunika MC</span>
        </h1>
        <p className="text-gray-400 mt-6 text-lg">
            ARUNIKA MC (MirrorChat) is your AI twin that helps you reflect, grow, and face your truth
            with powerful digital conversations.
            <br></br>Arunika MC isn’t just a chat – it’s a mirror for your career journey.
            <br></br>Share your thoughts, challenges, or goals, and receive guidance, reflection, and mentor suggestions just for you.
            <br></br>Every conversation is a step toward mastering your skills, overcoming roadblocks, and taking charge of your career journey. 
            <br></br>Your AI twin is here to listen, reflect, and guide.
          </p>
        <SimpleFooter />
      </div>
    </main>
  );
}

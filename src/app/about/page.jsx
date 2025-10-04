"use client";
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/footer";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-8 leading-snug sm:leading-tight lg:leading-tight">
          Empower Conversations <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Arunika MC
          </span>
        </h1>
        <p className="text-gray-400 mt-2 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-1xl leading-relaxed sm:leading-relaxed md:leading-relaxed">
          ARUNIKA MC (MirrorChat) is your AI twin that helps you reflect, grow, and face your truth
          with powerful digital conversations.
          <br /> Arunika MC isn’t just a chat – it’s a mirror for your career journey.
          <br /> Share your thoughts, challenges, or goals, and receive guidance, reflection, and mentor suggestions just for you.
          <br /> Every conversation is a step toward mastering your skills, overcoming roadblocks, and taking charge of your career journey. 
          <br /> Your AI twin is here to listen, reflect, and guide.
        </p>
        <SimpleFooter />
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-center px-4 sm:px-6">
   
      <Navbar />
 
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <Hero />
      </div>

      <SimpleFooter />
    </main>
  );
}

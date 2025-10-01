import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-6">
      <Navbar />
      <div>
        <Hero />
        <SimpleFooter />
      </div>
    </main>
  );
}

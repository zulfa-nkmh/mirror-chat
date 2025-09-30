import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-black to-black text-center px-6">
      <div>
        <h2 className="uppercase text-purple-300 tracking-wide mb-3">
          Artificial Intelligent
        </h2>
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Empower Conversations <br /> with{" "}
          <span className="text-purple-400">Smarter AI</span>
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Mirror Chat is your digital reflection. A smarter AI that helps you
          see yourself clearer and grow every day.
        </p>
        <div className="space-x-4">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Start Now
          </Button>
          <Button variant="outline" className="border-purple-600 text-purple-400">
            Download App
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function Hero() {
  const PhoneMockup = () => {
    return (
      <section className="relative min-h-screen flex items-center justify-between px-12 pt-32">
        {/* Left content */}
        <div className="max-w-xl z-10">
          <span className="px-4 py-1 text-sm font-semibold rounded-full bg-purple-900/40 text-purple-400">
            Artificial Intelligence
          </span>
          <h1 className="text-6xl font-extrabold mt-6 leading-tight">
            Empower Conversations <br /> with{" "}
            <span className="text-purple-500">Smarter AI</span>
          </h1>
          <p className="text-gray-400 mt-6 text-lg">
            MirrorChat is your AI twin that helps you reflect, grow, and face your truth
            with powerful digital conversations.
          </p>

          <div className="flex gap-6 mt-8">
            <a
              href="/chat"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold transition"
            >
              Start Now
            </a>
            <a
              href="#download"
              className="px-6 py-3 border border-gray-600 rounded-xl text-lg font-semibold hover:border-purple-600 transition"
            >
              Download App
            </a>
          </div>
        </div>

        {/* Right mockup */}
        <div className="relative w-[340px] h-[680px] bg-black border-[12px] border-gray-700 rounded-[40px] shadow-[0_0_80px_rgba(109,40,217,0.4)] overflow-hidden">
          {/* Notch Ponsel */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>

          {/* Konten Layar Ponsel */}
          <div className="absolute inset-0 p-4 text-white z-10 bg-black">
            {/* 9:41 Status Bar */}
            <div className="flex justify-between items-center text-xs pt-1 mb-4 text-gray-200 font-semibold">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <span>📶</span> <span className="text-sm font-light">🔋</span>
              </div>
            </div>

            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-black -z-10" />
          </div>
        </div>
      </section>
    );
  };

  return <PhoneMockup />;
}

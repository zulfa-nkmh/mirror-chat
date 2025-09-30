import { Battery, Wifi, SignalHigh } from "lucide-react";

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
          <div className="absolute inset-0 p-4 text-white z-10 bg-black flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-xs pt-1 mb-2 text-gray-200 font-semibold">
              <span>9:41</span>
              <div className="flex items-center space-x-2">
                <SignalHigh size={14} />
                <Wifi size={14} />
                <Battery size={14} className="animate-pulse text-green-400" /> {/* <- di sini */}
              </div>
            </div>

            {/* Header Aplikasi */}
            <div className="flex justify-between items-center mb-6 text-lg">
              <span className="text-gray-400 font-light">{'<'}</span>
              <span className="font-semibold text-white">Maestro AI</span>
              <span className="text-gray-400 font-light">ⓘ</span>
            </div>

            {/* Konten Utama */}
            <div className="flex flex-col items-center">
              {/* Logo Maestro Glow */}
              <div className="flex justify-center items-center h-36">
                <div className="relative w-28 h-28 flex justify-center items-center">
                  <div className="absolute w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-40"></div>
                  <div className="relative w-20 h-20 bg-purple-600 rounded-2xl flex justify-center items-center transform rotate-45">
                    <div className="w-10 h-10 bg-white rounded-full blur-sm opacity-20 absolute -z-10"></div>
                    <div className="w-16 h-16 bg-purple-400 rounded-full transform -rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* Pesan */}
              <div className="text-center mb-6 mt-4">
                <p className="text-2xl font-bold">Hello I'm Maestro</p>
                <p className="text-sm text-gray-400">Your AI digital Partners</p>
              </div>

              {/* Kartu Konten Interaktif */}
              <div className="space-y-4 w-full">
                <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700/50">
                  <p className="font-semibold text-base mb-1">How to Create Application</p>
                  <p className="text-xs text-gray-400">
                    Your application to Mangcoding has been sent successfully.
                  </p>
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    ↗
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700/50">
                    <p className="font-semibold text-base mb-1">Create Prompt For Generate AI</p>
                    <p className="text-xs text-gray-400">Your application to Mangcoding has been sent.</p>
                    <span className="absolute right-4 top-4 text-gray-400 text-sm">↗</span>
                  </div>
                  <div className="relative bg-gray-900 p-4 rounded-xl border border-gray-700/50">
                    <p className="font-semibold text-base mb-1">Create Video for Motion</p>
                    <p className="text-xs text-gray-400">Your application to Mangcoding has been sent.</p>
                    <span className="absolute right-4 top-4 text-gray-400 text-sm">↗</span>
                  </div>
                </div>
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

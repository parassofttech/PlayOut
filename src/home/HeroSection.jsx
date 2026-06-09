import { Link } from "react-router-dom";
import { Gamepad2, Trophy, Users, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050816]">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-6">
              <Gamepad2 size={18} />
              Ultimate Gaming Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Play
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Unlimited{" "}
              </span>
              Games Online
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-xl">
              Discover hundreds of exciting games including Racing,
              Action, Sports, Puzzle, Arcade and more. Play instantly
              without downloads.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/games"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition"
              >
                <Play size={20} />
                Play Now
              </Link>

              <Link
                to="/leaderboard"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                View Leaderboard
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <h3 className="text-3xl font-black text-cyan-400">
                  500+
                </h3>
                <p className="text-gray-400 text-sm">
                  Games
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-purple-400">
                  1M+
                </h3>
                <p className="text-gray-400 text-sm">
                  Players
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-pink-400">
                  24/7
                </h3>
                <p className="text-gray-400 text-sm">
                  Fun
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200"
                alt="Gaming"
                className="w-full h-[450px] object-cover rounded-2xl"
              />

              {/* Floating Card 1 */}
              <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-400" />
                  <div>
                    <h4 className="font-bold">
                      Top Rank
                    </h4>
                    <p className="text-sm text-gray-400">
                      #1 Player
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <Users className="text-cyan-400" />
                  <div>
                    <h4 className="font-bold">
                      Live Players
                    </h4>
                    <p className="text-sm text-gray-400">
                      12,845 Online
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
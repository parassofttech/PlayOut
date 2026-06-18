import { Link } from "react-router-dom";
import {
  Trophy,
  Gamepad2,
  Brain,
  Zap,
  Target,
  Car,
  Swords,
  Dice6,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    title: "Racing",
    icon: Car,
    color: "from-cyan-500 to-blue-600",
    games: 3,
    path: "/games/racing",
  },
  {
    title: "Action",
    icon: Swords,
    color: "from-red-500 to-orange-500",
    games: 4,
    path: "/games/action",
  },
  {
    title: "Puzzle",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    games: 5,
    path: "/games/puzzle",
  },
  {
    title: "Arcade",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    games: 4,
    path: "/games/arcade",
  },
  {
    title: "Sports",
    icon: Trophy,
    color: "from-green-500 to-emerald-600",
    games: 6,
    path: "/games/sports",
  },
  {
    title: "Strategy",
    icon: Target,
    color: "from-indigo-500 to-purple-600",
    games: 6,
    path: "/games/strategy",
  },
  {
    title: "Multiplayer",
    icon: Gamepad2,
    color: "from-pink-500 to-rose-500",
    games: 5,
    path: "/games/multiplayer",
  },
  
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm">
            🎮 Browse Game Categories
          </span>

          <h1 className="mt-6 text-4xl md:text-7xl font-black">
            Explore
            <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              {" "}
              Categories
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Discover hundreds of exciting games across different categories.
            Find your next favorite game and start playing instantly.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 text-center backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-black text-cyan-400">
              33+
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Games
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 text-center backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-black text-purple-400">
              8
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Categories
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 text-center backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-black text-pink-400">
              100K+
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Players
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-3 transition-all duration-500"
              >
                {/* Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-20 transition`}
                />

                <div className="relative p-6 md:p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-r ${category.color} flex items-center justify-center`}
                  >
                    <Icon size={32} />
                  </div>

                  <h3 className="mt-6 text-xl md:text-2xl font-bold">
                    {category.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {category.games} Games
                  </p>

                  <div className="flex items-center gap-2 mt-6 text-cyan-400 font-semibold">
                    Explore
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-2 transition"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-[35px] overflow-hidden border border-white/10 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl">
          <div className="p-8 md:p-14 text-center">
            <h2 className="text-3xl md:text-5xl font-black">
              🚀 Ready To Play?
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Explore different categories and enjoy the best online games
              anytime, anywhere.
            </p>

            <Link
              to="/games"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition"
            >
              Browse Games
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
import { Link } from "react-router-dom";
import {
  Star,
  Users,
  Play,
  Trophy,
  Heart,
  Flame,
  ChevronRight,
} from "lucide-react";

const games = [
  {
    id: "car-racing",
    title: "Car Racing Pro",
    category: "Racing",
    rating: 4.9,
    players: "25K+",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d?w=1200",
    trending: true,
  },
  {
    id: "zombi-attack",
    title: "Zombie Attack",
    category: "Action",
    rating: 4.8,
    players: "18K+",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
    trending: true,
  },
  {
    id: 3,
    title: "Football Stars",
    category: "Sports",
    rating: 4.7,
    players: "12K+",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
  },
  {
    id: "puzzle",
    title: "Puzzle Master",
    category: "Puzzle",
    rating: 4.9,
    players: "15K+",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
  },
  {
    id: 5,
    title: "Space Adventure",
    category: "Adventure",
    rating: 4.8,
    players: "20K+",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200",
  },
  {
    id: 6,
    title: "Sniper Elite",
    category: "Shooting",
    rating: 4.9,
    players: "30K+",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",
  },
];

const PopularGame = () => {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              Most Played Games
            </span>

            <h2 className="mt-5 text-4xl md:text-6xl font-black text-white">
              Popular
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Games
              </span>
            </h2>
          </div>

          <button className="mt-6 md:mt-0 flex items-center gap-2 text-cyan-400 font-bold hover:gap-4 transition-all">
            View All Games
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Featured Game */}
        <div className="relative overflow-hidden rounded-[35px] mb-10 group border border-white/10">
          <img
            src={games[0].image}
            alt={games[0].title}
            className="w-full h-[500px] object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute left-10 bottom-10 max-w-xl">
            <div className="flex gap-3 mb-4">
              <span className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold flex items-center gap-2">
                <Flame size={16} />
                Trending
              </span>

              <span className="px-4 py-2 rounded-full bg-cyan-500 text-white text-sm font-bold">
                #{1}
              </span>
            </div>

            <h3 className="text-5xl font-black text-white">
              {games[0].title}
            </h3>

            <p className="mt-4 text-gray-300">
              Experience high-speed racing action with realistic
              graphics and competitive multiplayer gameplay.
            </p>

            <div className="flex gap-6 mt-6">
              <span className="flex items-center gap-2 text-yellow-400">
                <Star size={18} fill="currentColor" />
                {games[0].rating}
              </span>

              <span className="flex items-center gap-2 text-cyan-400">
                <Users size={18} />
                {games[0].players}
              </span>
            </div>

            <Link
              to="/car-racing"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              <Play size={18} />
              Play Now
            </Link>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {games.slice(1).map((game, index) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-52 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* HEART */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 flex items-center justify-center text-white">
          <Heart size={18} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6">
        <span className="text-cyan-400 text-xs sm:text-sm font-semibold">
          {game.category}
        </span>

        <h3 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-white">
          {game.title}
        </h3>

        <div className="flex justify-between mt-3 sm:mt-5">
          <span className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
            <Users size={16} />
            {game.players}
          </span>
        </div>

        <Link
          to={game.id}
          className="inline-flex items-center justify-center gap-2 mt-5 w-full px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition text-sm sm:text-base"
        >
          <Play size={16} />
          Play Now
        </Link>
      </div>
    </div>
  ))}
</div>

        {/* Bottom Banner */}
        <div className="mt-20 rounded-[35px] overflow-hidden border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl">
          <div className="p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                🚀 Ready To Play?
              </h3>

              <p className="mt-3 text-gray-400">
                Join thousands of players and start your gaming
                journey today.
              </p>
            </div>

            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition">
              Explore Games
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularGame;
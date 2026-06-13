import { Link, useNavigate } from "react-router-dom";
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
      "https://www.topgear.com/sites/default/files/news-listicle/image/2023/01/2.jpeg",
    trending: true,
  },
  {
    id: "cricket-game",
    title: "Cricket Chalanges",
    category: "sports",
    rating: 4.8,
    players: "18K+",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
    trending: true,
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    category: "Multiplayer",
    rating: 4.7,
    players: "12K+",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlsMRhVlu0fqALSqBqeVaZqQVjFU2acKpHA&s",
  },
  {
    id: "puzzle-game",
    title: "Puzzle Master",
    category: "Puzzle",
    rating: 4.9,
    players: "15K+",
    image:
      "https://play-lh.googleusercontent.com/xyikFZEzzKVQqOsz9Yty5sejBxj3ZQKE6Dl_YgPmmOBaecaNkFg3D440EbdUb6o9PlW0ofnXssw_5XGmcc-tsg",
  },
  {
    id: "tic-tac-toe",
    title: " Tic Tac Toe",
    category: "Strategy",
    rating: 4.8,
    players: "20K+",
    image:
      "https://play-lh.googleusercontent.com/7-Fc-KeLDyyrUtGbg-cXsIBkLWTH6FxtDrEKjwtYgWfSPr7eKmNU9Mvjzb5I_rVuY_ec3sb1gwTxmqkEEOtO5g",
  },
  {
    id: "aim-trainer",
    title: "Aim Trainer",
    category: "Arcade",
    rating: 4.9,
    players: "10K+",
    image:
      "https://aimtrainer.io/img/photos/screen.png",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    category: "Strategy",
    rating: 4.9,
    players: "15K+",
    image:
      "https://www.bestschoolgames.com/_next/image?url=https%3A%2F%2Fadm.bestschoolgames.com%2Fuploads%2Femoji_memory_game_thumb_879ea8325e.png&w=3840&q=75",
  },
  {
    id: "color-sort-puzzle",
  title: "Color Sort Puzzle",
  category: "Puzzle",
  rating: 4.9,
  players: "20K+",
  image:
    "https://m.media-amazon.com/images/I/71RUFx+g5EL.png",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    category: "Arcade",
    rating: 4.9,
    players: "18K+",
    image:
      "https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg",
  },
  {
    id: "2048",
  title: "2048 Puzzle",
  category: "Puzzle",
  rating: 4.9,
  players: "30K+",
  image:
    "https://m.media-amazon.com/images/I/71EYDvwzkSL.png",
  },
];

const PopularGame = () => {

  const navigate = useNavigate()
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
        {/* Games Grid */}
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
  {games.slice(1).map((game, index) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition-all duration-500"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-44 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* HEART */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 flex items-center justify-center text-white">
          <Heart size={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-6">
        <span className="text-cyan-400 text-[11px] sm:text-sm font-semibold">
          {game.category}
        </span>

        <h3 className="mt-1 sm:mt-2 text-base sm:text-2xl font-bold text-white leading-tight">
          {game.title}
        </h3>

        <div className="flex justify-between mt-2 sm:mt-5">
          <span className="flex items-center gap-2 text-gray-300 text-xs sm:text-base">
            <Users size={14} />
            {game.players}
          </span>
        </div>

        <Link
          to={game.id}
          className="inline-flex items-center justify-center gap-2 mt-4 sm:mt-5 w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition text-xs sm:text-base"
        >
          <Play size={14} />
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

            <button onClick={()=>navigate('/games')} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition">
              Explore Games
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularGame;
import { Flame, Play, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const trendingGames = [
  {
    id: "car-racing",
    title: "Car Racing",
    image:
      "https://c.ndtvimg.com/2022-01/hbofdgmg_car_625x300_28_January_22.jpg",
    rating: 4.9,
    players: "25K+",
    category: "Racing",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    image:
      "https://play-lh.googleusercontent.com/7-Fc-KeLDyyrUtGbg-cXsIBkLWTH6FxtDrEKjwtYgWfSPr7eKmNU9Mvjzb5I_rVuY_ec3sb1gwTxmqkEEOtO5g",
    rating: 4.8,
    players: "18K+",
    category: "Action",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    image:
      "https://www.bestschoolgames.com/_next/image?url=https%3A%2F%2Fadm.bestschoolgames.com%2Fuploads%2Femoji_memory_game_thumb_879ea8325e.png&w=3840&q=75",
    rating: 4.7,
    players: "15K+",
    category: "Sports",
  },
  {
    id: "puzzle-game",
    title: "Puzzle Game",
    image:
      "https://play-lh.googleusercontent.com/xyikFZEzzKVQqOsz9Yty5sejBxj3ZQKE6Dl_YgPmmOBaecaNkFg3D440EbdUb6o9PlW0ofnXssw_5XGmcc-tsg",
    rating: 4.9,
    players: "12K+",
    category: "Puzzle",
  },
];

const TrendingGames = () => {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Flame className="text-orange-500" size={32} />
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Trending Games
          </h2>
        </div>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          Play the hottest and most popular games that gamers
          around the world are enjoying right now.
        </p>

        {/* Featured Big Card */}
        <div className="relative group mb-10 overflow-hidden rounded-3xl border border-white/10">
          <img
            src={trendingGames[0].image}
            alt={trendingGames[0].title}
            className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

          <div className="absolute bottom-10 left-10 max-w-xl">
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">
              #{1} Trending
            </span>

            <h3 className="text-5xl font-black text-white mt-4">
              {trendingGames[0].title}
            </h3>

            <div className="flex gap-6 mt-4 text-white">
              <span className="flex items-center gap-2">
                <Star className="text-yellow-400" size={18} />
                {trendingGames[0].rating}
              </span>

              <span className="flex items-center gap-2">
                <Users className="text-cyan-400" size={18} />
                {trendingGames[0].players}
              </span>
            </div>

            <Link
          to={trendingGames[0].id}
          className="inline-flex items-center justify-center gap-2 mt-5 w-full px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition text-sm sm:text-base"
        >
          <Play size={16} />
          Play Now
        </Link>
          </div>
        </div>

        {/* Small Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {trendingGames.slice(1).map((game, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold">
                  #{index + 2} Trending
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-2xl font-bold text-white">
                  {game.title}
                </h3>

                <div className="flex justify-between mt-3 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    ⭐ 
                  </span>

                  <span className="flex items-center gap-1">
                    👥 {game.players}
                  </span>
                </div>
                <Link
          to={game.id}
          className="inline-flex items-center justify-center gap-2 mt-5 w-full px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition text-sm sm:text-base"
        >
          Play Now
        </Link>

               
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-black text-cyan-400">
              500+
            </h3>
            <p className="text-gray-400">
              Games Available
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-black text-purple-400">
              1M+
            </h3>
            <p className="text-gray-400">
              Active Players
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-black text-pink-400">
              50+
            </h3>
            <p className="text-gray-400">
              Categories
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-black text-yellow-400">
              99%
            </h3>
            <p className="text-gray-400">
              Happy Gamers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;
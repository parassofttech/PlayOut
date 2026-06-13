import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  Play,
  Flame,
  Star,
  ChevronRight,
} from "lucide-react";

const racingGames = [
  {
    id: "car-racing",
    title: "Car Racing Pro",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d?w=1200",
    players: "25K+",
    rating: 4.9,
  },
  {
    id: "bike-racing",
    title: "Bike Racing",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200",
    players: "18K+",
    rating: 4.8,
  },
  {
    id: "drift-king",
    title: "Drift King",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
    players: "15K+",
    rating: 4.8,
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
    players: "30K+",
    rating: 4.9,
  },
];

const RacingGames = () => {
  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            🚗 High Speed Collection
          </span>

          <h1 className="mt-6 text-4xl md:text-7xl font-black text-white">
            Racing
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Games
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Experience thrilling races, crazy drifts, bike adventures,
            and endless runner challenges. Test your speed and become
            the ultimate champion.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative rounded-[35px] overflow-hidden border border-white/10 mb-16 group">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d?w=1200"
            alt="Racing"
            className="w-full h-[300px] md:h-[500px] object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 max-w-xl">
            <div className="flex gap-3 mb-4">
              <span className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold flex items-center gap-2">
                <Flame size={16} />
                Trending
              </span>

              <span className="px-4 py-2 rounded-full bg-cyan-500 text-white text-sm font-bold">
                #1 Racing
              </span>
            </div>

            <h2 className="text-3xl md:text-6xl font-black text-white">
              Car Racing Pro
            </h2>

            <p className="text-gray-300 mt-4">
              Race against opponents, dodge obstacles and become
              the fastest driver on the track.
            </p>

            <Link
              to="/car-racing"
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              <Play size={18} />
              Play Now
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Trophy className="mx-auto text-yellow-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">4+</h3>
            <p className="text-gray-400">Games</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Users className="mx-auto text-cyan-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">88K+</h3>
            <p className="text-gray-400">Players</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Star className="mx-auto text-yellow-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">4.9</h3>
            <p className="text-gray-400">Rating</p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {racingGames.map((game) => (
            <div
              key={game.id}
              className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:-translate-y-3 transition-all duration-500 backdrop-blur-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-40 md:h-52 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-4">
                <h3 className="text-white text-lg md:text-xl font-bold">
                  {game.title}
                </h3>

                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-cyan-400">
                    👥 {game.players}
                  </span>

                  <span className="text-yellow-400">
                    ⭐ {game.rating}
                  </span>
                </div>

                <Link
                  to={`/${game.id}`}
                  className="mt-4 w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
                >
                  <Play size={16} />
                  Play
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-[35px] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl">
          <div className="p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              🏁 Start Your Engine
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Choose your favorite racing game and challenge
              yourself to beat the highest score.
            </p>

            <Link
              to="/car-racing"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              Play Racing Games
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacingGames;
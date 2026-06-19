import { Link } from "react-router-dom";
import {
  Brain,
  Trophy,
  Users,
  Star,
  Play,
  ChevronRight,
  Crown,
  Flame,
} from "lucide-react";

const strategyGames = [
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    players: "35K+",
    rating: 4.9,
    image:
      "https://play-lh.googleusercontent.com/7-Fc-KeLDyyrUtGbg-cXsIBkLWTH6FxtDrEKjwtYgWfSPr7eKmNU9Mvjzb5I_rVuY_ec3sb1gwTxmqkEEOtO5g",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    players: "25K+",
    rating: 4.8,
    image:
      "https://www.bestschoolgames.com/_next/image?url=https%3A%2F%2Fadm.bestschoolgames.com%2Fuploads%2Femoji_memory_game_thumb_879ea8325e.png&w=3840&q=75",
  },
  {
    id: "2048",
    title: "2048",
    players: "22K+",
    rating: 4.8,
    image:
      "https://m.media-amazon.com/images/I/71EYDvwzkSL.png",
  },
  {
    id: "typing-race",
    title: "Typing Race",
    players: "18K+",
    rating: 4.7,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20200123024556/out-full2-min.gif",
  },
  {
    id: "dice-game",
    title: "Dice Game",
    players: "20K+",
    rating: 4.8,
    image:
      "https://play-lh.googleusercontent.com/8kugXgA2GzLTeGwtm9fkeUwcvx-PZuvt9b5tr3b8PAy6uizs9JSrvCUxvoTfXQfi0ZKuzEktTdrJbYEXTleKgQ",
  },
  {
    id: "guess-number",
    title: "Guess Number",
    players: "15K+",
    rating: 4.7,
    image:
      "https://i.pinimg.com/564x/2e/e9/62/2ee9625a733381b5f2cfb4123ecb7d3d.jpg",
  },
  
];

function StrategyGames() {
  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            🧠 Smart Thinking Collection
          </span>

          <h1 className="mt-6 text-4xl md:text-7xl font-black text-white">
            Strategy
            <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Games
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Think ahead, plan every move and challenge your mind with
            strategy-based games that reward intelligence and patience.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-[35px] border border-white/10 mb-16 group">
          <img
            src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=1200"
            alt="Chess"
            className="w-full  md:h-[500%] object-cover group-hover:scale-110 transition duration-700"

            style={{
              height:300
              
            }}
          />

          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

          <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 max-w-xl">
            <div className="flex gap-3 mb-4">
              <span className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold flex items-center gap-2">
                <Flame size={16} />
                Trending
              </span>

              <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-bold">
                #1 Strategy
              </span>
            </div>

            <h2 className="text-3xl md:text-6xl font-black text-white">
              Chess Master
            </h2>

            <p className="text-gray-300 mt-4">
              Outsmart your opponent, control the board and achieve checkmate.
            </p>

            <Link
              to="/chess"
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              <Play size={18} />
              Play Now
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Crown className="mx-auto text-yellow-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">6+</h3>
            <p className="text-gray-400">Games</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Users className="mx-auto text-cyan-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">135K+</h3>
            <p className="text-gray-400">Players</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Star className="mx-auto text-yellow-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">4.9</h3>
            <p className="text-gray-400">Rating</p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {strategyGames.map((game) => (
            <div
              key={game.id}
              className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-3 transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-40 md:h-56 object-cover group-hover:scale-110 transition duration-700"
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
                  className="mt-4 w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-bold hover:scale-105 transition"
                >
                  <Play size={16} />
                  Play
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-[35px] border border-white/10 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl">
          <div className="p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              ♟️ Ready To Outsmart Everyone?
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Use your intelligence, plan your moves carefully and become a strategy champion.
            </p>

            <Link
              to="/chess"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              Start Playing
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StrategyGames;
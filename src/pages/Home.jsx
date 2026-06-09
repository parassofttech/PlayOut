import {
  Gamepad2,
  Trophy,
  Zap,
  Star,
  Play,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GameDashboard from "./GameDashboard";

const popularGames = [
  {
    id: 1,
    title: "Car Racing",
    name: "car-racing",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
  },
  {
    id: 2,
    title: "Battle Arena",
    name: "battle-arena",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
  },
  {
    id: 3,
    title: "Zombie Attack",
    name: "zombie-attack",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  },
  {
    id: 4,
    title: "Football Pro",
    name: "football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    name: "tictactoe",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 6,
    title: "Memory Game",
    name: "memory-game",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    name: "tictactoe",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 5,
    title: "Tic Tac Toe",
    name: "tictactoe",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
];

 function Home() {
  const navigate = useNavigate()

  const handleplay =()=>{
    navigate('/tictactoe')
  }
  return (
    <div className="bg-[#050816] text-white min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm">
                🎮 #1 Online Gaming Platform
              </span>

              <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
                Play
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Unlimited
                </span>
                <br />
                Games Online
              </h1>

              <p className="text-gray-400 text-lg mt-6 max-w-xl">
                Enjoy thousands of exciting games. Racing, Action,
                Adventure, Puzzle, Sports and many more — all in one place.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition">
                  <Play size={20} />
                  Play Now
                </button>

                <button className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition">
                  Explore Games
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"
                alt="gaming"
                className="rounded-3xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-4xl font-bold text-cyan-400">500+</h2>
            <p className="text-gray-400">Games</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-4xl font-bold text-purple-400">50K+</h2>
            <p className="text-gray-400">Players</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-4xl font-bold text-pink-400">1M+</h2>
            <p className="text-gray-400">Game Plays</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h2 className="text-4xl font-bold text-green-400">24/7</h2>
            <p className="text-gray-400">Online</p>
          </div>

        </div>
      </section>
      <GameDashboard/>

      {/* POPULAR GAMES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold">
            Popular Games
          </h2>

          <button className="flex items-center gap-2 text-cyan-400">
            View All
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularGames.map((game) => (
            <div
              key={game.id}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500 transition"
            >
              <img
                src={game.image}
                alt={game.title}
                className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="p-5">
                <h3 className="font-bold text-xl">
                  {game.title}
                </h3>

                <button
                onClick={()=> navigate(`/${game.name}`)} className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                  Play Game
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Game Categories
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Action",
            "Adventure",
            "Racing",
            "Sports",
            "Puzzle",
            "Arcade",
            "Shooting",
            "Strategy",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 text-center hover:scale-105 transition"
            >
              <Gamepad2 className="mx-auto mb-4 text-cyan-400" />
              <h3 className="font-bold text-lg">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 p-8 rounded-2xl">
            <Zap className="text-yellow-400 mb-4" size={40} />
            <h3 className="font-bold text-2xl mb-2">
              Fast Performance
            </h3>
            <p className="text-gray-400">
              Lightning-fast gaming experience without downloads.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl">
            <Trophy className="text-purple-400 mb-4" size={40} />
            <h3 className="font-bold text-2xl mb-2">
              Leaderboards
            </h3>
            <p className="text-gray-400">
              Compete with players around the world.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl">
            <Star className="text-cyan-400 mb-4" size={40} />
            <h3 className="font-bold text-2xl mb-2">
              Top Rated Games
            </h3>
            <p className="text-gray-400">
              Discover the highest-rated games instantly.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-5xl font-black">
          Ready To Play?
        </h2>

        <p className="text-gray-400 mt-4">
          Join thousands of gamers and start your adventure today.
        </p>

        <button className="mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-lg hover:scale-105 transition">
          Start Playing
        </button>
      </section>
      
    </div>
  );
}

export default Home
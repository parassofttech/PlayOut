import { Link } from "react-router-dom";
import {
  Gamepad2,
  Users,
  Trophy,
  Star,
  Play,
  ChevronRight,
  Zap,
} from "lucide-react";

const arcadeGames = [
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    players: "30K+",
    rating: 4.8,
    image:
      "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25617319/flappy_bird_new.png?quality=90&strip=all&crop=0,30.334004392387,100,37.408491947291",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    players: "25K+",
    rating: 4.9,
    image:
      "https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg",
  },
  {
    id: "brick-breaker",
    title: "Brick Breaker",
    players: "22K+",
    rating: 4.8,
    image:
      "https://play-lh.googleusercontent.com/BSGfo6oFgwtvM_iHT8OUu0LA1dTOeGJGhq74o_TKpX3GfqlwQoeKa7pjHw0Bc3GwgS1wy6rIPEJau6saDox1Iw",
  },
  {
    id: "stack-tower",
    title: "Stack Tower",
    players: "18K+",
    rating: 4.7,
    image:
      "https://store-images.s-microsoft.com/image/apps.926.13590528973194609.1e6865fb-876b-4987-9759-1f3a504243fa.d391da9c-8bc6-4d85-be58-c2d430140209",
  },
 
  
];

const ArcadeGames = () => {
  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-500/10 blur-3xl rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
            🕹️ Classic & Fun Collection
          </span>

          <h1 className="mt-6 text-4xl md:text-7xl font-black text-white">
            Arcade
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {" "}Games
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Enjoy classic arcade fun with endless challenges,
            fast reflexes and addictive gameplay.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-[35px] border border-white/10 mb-16 group">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200"
            alt="Arcade Games"
            className="w-full h-[300px] md:h-[500px] object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 max-w-xl">
            <span className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-bold">
              #1 Arcade
            </span>

            <h2 className="text-3xl md:text-6xl font-black text-white mt-4">
              Flappy Bird
            </h2>

            <p className="text-gray-300 mt-4">
              Fly through obstacles and beat your high score in this arcade classic.
            </p>

            <Link
              to="/flappy-bird"
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold hover:scale-105 transition"
            >
              <Play size={18} />
              Play Now
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Gamepad2 className="mx-auto text-yellow-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">4+</h3>
            <p className="text-gray-400">Games</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Users className="mx-auto text-cyan-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">142K+</h3>
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
          {arcadeGames.map((game) => (
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
                  className="mt-4 w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold hover:scale-105 transition"
                >
                  <Play size={16} />
                  Play
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-[35px] border border-white/10 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-xl">
          <div className="p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              ⚡ Ready For Arcade Fun?
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Challenge your reflexes, break records and enjoy
              endless entertainment with arcade classics.
            </p>

            <Link
              to="/flappy-bird"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold hover:scale-105 transition"
            >
              Start Playing
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArcadeGames;
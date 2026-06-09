import { useParams } from "react-router-dom";
import { Play, Star, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const gamesData = [
  {
    id: "1",
    title: "Car Racing 3D",
    category: "Racing",
    rating: 4.9,
    players: "25K+",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d?w=1000",
    description:
      "High-speed racing game with realistic cars, tracks and intense competition.",
    url: "https://example.com/game1",
  },
  {
    id: "2",
    title: "Battle Arena",
    category: "Action",
    rating: 4.8,
    players: "18K+",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000",
    description:
      "Fight in epic arenas with powerful weapons and multiplayer battles.",
    url: "https://example.com/game2",
  },
];

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = gamesData.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <h2 className="text-3xl font-bold">Game Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        {/* Info */}
        <div>
          <span className="px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm">
            {game.category}
          </span>

          <h1 className="text-5xl font-black mt-4">
            {game.title}
          </h1>

          <p className="text-gray-400 mt-4 leading-relaxed">
            {game.description}
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={18} />
              {game.rating}
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-cyan-400" size={18} />
              {game.players}
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={() => window.open(game.url, "_blank")}
            className="mt-8 flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition"
          >
            <Play size={20} />
            Play Now
          </button>
        </div>
      </section>

      {/* Game Frame Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6">
          Play Game
        </h2>

        <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src={game.url}
            title={game.title}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
};

export default GameDetails;
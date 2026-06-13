import { Link } from "react-router-dom";
import {
  Brain,
  Trophy,
  Users,
  Star,
  Play,
  ChevronRight,
  Puzzle,
} from "lucide-react";

const puzzleGames = [
  {
    id: "sudoku",
    title: "Sudoku",
    players: "20K+",
    rating: 4.9,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0lGqbqYk0KqscIQIx7DHtnsMliw2rmN4sg&s",
  },
  {
    id: "sliding-puzzle",
    title: "Sliding Puzzle",
    players: "15K+",
    rating: 4.8,
    image:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230210105928/Slide_game.gif",
  },
  {
    id: "color-sort-puzzle",
    title: "Color Sort Puzzle",
    players: "18K+",
    rating: 4.8,
    image:
      "https://m.media-amazon.com/images/I/71RUFx+g5EL.png",
  },
  {
    id: "2048",
    title: "2048",
    players: "25K+",
    rating: 4.9,
    image:
      "https://m.media-amazon.com/images/I/71EYDvwzkSL.png",
  },
  
  {
    id: "puzzle-game",
    title: "Puzzle Master",
    players: "16K+",
    rating: 4.7,
    image:
      "https://play-lh.googleusercontent.com/xyikFZEzzKVQqOsz9Yty5sejBxj3ZQKE6Dl_YgPmmOBaecaNkFg3D440EbdUb6o9PlW0ofnXssw_5XGmcc-tsg",
  },
];

const PuzzleGames = () => {
  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
            🧠 Brain Challenge Collection
          </span>

          <h1 className="mt-6 text-4xl md:text-7xl font-black text-white">
            Puzzle
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {" "}Games
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Train your brain with logic challenges, memory tests,
            number puzzles and mind-bending games.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-[35px] border border-white/10 mb-16 group">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200"
            alt="Puzzle"
            className="w-full h-[300px] md:h-[500px] object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 max-w-xl">
            <span className="px-4 py-2 rounded-full bg-purple-500 text-white text-sm font-bold">
              #1 Puzzle
            </span>

            <h2 className="text-3xl md:text-6xl font-black text-white mt-4">
              Sudoku Master
            </h2>

            <p className="text-gray-300 mt-4">
              Solve challenging Sudoku puzzles and improve your logic skills.
            </p>

            <Link
              to="/sudoku"
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition"
            >
              <Play size={18} />
              Play Now
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Puzzle className="mx-auto text-purple-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">5+</h3>
            <p className="text-gray-400">Games</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Users className="mx-auto text-cyan-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">116K+</h3>
            <p className="text-gray-400">Players</p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-xl">
            <Star className="mx-auto text-yellow-400" size={35} />
            <h3 className="text-white text-3xl font-black mt-3">4.8</h3>
            <p className="text-gray-400">Rating</p>
          </div>

        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

          {puzzleGames.map((game) => (
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
                  className="mt-4 w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition"
                >
                  <Play size={16} />
                  Play
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-20 rounded-[35px] border border-white/10 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-fuchsia-500/10 backdrop-blur-xl">
          <div className="p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              🧠 Ready To Test Your Brain?
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Challenge yourself with puzzles that improve memory,
              logic and problem-solving skills.
            </p>

            <Link
              to="/sudoku"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition"
            >
              Start Solving
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PuzzleGames;
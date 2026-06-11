import { useState } from "react";
import GameCard from "../components/GameCard";

const gamesData = [
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
    id: "guess-number",
    title: "Guess Number",
    category: "Guess Number",
    rating: 4.9,
    players: "20K+",
    image:
      "https://i.pinimg.com/564x/2e/e9/62/2ee9625a733381b5f2cfb4123ecb7d3d.jpg",
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
    id: "quiz-game",
    title: "Quiz Game",
    category: "Strategy",
    rating: 4.9,
    players: "10K+",
    image:
      "https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg",
  },
   {
    id: "car-racing",
    title: "Car Racing Pro",
    category: "Racing",
    rating: 4.9,
    players: "25K+",
    image:
      "https://www.topgear.com/sites/default/files/news-listicle/image/2023/01/2.jpeg",
  
  },
  {
    id: "dice-game",
    title: "Dice Game",
    category: "Strategy",
    rating: 4.8,
    players: "18K+",
    image:
      "https://play-lh.googleusercontent.com/8kugXgA2GzLTeGwtm9fkeUwcvx-PZuvt9b5tr3b8PAy6uizs9JSrvCUxvoTfXQfi0ZKuzEktTdrJbYEXTleKgQ",
    trending: true,
  },
];

const categories = [
  "All",
  "Action",
  "Racing",
  "Sports",
  "Puzzle",
  "Arcade",
  "Adventure",
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGames = gamesData.filter((game) => {
    if (activeCategory === "All") return true;
    return game.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black">
            Game
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Categories
            </span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore games by categories like Action, Racing, Sports,
            Puzzle, Arcade and Adventure.
          </p>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            {activeCategory} Games
          </h2>

          <span className="text-gray-400">
            {filteredGames.length} Games
          </span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGames.map((game) => (
              <div onClick={ ()=>navigate(`/${game.id}`)}>
                <GameCard
                key={game.id}
                title={game.title}
                image={game.image}
                category={game.category}
                rating={game.rating}
                players={game.players}
              />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-3xl font-bold mb-3">
              No Games Found
            </h3>
            <p className="text-gray-400">
              Try selecting another category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Categories;
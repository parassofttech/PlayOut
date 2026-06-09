import { useState } from "react";
import GameCard from "../components/GameCard";

const gamesData = [
  {
    id: 1,
    title: "Car Racing 3D",
    category: "Racing",
    rating: 4.9,
    players: "25K+",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d?w=1000",
  },
  {
    id: 2,
    title: "Battle Arena",
    category: "Action",
    rating: 4.8,
    players: "18K+",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000",
  },
  {
    id: 3,
    title: "Football Pro",
    category: "Sports",
    rating: 4.7,
    players: "12K+",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000",
  },
  {
    id: 4,
    title: "Puzzle Master",
    category: "Puzzle",
    rating: 4.6,
    players: "9K+",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1000",
  },
  {
    id: 5,
    title: "Zombie Attack",
    category: "Action",
    rating: 4.9,
    players: "30K+",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000",
  },
  {
    id: 6,
    title: "Speed Drift",
    category: "Racing",
    rating: 4.8,
    players: "15K+",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000",
  },
  {
    id: 7,
    title: "Arcade Blast",
    category: "Arcade",
    rating: 4.5,
    players: "8K+",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000",
  },
  {
    id: 8,
    title: "Adventure Quest",
    category: "Adventure",
    rating: 4.9,
    players: "22K+",
    image:
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=1000",
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
              <GameCard
                key={game.id}
                title={game.title}
                image={game.image}
                category={game.category}
                rating={game.rating}
                players={game.players}
              />
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
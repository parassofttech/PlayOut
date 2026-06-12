import { useState } from "react";
import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const gamesData = [
  {
    id: "car-racing",
    title: "Car Racing ",
    category: "Racing",
    rating: 4.9,
    players: "25K+",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSTvZMdYsgUwZzLy_HM2UCaUe5cq9NxSv0-g&s",
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
  id: "stack-tower",
  title: "Stack Tower",
  category: "Arcade",
  rating: 4.8,
  players: "28K+",
  image:
    "https://images.unsplash.com/photo-1520975958225-3f61d8b1f2d8?w=1200",
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
  id: "cricket-game",
  title: "Cricket Challenge",
  category: "Sports",
  rating: 4.8,
  players: "20K+",
  image:
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
},
{
  id: "drift-king",
  title: "Drift King",
  category: "Racing",
  rating: 4.9,
  players: "25K+",
  image:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d?w=1200",
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
  id: "sudoku",
  title: "Sudoku Puzzle",
  category: "Puzzle",
  rating: 4.8,
  players: "18K+",
  image:
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200",
},
{
  id: "brick-breaker",
  title: "Brick Breaker",
  category: "Arcade",
  rating: 4.8,
  players: "45K+",
  image:
    "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200",
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
    "https://images.unsplash.com/photo-1607082349566-187342175e2d?w=1200",
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
  id: "flappy-bird",
  title: "Flappy Bird",
  category: "Arcade",
  rating: 4.8,
  players: "35K+",
  image:
    "https://images.unsplash.com/photo-1520975928316-51bff5e88f9d?w=1200",
},
  {
  id: "bike-racing",
  title: "Bike Racing",
  category: "Racing",
  rating: 4.8,
  players: "22K+",
  image:
    "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=1200",
},
{
  id: "2048",
  title: "2048 Puzzle",
  category: "Puzzle",
  rating: 4.9,
  players: "30K+",
  image:
    "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200",
},
{
  id: "sliding-puzzle",
  title: "Sliding Puzzle",
  category: "Puzzle",
  rating: 4.8,
  players: "16K+",
  image:
    "https://images.unsplash.com/photo-1581368129682-e2b5e5c2f9b2?w=1200",
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

const Games = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  

  const category =
  searchParams.get("category");
  
  const filteredGames = gamesData.filter((game) => {
    const matchSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      activeCategory === "All" ||
      game.category === activeCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-black text-center">
            Explore Amazing
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Games
            </span>
          </h1>

          <p className="text-center text-gray-400 mt-5 max-w-2xl mx-auto">
            Discover action, racing, sports, puzzle and adventure
            games. Play instantly without downloads.
          </p>

          <div className="flex justify-center mt-10">
            <SearchBar onSearch={setSearch} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Games Collection
          </h2>

          <span className="text-gray-400">
            {filteredGames.length} Games Found
          </span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGames.map((game, index) => (
              <div  onClick={ ()=>navigate(`/${game.id}`)}>
                <GameCard
                
                key={index}
                title={game.title}
                image={game.image}
                category={game.category}
                rating={game.rating}
                players={game.players}
                
              />
              
              </div>
              
            )
          )
            }
           
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-3xl font-bold mb-3">
              No Games Found
            </h3>

            <p className="text-gray-400">
              Try another search or category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Games;
import { useState } from "react";
import {
  Car,
  Trophy,
  Puzzle,
  Sword,
  Target,
  Rocket,
  Brain,
  Gamepad2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "car-racing",
    name: "Racing",
    icon: Car,
    color: "from-cyan-500 to-blue-600",
    games: 120,
    description: "High speed racing adventures",
  },
  {
    id: "action",
    name: "Action",
    icon: Sword,
    color: "from-red-500 to-orange-500",
    games: 95,
    description: "Fight and survive challenges",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
    games: 80,
    description: "Football, Cricket & More",
  },
  {
    id: "puzzle",
    name: "Puzzle",
    icon: Puzzle,
    color: "from-purple-500 to-pink-500",
    games: 150,
    description: "Train your brain",
  },
  {
    id: "shooting",
    name: "Shooting",
    icon: Target,
    color: "from-yellow-500 to-orange-500",
    games: 75,
    description: "FPS and sniper games",
  },
  {
    id: "arcade",
    name: "Arcade",
    icon: Rocket,
    color: "from-indigo-500 to-violet-500",
    games: 110,
    description: "Classic arcade fun",
  },
  {
    id: "strategy",
    name: "Strategy",
    icon: Brain,
    color: "from-pink-500 to-rose-500",
    games: 65,
    description: "Plan and conquer",
  },
  {
    id: "multiplayer",
    name: "Multiplayer",
    icon: Gamepad2,
    color: "from-teal-500 to-cyan-500",
    games: 90,
    description: "Explore new worlds",
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] =
    useState(categories[0]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // category page
    navigate(`/games/${category.id}`);
  };

  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            Game Categories
          </span>

          <h2 className="mt-5 text-5xl font-black text-white">
            Explore Games By
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {" "}
              Category
            </span>
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Select your favorite category and start
            playing instantly.
          </p>
        </div>

        {/* Featured Category */}
        <div
          className={`mb-12 rounded-3xl p-8 border border-white/10 bg-gradient-to-r ${activeCategory.color}`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-4xl font-black text-white">
                {activeCategory.name}
              </h3>

              <p className="mt-3 text-white/90">
                {activeCategory.description}
              </p>

              <p className="mt-3 text-lg font-bold text-white">
                {activeCategory.games}+ Games Available
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/games?category=${activeCategory.id}`
                )
              }
              className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition"
            >
              Play Now
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                onClick={() =>
                  handleCategoryClick(category)
                }
                className={`group cursor-pointer relative rounded-3xl overflow-hidden border transition-all duration-500
                ${
                  activeCategory.id === category.id
                    ? "border-cyan-400 scale-105"
                    : "border-white/10"
                }`}
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${category.color} transition`}
                />

                <div className="relative p-7">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-r ${category.color}`}
                  >
                    <Icon
                      size={38}
                      className="text-white"
                    />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-gray-400 text-sm">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold">
                      Play Games
                    </span>

                    <span className="text-white group-hover:translate-x-2 transition">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
       
      </div>
    </section>
  );
};

export default CategoriesSection;
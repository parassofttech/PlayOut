import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Target, Smile, Puzzle, Sparkles, ArrowUpRight } from "lucide-react";

function CategoriesSection() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Brain Games",
      desc: "Quiz, Memory, Guess games",
      path: "/?category=brain",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/20",
      icon: <Brain className="text-purple-400 group-hover:text-purple-300 w-6 h-6" />,
    },
    {
      name: "Action Games",
      desc: "Racing, Zombie, Reflex",
      path: "/?category=action",
      color: "from-blue-500 to-cyan-400",
      glow: "shadow-blue-500/20",
      icon: <Zap className="text-blue-400 group-hover:text-blue-300 w-6 h-6" />,
    },
    {
      name: "Skill Games",
      desc: "Aim Trainer, Timing games",
      path: "/?category=skill",
      color: "from-red-500 to-orange-400",
      glow: "shadow-red-500/20",
      icon: <Target className="text-red-400 group-hover:text-red-300 w-6 h-6" />,
    },
    {
      name: "Fun Games",
      desc: "Dice, RPS, casual games",
      path: "/?category=fun",
      color: "from-green-500 to-emerald-400",
      glow: "shadow-green-500/20",
      icon: <Smile className="text-green-400 group-hover:text-green-300 w-6 h-6" />,
    },
    {
      name: "Puzzle Games",
      desc: "Sliding puzzles, logic games",
      path: "/?category=puzzle",
      color: "from-amber-500 to-orange-500",
      glow: "shadow-amber-500/20",
      icon: <Puzzle className="text-amber-400 group-hover:text-amber-300 w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full py-16 px-6 relative bg-[#070913] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg shadow-black/40">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Discover Arena</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Game{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Select a dimension to test your reflexes, strategy, or core gaming skills.
          </p>
        </div>

        {/* Normal Grid without motion.div */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(cat.path)}
              className={`group relative cursor-pointer p-6 rounded-[2rem] bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/5 hover:border-white/20 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl ${cat.glow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.03] rounded-[2rem] transition-opacity duration-500 pointer-events-none`} />

              <div className="absolute top-5 right-5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <ArrowUpRight size={16} />
              </div>

              <div className="w-12 h-12 rounded-xl bg-slate-800/50 group-hover:bg-slate-800 border border-white/5 flex items-center justify-center mb-6 shadow-inner transition-colors duration-300">
                {cat.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesSection;
const GameCard = ({
  title,
  image,
  category,
  rating = 4.8,
  players = "10K+",
}) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2">
      
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-6">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-white shadow-lg">
          ▶ Play Now
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400">
            {category}
          </span>

          <span className="text-yellow-400 text-sm">
            ⭐ {rating}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          👥 {players} Players
        </p>
      </div>
    </div>
  );
};

export default GameCard;
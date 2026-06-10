import {
  Gamepad2,
  Users,
  Trophy,
  Star,
  TrendingUp,
  Globe,
} from "lucide-react";

const stats = [
  {
    icon: Gamepad2,
    value: "500+",
    label: "Games Available",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Users,
    value: "1M+",
    label: "Active Players",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Trophy,
    value: "50K+",
    label: "Tournaments Played",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    color: "from-green-500 to-emerald-600",
  },
];

const StatsSection = () => {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium">
            Platform Statistics
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-white">
            Gaming In
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {" "}
              Numbers
            </span>
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Join millions of gamers and experience one of the
            fastest-growing gaming communities.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:-translate-y-3 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-15 bg-gradient-to-r ${item.color} transition duration-500`}
                />

                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-r ${item.color}`}
                >
                  <Icon size={38} className="text-white" />
                </div>

                <h3 className="mt-6 text-5xl font-black text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-400">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Premium Banner */}
        <div className="mt-20 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="grid lg:grid-cols-3 gap-8 p-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp
                  className="text-cyan-400"
                  size={32}
                />
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  +250%
                </h3>

                <p className="text-gray-400">
                  Growth This Year
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Users
                  className="text-purple-400"
                  size={32}
                />
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  100K+
                </h3>

                <p className="text-gray-400">
                  Daily Players
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center">
                <Globe
                  className="text-pink-400"
                  size={32}
                />
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  120+
                </h3>

                <p className="text-gray-400">
                  Countries Reached
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-lg hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            Join Millions of Gamers 🚀
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 
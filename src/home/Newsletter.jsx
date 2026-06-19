import { Mail, Send, Sparkles, Bell } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-5">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl">

          {/* Animated Background */}
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

          {/* Floating Icons */}
          <div className="absolute top-10 left-10 opacity-20">
            <Mail size={80} className="text-cyan-400" />
          </div>

          <div className="absolute bottom-10 right-10 opacity-20">
            <Bell size={80} className="text-purple-400" />
          </div>

          <div className="relative p-10 md:p-20 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6">
              <Sparkles size={18} />
              Join Gaming Community
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Never Miss A
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Gaming Update
              </span>
            </h2>

            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
              Get exclusive game releases, tournaments, rewards,
              leaderboard updates and exciting offers directly
              in your inbox.
            </p>

            {/* Newsletter Form */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail
                    size={22}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    className="w-full h-16 pl-14 pr-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition"
                  />
                </div>

                <button className="group h-16 px-10 rounded-2xl bg-linear-to-r from-cyan-500 to-purple-600 text-white font-bold flex items-center justify-center gap-3 hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                  Subscribe
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-14">
  <div className="rounded-xl md:rounded-2xl bg-white/5 border border-white/10 p-2 sm:p-4 md:p-6">
    <h3 className="text-cyan-400 text-xl sm:text-2xl md:text-3xl font-black">
      🎮
    </h3>

    <h4 className="text-white font-bold mt-2 text-xs sm:text-sm md:text-lg">
      New Games
    </h4>

    <p className="text-gray-400 mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">
      Be the first to know when new games arrive.
    </p>
  </div>

  <div className="rounded-xl md:rounded-2xl bg-white/5 border border-white/10 p-2 sm:p-4 md:p-6">
    <h3 className="text-purple-400 text-xl sm:text-2xl md:text-3xl font-black">
      🏆
    </h3>

    <h4 className="text-white font-bold mt-2 text-xs sm:text-sm md:text-lg">
      Tournaments
    </h4>

    <p className="text-gray-400 mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">
      Receive tournament alerts and rewards.
    </p>
  </div>

  <div className="rounded-xl md:rounded-2xl bg-white/5 border border-white/10 p-2 sm:p-4 md:p-6">
    <h3 className="text-pink-400 text-xl sm:text-2xl md:text-3xl font-black">
      🎁
    </h3>

    <h4 className="text-white font-bold mt-2 text-xs sm:text-sm md:text-lg">
      Exclusive Rewards
    </h4>

    <p className="text-gray-400 mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">
      Get bonus coins, gifts and premium perks.
    </p>
  </div>
</div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-10 mt-14">
              <div>
                <h3 className="text-4xl font-black text-cyan-400">
                  100K+
                </h3>
                <p className="text-gray-400">
                  Subscribers
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-purple-400">
                  500+
                </h3>
                <p className="text-gray-400">
                  Games
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-pink-400">
                  24/7
                </h3>
                <p className="text-gray-400">
                  Updates
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
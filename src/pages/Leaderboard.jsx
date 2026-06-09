import { Trophy, Medal, Crown, Star } from "lucide-react";

const players = [
  {
    id: 1,
    name: "Alex Gamer",
    score: 9850,
    games: 245,
    rank: 1,
  },
  {
    id: 2,
    name: "Shadow King",
    score: 9120,
    games: 218,
    rank: 2,
  },
  {
    id: 3,
    name: "Pixel Master",
    score: 8740,
    games: 201,
    rank: 3,
  },
  {
    id: 4,
    name: "Game Ninja",
    score: 8320,
    games: 189,
    rank: 4,
  },
  {
    id: 5,
    name: "Speed Hunter",
    score: 7990,
    games: 173,
    rank: 5,
  },
  {
    id: 6,
    name: "Pro Player",
    score: 7420,
    games: 165,
    rank: 6,
  },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-purple-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
              <Trophy size={50} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black">
            Global
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {" "}
              Leaderboard
            </span>
          </h1>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Compete with top gamers around the world and climb
            the rankings to become the ultimate champion.
          </p>
        </div>
      </section>

      {/* Top 3 Players */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* 2nd */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center mt-10">
            <Medal size={50} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-2xl font-bold">
              {players[1].name}
            </h3>
            <p className="text-gray-400 mt-2">
              {players[1].score} Points
            </p>
            <span className="inline-block mt-4 px-4 py-2 rounded-full bg-gray-500/20 text-gray-300">
              Rank #2
            </span>
          </div>

          {/* 1st */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-3xl p-10 text-center">
            <Crown size={60} className="mx-auto text-yellow-400" />
            <h3 className="mt-4 text-3xl font-black">
              {players[0].name}
            </h3>
            <p className="text-gray-300 mt-2 text-lg">
              {players[0].score} Points
            </p>

            <span className="inline-block mt-5 px-5 py-2 rounded-full bg-yellow-500 text-black font-bold">
              🏆 Rank #1
            </span>
          </div>

          {/* 3rd */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center mt-10">
            <Medal size={50} className="mx-auto text-orange-400" />
            <h3 className="mt-4 text-2xl font-bold">
              {players[2].name}
            </h3>
            <p className="text-gray-400 mt-2">
              {players[2].score} Points
            </p>
            <span className="inline-block mt-4 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400">
              Rank #3
            </span>
          </div>

        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Star className="text-yellow-400" />
              Top Players
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left px-6 py-4">Rank</th>
                  <th className="text-left px-6 py-4">Player</th>
                  <th className="text-left px-6 py-4">Score</th>
                  <th className="text-left px-6 py-4">Games Played</th>
                </tr>
              </thead>

              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-5 font-bold">
                      #{player.rank}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center font-bold">
                          {player.name.charAt(0)}
                        </div>

                        {player.name}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-cyan-400 font-semibold">
                      {player.score}
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      {player.games}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
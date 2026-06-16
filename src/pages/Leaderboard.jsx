import React, { useState } from "react";
import {
  Trophy,
  Crown,
  Medal,
  Search,
  Star,
} from "lucide-react";

const Leaderboard = () => {
  const [search, setSearch] = useState("");

  const players = [
    {
      rank: 1,
      name: "Aanand",
      score: 9850,
      country: "🇮🇳",
    },
    {
      rank: 2,
      name: "Aarav",
      score: 9420,
      country: "🇮🇳",
    },
    {
      rank: 3,
      name: "Rohan",
      score: 9180,
      country: "🇮🇳",
    },
    {
      rank: 4,
      name: "Alex",
      score: 8910,
      country: "🇺🇸",
    },
    {
      rank: 5,
      name: "Sophia",
      score: 8710,
      country: "🇬🇧",
    },
    {
      rank: 6,
      name: "Noah",
      score: 8450,
      country: "🇨🇦",
    },
    {
      rank: 7,
      name: "Emma",
      score: 8210,
      country: "🇦🇺",
    },
    {
      rank: 8,
      name: "Liam",
      score: 8010,
      country: "🇩🇪",
    },
    {
      rank: 9,
      name: "Olivia",
      score: 7840,
      country: "🇫🇷",
    },
    {
      rank: 10,
      name: "William",
      score: 7600,
      country: "🇯🇵",
    },
  ];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 py-12">

        {/* Heading */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 mb-5">
            <Trophy size={18} />
            Global Rankings
          </div>

          <h1 className="text-5xl md:text-7xl font-black">
            Leader
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Board
            </span>
          </h1>


          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Compete with players around the world and climb
            to the top of the rankings.
          </p>

        </div>


        {/* Top 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          {/* 2nd */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-xl md:mt-10">
            <Medal
              size={40}
              className="mx-auto text-gray-300 mb-3"
            />
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-3xl font-black mx-auto">
              A
            </div>

            <h3 className="text-2xl font-bold mt-4">
              Aarav
            </h3>

            <p className="text-gray-400">
              9,420 Points
            </p>
          </div>

          {/* 1st */}
          <div className="bg-gradient-to-b from-yellow-500/20 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-8 text-center backdrop-blur-xl">

            <Crown
              size={45}
              className="mx-auto text-yellow-400 mb-3"
            />

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-black mx-auto">
              A
            </div>

            <h3 className="text-3xl font-black mt-4">
              Aanand
            </h3>

            <p className="text-yellow-400 font-bold">
              9,850 Points
            </p>

          </div>

          {/* 3rd */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-xl md:mt-16">
            <Medal
              size={40}
              className="mx-auto text-orange-400 mb-3"
            />
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-3xl font-black mx-auto">
              R
            </div>

            <h3 className="text-2xl font-bold mt-4">
              Rohan
            </h3>

            <p className="text-gray-400">
              9,180 Points
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">

          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3">

            <Search
              size={20}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Player..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-transparent outline-none px-3 w-full text-white"
            />

          </div>

        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

          {filteredPlayers.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between px-6 py-5 border-b border-white/5 hover:bg-white/5 transition"
            >

              <div className="flex items-center gap-5">

                <div className="w-12 text-center font-black text-xl">
                  #{player.rank}
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center font-bold">
                  {player.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold">
                    {player.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {player.country}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2 text-yellow-400 font-bold">
                <Star size={18} />
                {player.score.toLocaleString()}
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
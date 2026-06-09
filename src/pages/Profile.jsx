import { useState } from "react";
import {
  User,
  Trophy,
  Gamepad2,
  Star,
  Edit,
  Mail,
  MapPin,
} from "lucide-react";

const Profile = () => {
  const [user] = useState({
    name: "Paras Sahu",
    email: "paras@example.com",
    location: "Lucknow, India",
    avatar: "https://i.pravatar.cc/300?img=12",
    gamesPlayed: 248,
    totalScore: 12450,
    achievements: 32,
    rank: 18,
  });

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500"
                />

                <button className="absolute bottom-2 right-2 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                  <Edit size={18} />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-black">
                  {user.name}
                </h1>

                <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-400">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Mail size={18} />
                    {user.email}
                  </div>

                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <MapPin size={18} />
                    {user.location}
                  </div>
                </div>

                <div className="mt-6">
                  <span className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                    Rank #{user.rank}
                  </span>
                </div>
              </div>

              {/* Edit Profile */}
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Gamepad2
              className="mx-auto text-cyan-400 mb-4"
              size={36}
            />
            <h3 className="text-3xl font-bold">
              {user.gamesPlayed}
            </h3>
            <p className="text-gray-400 mt-2">
              Games Played
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Trophy
              className="mx-auto text-yellow-400 mb-4"
              size={36}
            />
            <h3 className="text-3xl font-bold">
              {user.totalScore}
            </h3>
            <p className="text-gray-400 mt-2">
              Total Score
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Star
              className="mx-auto text-purple-400 mb-4"
              size={36}
            />
            <h3 className="text-3xl font-bold">
              {user.achievements}
            </h3>
            <p className="text-gray-400 mt-2">
              Achievements
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <User
              className="mx-auto text-pink-400 mb-4"
              size={36}
            />
            <h3 className="text-3xl font-bold">
              #{user.rank}
            </h3>
            <p className="text-gray-400 mt-2">
              Global Rank
            </p>
          </div>

        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <span>🎮 Played Car Racing 3D</span>
              <span className="text-gray-400">
                2 hours ago
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <span>🏆 Reached Top 20 Ranking</span>
              <span className="text-gray-400">
                Yesterday
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <span>⭐ Unlocked New Achievement</span>
              <span className="text-gray-400">
                3 days ago
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <span>🔥 Won Battle Arena Match</span>
              <span className="text-gray-400">
                5 days ago
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
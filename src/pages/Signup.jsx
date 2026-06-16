import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Trophy,
  Gamepad2,
  LogOut,
  Crown,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "Player";
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] overflow-hidden">

          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500"></div>

          {/* Avatar */}
          <div className="flex flex-col items-center -mt-16 px-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black border-4 border-[#050816]">
              {name.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-4xl font-black text-white mt-5">
              {name}
            </h1>

            <p className="text-gray-400 mt-2">
              Gamer • PlayOut Member
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 mt-8">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Gamepad2 className="mx-auto text-cyan-400" size={30} />
              <h2 className="text-white text-2xl font-bold mt-3">25</h2>
              <p className="text-gray-400 text-sm">Games Played</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Trophy className="mx-auto text-yellow-400" size={30} />
              <h2 className="text-white text-2xl font-bold mt-3">12</h2>
              <p className="text-gray-400 text-sm">Wins</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <Crown className="mx-auto text-purple-400" size={30} />
              <h2 className="text-white text-2xl font-bold mt-3">4.9</h2>
              <p className="text-gray-400 text-sm">Rating</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <User className="mx-auto text-green-400" size={30} />
              <h2 className="text-white text-2xl font-bold mt-3">Pro</h2>
              <p className="text-gray-400 text-sm">Rank</p>
            </div>

          </div>

          {/* Info Section */}
          <div className="p-6">
            <h2 className="text-white text-2xl font-bold mb-5">
              Account Information
            </h2>

            

            <div className="space-y-4">

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <User className="text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Username
                  </p>
                  <p className="text-white font-semibold">
                    {name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <Mail className="text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Status
                  </p>
                  <p className="text-white font-semibold">
                    Logged In
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Logout */}
          <div className="p-6 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
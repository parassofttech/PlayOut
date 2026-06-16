import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Crown,
  ShieldCheck,
  Calendar,
  LogOut,
  Gamepad2,
  Trophy,
  Star,
  Zap,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);

const [userName, setUserName] = useState(
  localStorage.getItem("name") || "Player"
);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };
  const saveProfile = () => {
  localStorage.setItem("name", userName);

  window.dispatchEvent(new Event("storage"));

  setIsEditing(false);

  alert("Profile Updated Successfully");
};

  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden relative">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 py-10">

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl">

          {/* Cover */}
          <div className="h-52 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500"></div>

          {/* Avatar */}
          <div className="flex flex-col items-center -mt-20">

            <div className="w-40 h-40 rounded-full border-[6px] border-[#050816] bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-6xl font-black text-white shadow-2xl">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="mt-5">
  {isEditing ? (
    <input
      type="text"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      className="
        bg-white/10
        border
        border-cyan-500
        rounded-xl
        px-4
        py-2
        text-white
        text-center
        outline-none
      "
    />
  ) : (
    <h1 className="text-4xl md:text-5xl font-black text-white">
      {userName}
    </h1>
  )}
</div>

<div className="mt-4 flex gap-3">
  {isEditing ? (
    <button
      onClick={saveProfile}
      className="
        px-6 py-3
        rounded-xl
        bg-green-500
        text-white
        font-bold
      "
    >
      Save Profile
    </button>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="
        px-6 py-3
        rounded-xl
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white
        font-bold
      "
    >
      Edit Profile
    </button>
  )}
</div>

            <p className="text-cyan-400 mt-2 flex items-center gap-2">
              <Crown size={18} />
              PlayOut Pro Gamer
            </p>

          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <Gamepad2 className="mx-auto text-cyan-400" size={35} />
              <h3 className="text-white text-3xl font-black mt-3">
                25
              </h3>
              <p className="text-gray-400">
                Games Played
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <Trophy className="mx-auto text-yellow-400" size={35} />
              <h3 className="text-white text-3xl font-black mt-3">
                12
              </h3>
              <p className="text-gray-400">
                Victories
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <Star className="mx-auto text-orange-400" size={35} />
              <h3 className="text-white text-3xl font-black mt-3">
                4.9
              </h3>
              <p className="text-gray-400">
                Rating
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <Zap className="mx-auto text-green-400" size={35} />
              <h3 className="text-white text-3xl font-black mt-3">
                Pro
              </h3>
              <p className="text-gray-400">
                Rank
              </p>
            </div>

          </div>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-5">
              Account Information
            </h2>

            <div className="space-y-4">

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                <User className="text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Username
                  </p>
                  <p className="text-white font-semibold">
                    {userName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                <ShieldCheck className="text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Account Status
                  </p>
                  <p className="text-green-400 font-semibold">
                    Verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                <Calendar className="text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Member Since
                  </p>
                  <p className="text-white font-semibold">
                    2026
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Achievement Card */}
          <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl">

            <h2 className="text-2xl font-bold text-white mb-5">
              Achievements
            </h2>

            <div className="space-y-4">

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-2xl p-4">
                <h3 className="text-yellow-400 font-bold">
                  🏆 First Victory
                </h3>
                <p className="text-gray-300 text-sm">
                  Won your first game.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-2xl p-4">
                <h3 className="text-cyan-400 font-bold">
                  ⚡ Rising Star
                </h3>
                <p className="text-gray-300 text-sm">
                  Reached 20+ games played.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-2xl p-4">
                <h3 className="text-purple-400 font-bold">
                  👑 Elite Gamer
                </h3>
                <p className="text-gray-300 text-sm">
                  Achieved Pro Rank.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
          >
            <LogOut size={22} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
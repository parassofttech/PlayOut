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
const [editing, setEditing] = useState(false);

const [profile, setProfile] = useState(() => {
  const saved = localStorage.getItem("profile");

  return saved
    ? JSON.parse(saved)
    : {
        name: localStorage.getItem("name") || "",
        email: "",
        city: "",
        state: "",
        dob: "",
        gender: "",
        photo: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png",
      };
});

const handleChange = (e) => {
  const { name, value } = e.target;

  setProfile((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setProfile((prev) => ({
      ...prev,
      photo: reader.result,
    }));
  };

  reader.readAsDataURL(file);
};

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
  localStorage.setItem(
    "profile",
    JSON.stringify(profile)
  );

  localStorage.setItem(
    "name",
    profile.name
  );

  window.dispatchEvent(
    new Event("storage")
  );

  setEditing(false);

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

            {/* <div className="w-40 h-40 rounded-full border-[6px] border-[#050816] bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-6xl font-black text-white shadow-2xl">
              {userName.charAt(0).toUpperCase()}
            </div> */}

          <div className="mt-8">

  {editing ? (

    /* EDIT MODE */
    <div className="space-y-6">

     <div className="relative flex justify-center">
  <img
    src={
      profile.photo
        ? profile.photo
        : profile.name
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`
        : "https://i.pinimg.com/236x/d6/5c/fa/d65cfa8b47227df12fb97217e8f940e3.jpg?nii=t"
    }
    alt="Profile"
    className="w-40 h-40 rounded-full object-cover border-4 bg-gray-700 border-cyan-500"
  />

  {editing && (
    <label className="absolute bottom-0 right-[35%] bg-cyan-500 p-3 rounded-full cursor-pointer hover:bg-cyan-600 transition">
      📷
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />
    </label>
  )}
</div>

      <div className="grid md:grid-cols-2 gap-5 w-[80%]">

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="  bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-500"
        />

        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-500"
        />

        <input
          type="text"
          name="city"
          value={profile.city}
          onChange={handleChange}
          placeholder="City"
          className="bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-500"
        />

        <input
          type="text"
          name="state"
          value={profile.state}
          onChange={handleChange}
          placeholder="State"
          className="bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-500"
        />

        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
          className="bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-500"
        />

        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          className="bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={saveProfile}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold"
        >
          Save Profile
        </button>

        <button
          onClick={() => setEditing(false)}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold"
        >
          Cancel
        </button>
      </div>

    </div>

  ) : (

    /* VIEW MODE */
    <div>

      <div className="flex justify-center mb-8">
        <img
          src={
            profile.photo ||
            `https://ui-avatars.com/api/?name=${profile.name}`
          }
          alt=""
          className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5 text-white">

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400">Name</p>
          <p className="font-bold">{profile.name || ""}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400">Email</p>
          <p className="font-bold">{profile.email || ""}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400">City</p>
          <p className="font-bold">{profile.city || ""}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400">State</p>
          <p className="font-bold">{profile.state || ""}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400">Date Of Birth</p>
          <p className="font-bold">{profile.dob || " "}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400">Gender</p>
          <p className="font-bold">{profile.gender || ""}</p>
        </div>

      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setEditing(true)}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-bold hover:scale-105 transition"
        >
          Edit Profile
        </button>
      </div>

    </div>

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
            className="w-[40%] sm:w-[20%] py-4 rounded-3xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
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
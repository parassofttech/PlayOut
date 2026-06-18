import { useEffect, useState, } from "react";
import {
  Menu,
  X,
  Search,
  Gamepad2,
  Trophy,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  const email = localStorage.getItem("email");

const isAdmin = email === "paras11@gmail.com";

  useEffect(() => {
    const updateUser = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");

      if (token) {
        setUser({
          name: name || "User",
        });
      } else {
        setUser(null);
      }
    };

    updateUser();

    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);

    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <div className="p-2 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/30">
                <Gamepad2 size={24} className="text-white" />
              </div>

              <h1 className="text-2xl font-extrabold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                PlayOut
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className=" hidden md:flex items-center mx-6 gap-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Home
              </Link>

              <Link
                to="/games"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Games
              </Link>

              <Link
                to="/leaderboard"
                className="text-gray-300 hover:text-cyan-400 transition flex items-center gap-1"
              >
                <Trophy size={18} />
                Leaderboard
              </Link>

              <Link
                to="/categories"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Contact
              </Link>
            </div>

            {/* Search */}
            <div className="hidden lg:flex items-center bg-white/10 border border-white/10 rounded-full px-4 py-2 w-72">
              <Search size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search Games..."
                className="bg-transparent outline-none px-3 text-white w-full placeholder-gray-400"
              />
            </div>

              {isAdmin && (
  <Link
    to="/admin"
    className=" hidden md:flex px-4 py-2 bg-gray-500 rounded-xl text-white font-bold"
  >
    Admin
  </Link>
)}

            {/* Desktop Profile */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
  to="/profile"
  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition"
>
  <div className="w-10 h-10 rounded-full text-sm bg-linear-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
    {user.name.charAt(0).toUpperCase()}
  </div>

  <span className="text-white font-medium">
    {user.name}
  </span>
</Link>

                  <button
                    onClick={handleLogout}
                    className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 transition"
                  >
                    <LogOut
                      size={18}
                      className="text-red-400"
                    />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:scale-105 transition"
                >
                  Login
                </Link>
              )}
            </div>

            <div>

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white"
            >
              {mobileMenu ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden backdrop-blur-xl bg-black/95 border-t border-white/10">
            <div className="flex flex-col px-5 py-5 gap-4">

              <Link
                to="/"
                className="text-white hover:text-cyan-400"
                onClick={() => setMobileMenu(false)}
              >
                Home
              </Link>

              <Link
                to="/games"
                className="text-white hover:text-cyan-400"
                onClick={() => setMobileMenu(false)}
              >
                Games
              </Link>

              <Link
                to="/leaderboard"
                className="text-white hover:text-cyan-400"
                onClick={() => setMobileMenu(false)}
              >
                Leaderboard
              </Link>

              <Link
                to="/categories"
                className="text-white hover:text-cyan-400"
                onClick={() => setMobileMenu(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-cyan-400"
                onClick={() => setMobileMenu(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-white hover:text-cyan-400"
                onClick={() => setMobileMenu(false)}
              >
                Contact
              </Link>
              {isAdmin && (
  <Link
    to="/admin"
    className="px-4 py-2 bg-gray-500 rounded-xl text-white font-bold"
  >
    Admin
  </Link>
)}

              <div className="flex items-center bg-white/10 rounded-full px-4 py-2 mt-2">
                <Search size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none px-3 text-white w-full"
                />
              </div>

              {user ? (
                <>
                  <Link
  to="/profile"
  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition"
>
  <div className="w-10 h-10 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
    {user.name.charAt(0).toUpperCase()}
  </div>

  <span className="text-white font-medium">
    {user.name}
  </span>
</Link>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-red-500 text-white font-bold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="mt-3 w-full py-3 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-white font-bold text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-20"></div>
    </>
  );
}

export default Navbar;
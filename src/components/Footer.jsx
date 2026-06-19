import {
  Gamepad2,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#050816] border-t border-white/10">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600">
                <Gamepad2 className="text-white" size={24} />
              </div>

              <h2 className="text-2xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                PlayOut
              </h2>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Play hundreds of exciting online games instantly.
              Action, Racing, Puzzle, Adventure, Sports and much more —
              all in one place.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#">📘 Facebook</a>

              <a href="#">🐦 Twitter</a>
              <a href="#">📷 Instagram</a>
              <a href="#">▶️ YouTube</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Games
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Categories
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Leaderboard
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  New Games
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>🎮 Action Games</li>
              <li>🏎 Racing Games</li>
              <li>⚽ Sports Games</li>
              <li>🧩 Puzzle Games</li>
              <li>🕹 Arcade Games</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@playout.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Lucknow, India</span>
              </div>
            </div>

            <div className="mt-6">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500"
              />

              <button className="w-full mt-3 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} PlayOut. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-cyan-400 transition">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-cyan-400 transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
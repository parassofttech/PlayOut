import { Gamepad2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Animated Icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-2xl animate-pulse"></div>

        <div className="relative p-6 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 animate-bounce">
          <Gamepad2 size={60} className="text-white" />
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-8 text-3xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        PlayOut
      </h2>

      <p className="mt-3 text-gray-400 text-lg">
        Loading Games...
      </p>

      {/* Progress Dots */}
      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce"></span>

        <span
          className="w-3 h-3 rounded-full bg-purple-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-3 h-3 rounded-full bg-pink-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </div>
  );
};

export default Loader;
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, RotateCcw, Trophy, Flame, Zap, Shield, Play } from "lucide-react";

/*
  ============================================================
  ADVANCED TEMPLE RUN 3D (With Real Temple Track Image Background)
  ============================================================
*/

const LANES = [-1, 0, 1]; // Left (-1), Center (0), Right (1)
const GAME_SPEED_INITIAL = 7;

// High quality assets & temple path background image
const ASSETS = {
  trackBg: "https://play-lh.googleusercontent.com/s8W50dJpQKzDzFhx_I0F_g-JD1-RhKg4mnMHIsJfG6I7zgmfW43hkOFgKb7eI_MRNvGdr_qLvVp3MM5PL6fmIG8=w526-h296-rw",
  runner: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
  jumpRunner: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png",
  slideRunner: "https://cdn-icons-png.flaticon.com/512/3048/3048135.png",
  coin: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ho_R_7q_osUbiuv0Roma5EpJnaNsLcER6le6TjwtCw&s=10",
  shield: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
  lowStone: "https://cdn-icons-png.flaticon.com/512/2933/2933745.png",
  highBranch: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
};

export default function TempleRun() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [health, setHealth] = useState(3);
  const [shieldActive, setShieldActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Tap Left, Right, Jump or Slide buttons below!");

  // Player position state
  const [playerLane, setPlayerLane] = useState(0); // -1, 0, 1
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  // Obstacles & Collectibles moving down the tracks
  const [elements, setElements] = useState([]);
  const speedRef = useRef(GAME_SPEED_INITIAL);
  const requestRef = useRef(null);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCoins(0);
    setHealth(3);
    setShieldActive(false);
    setGameOver(false);
    setPlayerLane(0);
    setIsJumping(false);
    setIsSliding(false);
    setElements([]);
    speedRef.current = GAME_SPEED_INITIAL;
    setMessage("Run! Jump over low rocks, slide under hanging branches!");
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || gameOver) return;
      if (e.key === "ArrowLeft" || e.key === "a") {
        setPlayerLane((prev) => Math.max(prev - 1, -1));
      } else if (e.key === "ArrowRight" || e.key === "d") {
        setPlayerLane((prev) => Math.min(prev + 1, 1));
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
        handleJump();
      } else if (e.key === "ArrowDown" || e.key === "s") {
        handleSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver]);

  const handleJump = () => {
    if (isJumping || isSliding) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 550);
  };

  const handleSlide = () => {
    if (isJumping || isSliding) return;
    setIsSliding(true);
    setTimeout(() => setIsSliding(false), 550);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    let lastSpawnTime = Date.now();

    const updateGame = () => {
      const now = Date.now();
      if (now - lastSpawnTime > 1300) {
        lastSpawnTime = now;
        const randomLane = LANES[Math.floor(Math.random() * LANES.length)];
        
        const randVal = Math.random();
        let type = "coin";
        let subtype = "";

        if (randVal > 0.6) {
          type = "obstacle";
          subtype = Math.random() > 0.5 ? "low_stone" : "high_branch";
        } else if (randVal > 0.45) {
          type = "shield";
        }

        setElements((prev) => [
          ...prev,
          {
            id: Math.random(),
            lane: randomLane,
            y: 0, // Starts at top (0%) moving down to player (~80%)
            type,
            subtype,
          },
        ]);
      }

      setElements((prev) =>
        prev
          .map((el) => ({ ...el, y: el.y + speedRef.current * 0.3 }))
          .filter((el) => el.y < 110)
      );

      setScore((s) => s + 1);
      speedRef.current = GAME_SPEED_INITIAL + Math.floor(score / 600) * 0.4;

      requestRef.current = requestAnimationFrame(updateGame);
    };

    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, gameOver, score]);

  // Collision Checking loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    elements.forEach((el) => {
      if (el.y >= 75 && el.y <= 88 && el.lane === playerLane) {
        if (el.type === "coin") {
          setCoins((c) => c + 15);
          setScore((s) => s + 60);
          setElements((prev) => prev.filter((item) => item.id !== el.id));
        } else if (el.type === "shield") {
          setShieldActive(true);
          setMessage("🛡️ Shield Activated! Next hit is blocked.");
          setElements((prev) => prev.filter((item) => item.id !== el.id));
        } else if (el.type === "obstacle") {
          let cleared = false;
          if (el.subtype === "low_stone" && isJumping) cleared = true;
          if (el.subtype === "high_branch" && isSliding) cleared = true;

          if (cleared) {
            setMessage("✨ Perfect Dodge!");
            setElements((prev) => prev.filter((item) => item.id !== el.id));
            return;
          }

          if (shieldActive) {
            setShieldActive(false);
            setMessage("🛡️ Shield absorbed the impact!");
            setElements((prev) => prev.filter((item) => item.id !== el.id));
          } else {
            setHealth((h) => {
              const newHealth = h - 1;
              if (newHealth <= 0) {
                setGameOver(true);
                setIsPlaying(false);
                setMessage("❌ Game Over! The monster caught you.");
              } else {
                setMessage(`⚠️ Crash! Health left: ${newHealth}`);
              }
              return newHealth;
            });
            setElements((prev) => prev.filter((item) => item.id !== el.id));
          }
        }
      }
    });
  }, [elements, playerLane, isJumping, isSliding, shieldActive, isPlaying, gameOver]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex items-center justify-between bg-slate-900/80 border border-white/10 p-4 rounded-3xl backdrop-blur-xl shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={12} /> Temple Run 3D
            </div>
            <h1 className="mt-1 text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Ancient Ruins
            </h1>
          </div>
          <button
            onClick={startGame}
            className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 transition text-white shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-slate-900/60 border border-white/10 p-2.5 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Trophy size={10} className="text-yellow-400" /> Score
            </p>
            <p className="text-sm font-black mt-1 text-yellow-400">{score}</p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-2.5 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Zap size={10} className="text-amber-400" /> Gems
            </p>
            <p className="text-sm font-black mt-1 text-amber-400">{coins}</p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-2.5 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Flame size={10} className="text-red-400" /> Health
            </p>
            <p className="text-sm font-black mt-1 text-red-400">{"❤️".repeat(health)}</p>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-2.5 rounded-2xl backdrop-blur-xl shadow-md">
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
              <Shield size={10} className="text-cyan-400" /> Shield
            </p>
            <p className="text-xs font-black mt-1 text-cyan-400">{shieldActive ? "ON" : "OFF"}</p>
          </div>
        </div>

        {/* Message Banner */}
        <div className="bg-slate-900/40 border border-white/10 px-4 py-2 rounded-2xl text-center text-xs font-medium text-slate-300 shadow-inner">
          {message}
        </div>

        {/* 3D Visual Perspective Track Box with Background Image */}
        <div className="border-4 border-amber-500/50 h-[420px] rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden flex justify-center bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.trackBg})` }}>
          
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />

          {/* Lanes Track Structure with Visible Path Dividers */}
          <div className="absolute inset-0 grid grid-cols-3 px-8 pointer-events-none z-0">
            <div className="border-r-2 border-dashed border-amber-400/50 h-full bg-black/20" />
            <div className="border-r-2 border-dashed border-amber-400/50 h-full bg-amber-900/20 shadow-inner" />
            <div className="h-full bg-black/20" />
          </div>

          {/* Render Moving Game Elements */}
          {isPlaying &&
            elements.map((el) => {
              let leftPos = "calc(50% - 24px)"; // Center lane (0)
              if (el.lane === -1) leftPos = "calc(16% - 24px)"; // Left lane (-1)
              if (el.lane === 1) leftPos = "calc(84% - 24px)"; // Right lane (1)

              let imgSrc = ASSETS.coin;
              if (el.type === "shield") imgSrc = ASSETS.shield;
              if (el.type === "obstacle") {
                imgSrc = el.subtype === "low_stone" ? ASSETS.lowStone : ASSETS.highBranch;
              }

              return (
                <div
                  key={el.id}
                  style={{ top: `${el.y}%`, left: leftPos }}
                  className="absolute w-12 h-12 flex items-center justify-center transition-all duration-75 z-10 filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.9)]"
                >
                  <img src={imgSrc} alt={el.type} className="w-10 h-10 object-contain animate-bounce" />
                </div>
              );
            })}

          {/* Fully Visible Character Image */}
          {isPlaying && (
            <div
              style={{
                left:
                  playerLane === -1
                    ? "calc(16% - 28px)"
                    : playerLane === 1
                    ? "calc(84% - 28px)"
                    : "calc(50% - 28px)",
              }}
              className={`absolute bottom-8 w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/90 to-orange-600/90 p-2 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.9)] border-2 border-white transition-all duration-100 z-20 ${
                isJumping ? "-translate-y-24 scale-125 rotate-6" : ""
              } ${isSliding ? "translate-y-4 scale-75 opacity-90" : ""}`}
            >
              <img
                src={isJumping ? ASSETS.jumpRunner : isSliding ? ASSETS.slideRunner : ASSETS.runner}
                alt="Runner"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
          )}

          {/* Start Screen Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
              <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                TEMPLE RUN 3D
              </h2>
              <p className="text-xs text-slate-300 mb-6 max-w-xs font-medium">
                Jump over low stones, slide under high branches, and collect sparkling gold treasures!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-lg hover:opacity-90 transition cursor-pointer flex items-center gap-2"
              >
                <Play size={18} /> Start Game
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
              <h2 className="text-3xl font-black mb-2 text-red-500">
                CAUGHT BY MONSTER!
              </h2>
              <p className="text-sm text-slate-300 mb-2 font-medium">
                Final Score: <span className="text-yellow-400 font-bold">{score}</span> | Treasures: <span className="text-amber-400 font-bold">{coins}</span>
              </p>
              <p className="text-xs text-slate-400 mb-6">The ancient temple claims another explorer.</p>
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-lg hover:opacity-90 transition cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Action Controls for Mobile / Touch screens */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setPlayerLane((prev) => Math.max(prev - 1, -1))}
            className="py-4 bg-slate-900 border border-white/10 rounded-2xl text-amber-400 font-bold active:bg-slate-800 transition shadow-md cursor-pointer text-xs"
          >
            ⬅️ Left
          </button>
          <button
            onClick={handleJump}
            className="py-4 bg-slate-900 border border-white/10 rounded-2xl text-amber-400 font-bold active:bg-slate-800 transition shadow-md cursor-pointer text-xs"
          >
            ⬆️ Jump
          </button>
          <button
            onClick={handleSlide}
            className="py-4 bg-slate-900 border border-white/10 rounded-2xl text-amber-400 font-bold active:bg-slate-800 transition shadow-md cursor-pointer text-xs"
          >
            ⬇️ Slide
          </button>
          <button
            onClick={() => setPlayerLane((prev) => Math.min(prev + 1, 1))}
            className="py-4 bg-slate-900 border border-white/10 rounded-2xl text-amber-400 font-bold active:bg-slate-800 transition shadow-md cursor-pointer text-xs"
          >
            Right ➡️
          </button>
        </div>

      </div>
    </div>
  );
}
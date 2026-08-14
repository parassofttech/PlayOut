import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Target,
  Zap,
  ShieldAlert,
  Flame,
} from "lucide-react";

/* =========================================================
   GAME CONFIG & CONSTANTS
========================================================= */

const TABLE_WIDTH = 360;
const TABLE_HEIGHT = 640;
const BALL_RADIUS = 12;
const HOLE_RADIUS = 18;

// Pockets (Corners & Middle)
const POCKETS = [
  { x: 25, y: 25 },
  { x: TABLE_WIDTH / 2, y: 20 },
  { x: TABLE_WIDTH - 25, y: 25 },
  { x: 25, y: TABLE_HEIGHT - 25 },
  { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 20 },
  { x: TABLE_WIDTH - 25, y: TABLE_HEIGHT - 25 },
];

const INITIAL_BALLS = [
  // Cue Ball
  { id: 0, x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 160, vx: 0, vy: 0, color: "#f8fafc", type: "cue", potted: false },
  
  // Solid Balls (1-7)
  { id: 1, x: TABLE_WIDTH / 2, y: 150, vx: 0, vy: 0, color: "#eab308", type: "solid", potted: false }, // Yellow
  { id: 2, x: TABLE_WIDTH / 2 - 14, y: 172, vx: 0, vy: 0, color: "#3b82f6", type: "solid", potted: false }, // Blue
  { id: 3, x: TABLE_WIDTH / 2 + 14, y: 172, vx: 0, vy: 0, color: "#ef4444", type: "solid", potted: false }, // Red
  { id: 4, x: TABLE_WIDTH / 2 - 28, y: 194, vx: 0, vy: 0, color: "#a855f7", type: "solid", potted: false }, // Purple
  { id: 5, x: TABLE_WIDTH / 2, y: 194, vx: 0, vy: 0, color: "#f97316", type: "solid", potted: false }, // Orange
  { id: 6, x: TABLE_WIDTH / 2 + 28, y: 194, vx: 0, vy: 0, color: "#22c55e", type: "solid", potted: false }, // Green
  { id: 7, x: TABLE_WIDTH / 2 - 42, y: 216, vx: 0, vy: 0, color: "#7f1d1d", type: "solid", potted: false }, // Maroon

  // 8 Ball (Black)
  { id: 8, x: TABLE_WIDTH / 2, y: 172, vx: 0, vy: 0, color: "#09090b", type: "eight", potted: false },

  // Stripe Balls (9-15)
  { id: 9, x: TABLE_WIDTH / 2 + 14, y: 216, vx: 0, vy: 0, color: "#eab308", type: "stripe", potted: false },
  { id: 10, x: TABLE_WIDTH / 2 + 42, y: 216, vx: 0, vy: 0, color: "#3b82f6", type: "stripe", potted: false },
  { id: 11, x: TABLE_WIDTH / 2 - 14, y: 216, vx: 0, vy: 0, color: "#ef4444", type: "stripe", potted: false },
  { id: 12, x: TABLE_WIDTH / 2 - 21, y: 238, vx: 0, vy: 0, color: "#a855f7", type: "stripe", potted: false },
  { id: 13, x: TABLE_WIDTH / 2 + 7, y: 238, vx: 0, vy: 0, color: "#f97316", type: "stripe", potted: false },
  { id: 14, x: TABLE_WIDTH / 2 - 7, y: 238, vx: 0, vy: 0, color: "#22c55e", type: "stripe", potted: false },
  { id: 15, x: TABLE_WIDTH / 2 + 21, y: 238, vx: 0, vy: 0, color: "#7f1d1d", type: "stripe", potted: false },
];

 function EightBallPool() {
  const [balls, setBalls] = useState(INITIAL_BALLS);
  const [cueAngle, setCueAngle] = useState(-90); // Degrees
  const [power, setPower] = useState(20);
  const [isAiming, setIsAiming] = useState(true);
  const [turn, setTurn] = useState("player");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sound, setSound] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState("Break the rack & sink the balls!");

  const requestRef = useRef();

  /* =========================================================
     PHYSICS ENGINE LOOP (FRICTION, COLLISIONS, POCKETS)
  ========================================================= */

  const updatePhysics = () => {
    setBalls((prevBalls) => {
      let moving = false;
      let updated = prevBalls.map((b) => {
        if (b.potted) return b;

        let nx = b.x + b.vx;
        let ny = b.y + b.vy;
        let nvx = b.vx * 0.985; // Friction
        let nvy = b.vy * 0.985;

        // Stop micro-movements
        if (Math.abs(nvx) < 0.05) nvx = 0;
        if (Math.abs(nvy) < 0.05) nvy = 0;

        if (nvx !== 0 || nvy !== 0) moving = true;

        // Table Borders Collision (With cushion bounds)
        const minX = 25 + BALL_RADIUS;
        const maxX = TABLE_WIDTH - 25 - BALL_RADIUS;
        const minY = 25 + BALL_RADIUS;
        const maxY = TABLE_HEIGHT - 25 - BALL_RADIUS;

        if (nx < minX) { nx = minX; nvx *= -1; }
        if (nx > maxX) { nx = maxX; nvx *= -1; }
        if (ny < minY) { ny = minY; nvy *= -1; }
        if (ny > maxY) { ny = maxY; nvy *= -1; }

        return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
      });

      // Pocket Checks
      updated = updated.map((b) => {
        if (b.potted) return b;
        for (let pocket of POCKETS) {
          const dx = b.x - pocket.x;
          const dy = b.y - pocket.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < HOLE_RADIUS) {
            if (b.type === "cue") {
              // Resurrect Cue Ball if scratched
              return { ...b, x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 160, vx: 0, vy: 0 };
            } else {
              setScore((s) => s + 100);
              return { ...b, potted: true, vx: 0, vy: 0, x: -50, y: -50 };
            }
          }
        }
        return b;
      });

      // Ball-to-Ball Elastic Collisions
      for (let i = 0; i < updated.length; i++) {
        for (let j = i + 1; j < updated.length; j++) {
          let b1 = updated[i];
          let b2 = updated[j];
          if (b1.potted || b2.potted) continue;

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < BALL_RADIUS * 2) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate ball positions
            let x1 = 0, y1 = 0;
            let x2 = dx * cos + dy * sin;
            let y2 = dy * cos - dx * sin;

            // Rotate velocities
            let vx1 = b1.vx * cos + b1.vy * sin;
            let vy1 = b1.vy * cos - b1.vx * sin;
            let vx2 = b2.vx * cos + b2.vy * sin;
            let vy2 = b2.vy * cos - b2.vx * sin;

            // Elastic collision math
            let vx1Final = vx2;
            let vx2Final = vx1;

            // Unrotate positions
            b1.x = b1.x + (x1 * cos - y1 * sin);
            b1.y = b1.y + (x1 * sin + y1 * cos);
            b2.x = b1.x + (x2 * cos - y2 * sin);
            b2.y = b1.y + (x2 * sin + y2 * cos);

            // Unrotate velocities
            b1.vx = vx1Final * cos - vy1 * sin;
            b1.vy = vy1 * cos + vx1Final * sin;
            b2.vx = vx2Final * cos - vy2 * sin;
            b2.vy = vy2 * cos + vx2Final * sin;
          }
        }
      }

      if (!moving && !isAiming) {
        setIsAiming(true);
      }

      return updated;
    });

    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isAiming]);

  /* =========================================================
     SHOOT ACTION
  ========================================================= */

  const shootCueBall = () => {
    if (!isAiming) return;

    setIsAiming(false);
    const rad = (cueAngle * Math.PI) / 180;
    const force = power / 3;

    setBalls((prev) =>
      prev.map((b) => {
        if (b.type === "cue") {
          return {
            ...b,
            vx: Math.cos(rad) * force,
            vy: Math.sin(rad) * force,
          };
        }
        return b;
      })
    );
  };

  const resetGame = () => {
    setBalls(INITIAL_BALLS);
    setScore(0);
    setStreak(0);
    setIsAiming(true);
    setGameOver(false);
    setGameMessage("New Rack! Aim & Shoot.");
  };

  const cueBall = balls.find((b) => b.type === "cue");

  return (
    <div className="min-h-screen bg-linear-to-br from-[#030712] via-[#0f172a] to-[#020617] text-white flex flex-col items-center px-3 py-4 select-none">
      
      {/* HEADER */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5">
            🎱 Pro 8-Ball Arena
          </h1>
          <p className="text-[11px] text-gray-400">Precision Billiards Experience</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSound(!sound)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition active:scale-95"
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={resetGame}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition active:scale-95"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="w-full max-w-90 grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 text-center backdrop-blur-md">
          <Target size={15} className="mx-auto text-emerald-400" />
          <p className="text-[9px] text-gray-400 mt-0.5">SCORE</p>
          <p className="font-black text-sm text-emerald-300">{score}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 text-center backdrop-blur-md">
          <Flame size={15} className="mx-auto text-orange-400" />
          <p className="text-[9px] text-gray-400 mt-0.5">STREAK</p>
          <p className="font-black text-sm text-orange-300">{streak}x</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 text-center backdrop-blur-md">
          <Trophy size={15} className="mx-auto text-yellow-400" />
          <p className="text-[9px] text-gray-400 mt-0.5">POCKETS</p>
          <p className="font-black text-sm text-yellow-300">
            {balls.filter((b) => b.potted && b.type !== "cue").length}/15
          </p>
        </div>
      </div>

      {/* BILLIARDS TABLE */}
      <div
        className="relative rounded-4xl overflow-hidden border-[6px] border-[#3f2b1d] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{
          width: TABLE_WIDTH,
          height: TABLE_HEIGHT,
          background: "radial-gradient(circle at center, #065f46 0%, #022c22 100%)",
        }}
      >
        {/* POCKETS */}
        {POCKETS.map((p, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-black shadow-inner border border-stone-800"
            style={{
              width: HOLE_RADIUS * 2,
              height: HOLE_RADIUS * 2,
              left: p.x - HOLE_RADIUS,
              top: p.y - HOLE_RADIUS,
              boxShadow: "inset 0 4px 6px rgba(0,0,0,0.9)",
            }}
          />
        ))}

        {/* CUE STICK & AIM GUIDELINE */}
        {isAiming && cueBall && (
          <>
            {/* Guide Line */}
            <div
              className="absolute h-[1.5px] bg-white/40 origin-left pointer-events-none border-t border-dashed border-white/60"
              style={{
                left: cueBall.x,
                top: cueBall.y,
                width: "150px",
                transform: `rotate(${cueAngle}deg)`,
              }}
            />

            {/* Cue Stick */}
            <div
              className="absolute h-2.5 rounded-full origin-left transition-transform duration-75 pointer-events-none"
              style={{
                left: cueBall.x,
                top: cueBall.y - 5,
                width: "180px",
                background: "linear-gradient(90deg, #d97706, #78350f, #292524)",
                transform: `rotate(${cueAngle}deg) translateX(${15 + power}px)`,
                boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              }}
            />
          </>
        )}

        {/* BALLS */}
        {balls.map((b) => {
          if (b.potted) return null;
          return (
            <div
              key={b.id}
              className="absolute rounded-full flex items-center justify-center transition-transform"
              style={{
                width: BALL_RADIUS * 2,
                height: BALL_RADIUS * 2.1,
                left: b.x - BALL_RADIUS,
                top: b.y - BALL_RADIUS,
                background:
                  b.type === "stripe"
                    ? `radial-gradient(circle at 35% 35%, white 0%, white 40%, ${b.color} 41%, ${b.color} 100%)`
                    : `radial-gradient(circle at 35% 35%, #ffffff 0%, ${b.color} 40%, #000000 100%)`,
                boxShadow: "0 4px 6px rgba(0,0,0,0.4), inset -2px -3px 4px rgba(0,0,0,0.6)",
              }}
            >
              {b.type !== "cue" && (
                <span className="w-4 h-4 rounded-full bg-white text-[9px] font-black text-black flex items-center justify-center shadow-inner">
                  {b.id}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* CONTROLS PANEL */}
      <div className="w-full max-w-90 mt-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
            <Zap size={13} className="text-amber-400" /> POWER: {power}%
          </span>
          <span className="text-xs text-cyan-400 font-bold">
            {isAiming ? "Aiming Mode" : "Rolling..."}
          </span>
        </div>

        {/* POWER SLIDER */}
        <input
          type="range"
          min="10"
          max="100"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          className="w-full accent-cyan-400 bg-white/20 rounded-lg appearance-none h-2 cursor-pointer mb-3"
        />

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setCueAngle((a) => (a - 10) % 360)}
            className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black active:scale-95 transition"
          >
            ↺ Left
          </button>
          <button
            onClick={shootCueBall}
            disabled={!isAiming}
            className="py-2.5 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black text-xs font-black shadow-lg shadow-cyan-500/20 active:scale-95 transition disabled:opacity-50"
          >
            SHOOT 🎯
          </button>
          <button
            onClick={() => setCueAngle((a) => (a + 10) % 360)}
            className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black active:scale-95 transition"
          >
            Right ↻
          </button>
        </div>
      </div>

      <p className="mt-2 text-[10px] text-gray-500 text-center">
        Use angle controls to aim, adjust power slider, and hit the shot!
      </p>
    </div>
  );
}

export default EightBallPool
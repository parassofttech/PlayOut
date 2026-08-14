import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Trophy,
  Heart,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   GAME CONFIG
========================================================= */

const GAME_WIDTH = 360;
const GAME_HEIGHT = 620;

const BUBBLE_SIZE = 34;
const ROW_GAP = 29;

const COLORS = [
  {
    name: "red",
    bg: "bg-red-500",
    shadow: "#ef4444",
    gradient: "linear-gradient(135deg,#ff7676,#dc2626)",
  },
  {
    name: "blue",
    bg: "bg-blue-500",
    shadow: "#3b82f6",
    gradient: "linear-gradient(135deg,#60a5fa,#2563eb)",
  },
  {
    name: "green",
    bg: "bg-green-500",
    shadow: "#22c55e",
    gradient: "linear-gradient(135deg,#86efac,#16a34a)",
  },
  {
    name: "yellow",
    bg: "bg-yellow-400",
    shadow: "#facc15",
    gradient: "linear-gradient(135deg,#fde047,#eab308)",
  },
  {
    name: "purple",
    bg: "bg-purple-500",
    shadow: "#a855f7",
    gradient: "linear-gradient(135deg,#d8b4fe,#9333ea)",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const randomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const createBubble = (x, y, color = randomColor().name) => {
  return {
    id: `${Date.now()}-${Math.random()}`,
    x,
    y,
    color,
    radius: BUBBLE_SIZE / 2,
  };
};

const createInitialBubbles = () => {
  const bubbles = [];
  const rows = 5;
  const columns = 9;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const offset = row % 2 === 0 ? 0 : 17;
      const x = 20 + col * 40 + offset;
      const y = 22 + row * ROW_GAP;

      bubbles.push(
        createBubble(x, y, randomColor().name)
      );
    }
  }

  return bubbles;
};

const distance = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/* =========================================================
   COMPONENT
========================================================= */

 function BubbleShooter() {
  const [bubbles, setBubbles] = useState(createInitialBubbles);
  const [shooterX, setShooterX] = useState(GAME_WIDTH / 2);
  const [angle, setAngle] = useState(0);
  const [currentBubble, setCurrentBubble] = useState(randomColor);
  const [nextBubble, setNextBubble] = useState(randomColor);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [shooting, setShooting] = useState(false);
  const [sound, setSound] = useState(true);
  
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem("bubbleShooterHighScore")) || 0;
  });

  const gameRef = useRef(null);

  /* =======================================================
     RESET GAME
  ======================================================= */

  const resetGame = useCallback(() => {
    setBubbles(createInitialBubbles());
    setShooterX(GAME_WIDTH / 2);
    setAngle(0);
    setCurrentBubble(randomColor());
    setNextBubble(randomColor());
    setScore(0);
    setCombo(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setPaused(false);
    setShooting(false);
  }, []);

  /* =======================================================
     SCORE
  ======================================================= */

  const updateScore = (points) => {
    setScore((prev) => {
      const newScore = prev + points;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("bubbleShooterHighScore", newScore);
      }
      return newScore;
    });
  };

  /* =======================================================
     SHOOTER MOVEMENT
  ======================================================= */

  const moveLeft = () => {
    if (gameOver || paused) return;
    setShooterX((x) => Math.max(20, x - 18));
    setAngle((a) => Math.max(-65, a - 7));
  };

  const moveRight = () => {
    if (gameOver || paused) return;
    setShooterX((x) => Math.min(GAME_WIDTH - 20, x + 18));
    setAngle((a) => Math.min(65, a + 7));
  };

  /* =======================================================
     FIND MATCHES (FLOOD FILL)
  ======================================================= */

  const findConnectedBubbles = (allBubbles, startBubble) => {
    const connected = [];
    const visited = new Set();
    const queue = [startBubble];

    while (queue.length) {
      const current = queue.shift();
      if (visited.has(current.id)) continue;
      visited.add(current.id);

      if (current.color !== startBubble.color) continue;
      connected.push(current);

      allBubbles.forEach((bubble) => {
        if (!visited.has(bubble.id) && distance(current, bubble) < 43) {
          queue.push(bubble);
        }
      });
    }

    return connected;
  };

  /* =======================================================
     SHOOT & COLLISION LOGIC
  ======================================================= */

  const shoot = useCallback(() => {
    if (shooting || gameOver || paused) return;

    setShooting(true);

    const startX = GAME_WIDTH / 2; 
    const startY = GAME_HEIGHT - 85; 
    const rad = (angle * Math.PI) / 180;
    
    let x = startX;
    let y = startY;
    const speed = 16;

    const interval = setInterval(() => {
      x += Math.sin(rad) * speed;
      y -= Math.cos(rad) * speed;

      if (x <= 18 || x >= GAME_WIDTH - 18) {
        clearInterval(interval);
        attachBubble(x, y);
        return;
      }

      if (y <= 18) {
        clearInterval(interval);
        attachBubble(x, y);
        return;
      }

      const collision = bubbles.find(
        (bubble) => distance({ x, y }, bubble) <= BUBBLE_SIZE - 4
      );

      if (collision) {
        clearInterval(interval);
        attachBubble(x, y);
      }
    }, 16);
  }, [angle, bubbles, shooting, gameOver, paused, currentBubble, nextBubble, combo]);

  const attachBubble = (x, y) => {
    const newBubble = createBubble(
      Math.max(18, Math.min(GAME_WIDTH - 18, x)),
      Math.max(18, y),
      currentBubble.name
    );

    setBubbles((prev) => {
      const updated = [...prev, newBubble];
      const matches = findConnectedBubbles(updated, newBubble);

      if (matches.length >= 3) {
        const matchIds = new Set(matches.map((b) => b.id));
        const newBubbles = updated.filter((b) => !matchIds.has(b.id));

        const points = matches.length * 10 * (combo + 1);
        updateScore(points);
        setCombo((prevCombo) => prevCombo + 1);

        if (newBubbles.length < 12) {
          setLevel((prev) => prev + 1);
          const nextLevelBubbles = createInitialBubbles();
          setBubbles(nextLevelBubbles);
          return nextLevelBubbles;
        }

        return newBubbles;
      }

      setCombo(0);
      return updated;
    });

    setCurrentBubble(nextBubble);
    setNextBubble(randomColor());
    setShooting(false);
  };

  /* =======================================================
     KEYBOARD CONTROLS
  ======================================================= */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveLeft();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveRight();
      } else if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        shoot();
      } else if (e.key.toLowerCase() === "p") {
        setPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [shoot, paused, gameOver]);

  /* =======================================================
     DANGER LINE CHECK
  ======================================================= */

  useEffect(() => {
    const dangerous = bubbles.some((bubble) => bubble.y > GAME_HEIGHT - 130);
    if (dangerous) {
      setLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setGameOver(true);
        }
        return next;
      });
    }
  }, [bubbles]);

  const getColor = (name) =>
    COLORS.find((c) => c.name === name) || COLORS[0];

  /* =======================================================
     RENDER UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#111827] to-[#020617] text-white flex flex-col items-center px-3 py-5 overflow-hidden">

      {/* HEADER */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🫧 Bubble Shooter
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">Match • Shoot • Blast</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSound((prev) => !prev)}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button
            onClick={() => setPaused((prev) => !prev)}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            {paused ? <Play size={19} /> : <Pause size={19} />}
          </button>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="w-full max-w-90 grid grid-cols-4 gap-2 mb-4">
        <div className="bg-white/10 border border-white/10 rounded-2xl p-2 text-center">
          <Target size={16} className="mx-auto text-cyan-400" />
          <p className="text-[9px] text-gray-400 mt-1">SCORE</p>
          <p className="font-black text-sm">{score}</p>
        </div>
        <div className="bg-white/10 border border-white/10 rounded-2xl p-2 text-center">
          <Trophy size={16} className="mx-auto text-yellow-400" />
          <p className="text-[9px] text-gray-400 mt-1">BEST</p>
          <p className="font-black text-sm">{highScore}</p>
        </div>
        <div className="bg-white/10 border border-white/10 rounded-2xl p-2 text-center">
          <Zap size={16} className="mx-auto text-purple-400" />
          <p className="text-[9px] text-gray-400 mt-1">LEVEL</p>
          <p className="font-black text-sm">{level}</p>
        </div>
        <div className="bg-white/10 border border-white/10 rounded-2xl p-2 text-center">
          <Heart size={16} className="mx-auto text-red-400" />
          <p className="text-[9px] text-gray-400 mt-1">LIVES</p>
          <p className="font-black text-sm">{"❤️".repeat(lives)}</p>
        </div>
      </div>

      {/* GAME BOARD */}
      <div
        ref={gameRef}
        className="relative w-full max-w-90 h-155 rounded-[30px] overflow-hidden border border-white/20 shadow-2xl"
        style={{
          background: "radial-gradient(circle at top,#172554,#020617 70%)",
        }}
      >
        {/* COMBO BADGE */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-end items-center">
          {combo > 0 && (
            <div className="px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-xs font-black text-purple-200 animate-pulse">
              🔥 x{combo} COMBO
            </div>
          )}
        </div>

        {/* BUBBLES */}
        {bubbles.map((bubble) => {
          const color = getColor(bubble.color);
          return (
            <div
              key={bubble.id}
              className="absolute rounded-full flex items-center justify-center transition-all duration-75"
              style={{
                width: BUBBLE_SIZE,
                height: BUBBLE_SIZE,
                left: bubble.x - BUBBLE_SIZE / 2,
                top: bubble.y - BUBBLE_SIZE / 2,
                background: color.gradient,
                boxShadow: `0 0 8px ${color.shadow}, inset -4px -5px 6px rgba(0,0,0,.3), inset 3px 3px 6px rgba(255,255,255,.4)`,
              }}
            >
              <span className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/70" />
            </div>
          );
        })}

        {/* AIM LINE */}
        {!gameOver && !paused && (
          <div
            className="absolute bottom-18.75 left-1/2 h-44 w-0.5 origin-bottom border-l-2 border-dashed border-white/30 pointer-events-none"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
          />
        )}

        {/* SHOOTER CANNON */}
        <div
          className="absolute bottom-4 left-1/2 w-16 h-16 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateX(-50%)`,
          }}
        >
          <div
            className="absolute bottom-6 w-8 h-12 rounded-full bg-linear-to-t from-slate-700 to-slate-400 border border-white/20"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "bottom center",
            }}
          />
          <div
            className="absolute bottom-12 w-8 h-8 rounded-full z-10"
            style={{
              background: getColor(currentBubble.name).gradient,
              boxShadow: `0 0 12px ${getColor(currentBubble.name).shadow}, inset -3px -3px 4px rgba(0,0,0,.3), inset 3px 3px 4px rgba(255,255,255,.4)`,
            }}
          />
        </div>

        {/* NEXT BUBBLE */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center">
          <span className="text-[9px] text-gray-400 font-bold mb-1">NEXT</span>
          <div
            className="w-7 h-7 rounded-full"
            style={{
              background: getColor(nextBubble.name).gradient,
              boxShadow: `0 0 6px ${getColor(nextBubble.name).shadow}`,
            }}
          />
        </div>

        {/* PAUSE OVERLAY */}
        {paused && !gameOver && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">⏸️</div>
              <h2 className="text-3xl font-black">PAUSED</h2>
              <button
                onClick={() => setPaused(false)}
                className="mt-5 px-6 py-3 rounded-xl bg-cyan-500 text-black font-black hover:bg-cyan-400 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* GAME OVER MODAL */}
        {gameOver && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
            <div className="w-[85%] bg-white/10 border border-white/20 rounded-[30px] p-6 text-center">
              <div className="text-5xl mb-2">💥</div>
              <h2 className="text-2xl font-black">GAME OVER</h2>
              <p className="text-xs text-gray-400 mt-1">Bubbles reached the bottom!</p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-black/30 rounded-2xl p-2.5">
                  <p className="text-[10px] text-gray-400">SCORE</p>
                  <p className="text-lg font-black text-cyan-400">{score}</p>
                </div>
                <div className="bg-black/30 rounded-2xl p-2.5">
                  <p className="text-[10px] text-gray-400">BEST</p>
                  <p className="text-lg font-black text-yellow-400">{highScore}</p>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="mt-5 w-full py-3 rounded-2xl bg-linear-to-r from-cyan-400 to-purple-500 text-black font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              >
                <RotateCcw size={16} /> Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE CONTROLS */}
      <div className="w-full max-w-90 mt-4 flex items-center justify-between gap-3">
        <button
          onClick={moveLeft}
          className="flex-1 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center active:scale-95 transition hover:bg-white/20"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={shoot}
          className="w-28 h-14 rounded-2xl bg-linear-to-r from-cyan-400 to-purple-500 text-black font-black shadow-lg shadow-purple-500/20 active:scale-95 transition hover:opacity-90"
        >
          SHOOT
        </button>
        <button
          onClick={moveRight}
          className="flex-1 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center active:scale-95 transition hover:bg-white/20"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* INSTRUCTIONS */}
      <p className="mt-4 text-[11px] text-gray-500 text-center">
        ← → Move • Space/Shoot = Fire • P = Pause
      </p>
    </div>
  );
}

export default BubbleShooter
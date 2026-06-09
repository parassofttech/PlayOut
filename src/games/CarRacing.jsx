import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  RotateCcw,
  Trophy,
  Gauge,
  Timer,
  Car,
} from "lucide-react";

const ROAD_WIDTH = 360;
const CAR_WIDTH = 60;
const CAR_HEIGHT = 110;
const GAME_SPEED = 8;

const CarRacing = () => {
  const gameRef = useRef(null);
  const animationRef = useRef(null);

  const [playerX, setPlayerX] = useState(150);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(GAME_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const keys = useRef({});

  const createObstacle = () => ({
    id: Date.now() + Math.random(),
    x: Math.floor(Math.random() * (ROAD_WIDTH - CAR_WIDTH)),
    y: -120,
    color: [
      "from-red-500 to-red-700",
      "from-yellow-400 to-orange-600",
      "from-blue-500 to-indigo-700",
      "from-green-400 to-emerald-700",
      "from-pink-500 to-rose-700",
    ][Math.floor(Math.random() * 5)],
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;

    const obstacleInterval = setInterval(() => {
      setObstacles((prev) => [...prev, createObstacle()]);
    }, 1200);

    return () => clearInterval(obstacleInterval);
  }, [started, gameOver]);

  useEffect(() => {
    if (!started || gameOver) return;

    const loop = () => {
      setPlayerX((prev) => {
        let next = prev;

        if (keys.current["ArrowLeft"] || keys.current["a"])
          next -= 8;

        if (keys.current["ArrowRight"] || keys.current["d"])
          next += 8;

        return Math.max(
          0,
          Math.min(ROAD_WIDTH - CAR_WIDTH, next)
        );
      });

      setObstacles((prev) => {
        const updated = prev
          .map((obs) => ({
            ...obs,
            y: obs.y + speed,
          }))
          .filter((obs) => obs.y < 700);

        updated.forEach((obs) => {
          const hit =
            obs.x < playerX + CAR_WIDTH &&
            obs.x + CAR_WIDTH > playerX &&
            obs.y < 560 &&
            obs.y + CAR_HEIGHT > 450;

          if (hit) {
            setGameOver(true);
          }
        });

        return updated;
      });

      setScore((prev) => prev + 1);

      animationRef.current =
        requestAnimationFrame(loop);
    };

    animationRef.current =
      requestAnimationFrame(loop);

    return () =>
      cancelAnimationFrame(animationRef.current);
  }, [started, gameOver, playerX, speed]);

  useEffect(() => {
    if (score > 0 && score % 400 === 0) {
      setSpeed((prev) => prev + 1);
    }
  }, [score]);

  const startGame = () => {
    setStarted(true);
    setGameOver(false);
    setScore(0);
    setSpeed(GAME_SPEED);
    setPlayerX(150);
    setObstacles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center overflow-hidden p-4">

      {/* Header */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">

        <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-cyan-400">
            <Trophy size={18} />
            <span className="font-bold">
              {score}
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-green-400">
            <Gauge size={18} />
            <span>{speed * 20} km/h</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg px-5 py-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-orange-400">
            <Timer size={18} />
            <span>{Math.floor(score / 60)} s</span>
          </div>
        </div>

      </div>

      {/* Game Area */}
      <div
        ref={gameRef}
        className="relative overflow-hidden rounded-3xl border-4 border-white/10 shadow-[0_0_50px_rgba(0,255,255,0.25)]"
        style={{
          width: ROAD_WIDTH,
          height: 650,
        }}
      >
        {/* Road */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-900 to-black" />

        {/* Road Lines */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 bg-white"
            style={{
              width: "8px",
              height: "60px",
              top: `${i * 80}px`,
            }}
          />
        ))}

        {/* Side Glow */}
        <div className="absolute left-0 top-0 w-2 h-full bg-cyan-400/40" />
        <div className="absolute right-0 top-0 w-2 h-full bg-cyan-400/40" />

        {/* Player Car */}
        <div
          className="absolute transition-all"
          style={{
            left: playerX,
            bottom: 80,
            width: CAR_WIDTH,
            height: CAR_HEIGHT,
          }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-700 shadow-[0_0_30px_rgba(34,211,238,0.9)] flex items-center justify-center">
            <Car size={34} className="text-white" />
          </div>
        </div>

        {/* Opponent Cars */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className={`absolute rounded-2xl bg-gradient-to-b ${obs.color} shadow-xl`}
            style={{
              left: obs.x,
              top: obs.y,
              width: CAR_WIDTH,
              height: CAR_HEIGHT,
            }}
          />
        ))}

        {/* Start Screen */}
        {!started && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-black mb-4">
              CAR RACING
            </h1>

            <button
              onClick={startGame}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center gap-2 hover:scale-105 transition"
            >
              <Play />
              Start Race
            </button>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-black text-red-500 mb-3">
              CRASHED!
            </h2>

            <p className="mb-5 text-xl">
              Score: {score}
            </p>

            <button
              onClick={startGame}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-600 flex items-center gap-2 hover:scale-105 transition"
            >
              <RotateCcw />
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-400 mt-5 text-center">
        Use ← → Arrow Keys or A / D Keys to Drive
      </p>
    </div>
  );
};

export default CarRacing;
import React, { useEffect, useRef, useState } from "react";

const GAME_TIME = 30;

export default function AimTrainer() {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [shots, setShots] = useState(0);

  const areaRef = useRef(null);

  // SPAWN TARGET
  const spawnTarget = () => {
    const x = Math.random() * 90;
    const y = Math.random() * 90;

    setTargets((prev) => [
      ...prev,
      {
        id: Date.now(),
        x,
        y,
      },
    ]);
  };

  // TIMER
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // AUTO SPAWN TARGETS
  useEffect(() => {
    if (gameOver) return;

    const spawn = setInterval(() => {
      spawnTarget();
    }, 800);

    return () => clearInterval(spawn);
  }, [gameOver]);

  // CLICK TARGET
  const hitTarget = (id) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => s + 10);
  };

  // MISS CLICK
  const handleMiss = () => {
    setShots((s) => s + 1);
  };

  const restart = () => {
    setTargets([]);
    setScore(0);
    setTime(GAME_TIME);
    setGameOver(false);
    setShots(0);
  };

  const accuracy =
    shots === 0 ? 0 : Math.round((score / 10 / shots) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">🎯 Aim Trainer</h1>

      <div className="flex gap-6 mb-4">
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          ⭐ Score: {score}
        </div>
        <div className="bg-red-500 px-4 py-2 rounded-xl">
          ⏱ Time: {time}s
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl">
          🎯 Accuracy: {accuracy}%
        </div>
      </div>

      {/* GAME AREA */}
      <div
        ref={areaRef}
        onClick={handleMiss}
        className="relative w-full max-w-3xl h-[500px] bg-gray-800 border border-gray-600 rounded-xl overflow-hidden"
      >
        {targets.map((t) => (
          <div
            key={t.id}
            onClick={(e) => {
              e.stopPropagation();
              hitTarget(t.id);
            }}
            className="absolute w-8 h-8 bg-red-500 rounded-full cursor-pointer shadow-lg hover:scale-110 transition"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* GAME OVER */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl text-center w-72">
            <h2 className="text-2xl font-bold mb-2">🏁 Game Over</h2>

            <p>Score: {score}</p>
            <p>Accuracy: {accuracy}%</p>

            <button
              onClick={restart}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect, useRef, useState } from "react";

function SubwaySurfers() {
  const lanes = [0, 80, 160];

  const [lane, setLane] = useState(1);
  const [jumping, setJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const jumpRef = useRef(false);

  // Controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      if (e.key === "ArrowLeft") {
        setLane((l) => Math.max(0, l - 1));
      }

      if (e.key === "ArrowRight") {
        setLane((l) => Math.min(2, l + 1));
      }

      if (e.code === "Space") {
        jump();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  const jump = () => {
    if (jumpRef.current) return;

    setJumping(true);
    jumpRef.current = true;

    setTimeout(() => {
      setJumping(false);
      jumpRef.current = false;
    }, 600);
  };

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // move obstacles
      setObstacles((prev) => {
        let updated = prev.map((o) => ({
          ...o,
          y: o.y + 6,
        }));

        // remove passed
        updated = updated.filter((o) => o.y < 600);

        // spawn
        if (Math.random() > 0.92) {
          updated.push({
            id: Date.now(),
            lane: Math.floor(Math.random() * 3),
            y: -50,
          });
        }

        // collision
        updated.forEach((o) => {
          if (
            o.lane === lane &&
            o.y > 420 &&
            o.y < 500 &&
            !jumping
          ) {
            setGameOver(true);
          }
        });

        return updated;
      });

      setScore((s) => s + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [lane, jumping, gameOver]);

  const restart = () => {
    setLane(1);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setJumping(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-black via-purple-950 to-black p-4">

      {/* Score */}
      <div className="text-white mb-4 flex gap-6 items-center">
        <div className="px-4 py-2 bg-white/10 rounded-xl">
          🏃 Score: {score}
        </div>

        <button
          onClick={restart}
          className="px-4 py-2 bg-cyan-500 rounded-xl"
        >
          Restart
        </button>
      </div>

      {/* Game Board */}
      <div className="relative w-60 h-150 bg-black border border-white/20 rounded-2xl overflow-hidden">

        {/* Player */}
        <div
          className={`absolute bottom-10 w-10 h-10 bg-cyan-400 rounded-md transition-all duration-150 ${
            jumping ? "bottom-32" : "bottom-10"
          }`}
          style={{ left: lanes[lane] }}
        />

        {/* Obstacles */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute w-10 h-10 bg-red-500 rounded-md"
            style={{
              left: lanes[o.lane],
              top: o.y,
            }}
          />
        ))}

        {/* Ground lines */}
        <div className="absolute bottom-0 w-full h-1 bg-white/10" />
      </div>

      {/* Mobile Controls */}
      <div className="flex gap-6 mt-6">
        <button
          onTouchStart={() =>
            setLane((l) => Math.max(0, l - 1))
          }
          className="w-16 h-16 bg-blue-500 rounded-full text-white text-xl"
        >
          ⬅
        </button>

        <button
          onTouchStart={jump}
          className="w-16 h-16 bg-green-500 rounded-full text-white text-xl"
        >
          ⬆
        </button>

        <button
          onTouchStart={() =>
            setLane((l) => Math.min(2, l + 1))
          }
          className="w-16 h-16 bg-purple-500 rounded-full text-white text-xl"
        >
          ➡
        </button>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold text-red-500">
            Game Over
          </h1>

          <p className="mt-2">Score: {score}</p>

          <button
            onClick={restart}
            className="mt-4 px-6 py-3 bg-yellow-500 rounded-xl"
          >
            Play Again
          </button>
        </div>
      )}

      <p className="text-gray-400 mt-4 text-center">
        Arrow keys + Space (Jump) | Mobile buttons supported
      </p>
    </div>
  );
}

export default SubwaySurfers;
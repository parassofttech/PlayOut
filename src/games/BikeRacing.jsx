import { useEffect, useState } from "react";

const LANES = [40, 140, 240];

function BikeRacing() {
  const [lane, setLane] = useState(1);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  const [obstacles, setObstacles] = useState([
    { id: 1, lane: 1, y: -150 },
  ]);

  const moveLeft = () => {
    if (gameOver) return;
    setLane((p) => Math.max(p - 1, 0));
  };

  const moveRight = () => {
    if (gameOver) return;
    setLane((p) => Math.min(p + 1, 2));
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
    };

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev.map((o) => ({
          ...o,
          y: o.y + speed,
        }));

        // Collision
        updated.forEach((o) => {
          if (o.lane === lane && o.y > 520 && o.y < 620) {
            setGameOver(true);
          }
        });

        const filtered = updated.filter((o) => o.y < 800);

        // spawn
        if (filtered.length < 3 && Math.random() > 0.94) {
          filtered.push({
            id: Date.now(),
            lane: Math.floor(Math.random() * 3),
            y: -150,
          });
        }

        return filtered;
      });

      setScore((s) => s + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [lane, speed, gameOver]);

  // speed increase
  useEffect(() => {
    if (score > 0 && score % 120 === 0) {
      setSpeed((s) => Math.min(s + 0.4, 15));
    }
  }, [score]);

  const restart = () => {
    setLane(1);
    setScore(0);
    setSpeed(5);
    setGameOver(false);
    setObstacles([{ id: 1, lane: 1, y: -150 }]);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-3">

      <div className="relative">

        {/* HUD */}
        <div className="absolute -top-14 left-0 right-0 flex justify-between text-white font-bold">
          <span>🏆 {score}</span>
          <span>⚡ {speed.toFixed(1)}</span>
        </div>

        {/* ROAD */}
        <div className="relative w-[330px] h-[650px] overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900 via-gray-800 to-black border-x-8 border-yellow-500">

          {/* road lines */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 bg-white"
              style={{
                width: "8px",
                height: "70px",
                top: `${((i * 90 + score * 2) % 900) - 100}px`,
              }}
            />
          ))}

          {/* obstacles */}
          {obstacles.map((o) => (
            <div
              key={o.id}
              className="absolute text-5xl"
              style={{
                left: LANES[o.lane],
                top: o.y,
              }}
            >
              🚧
            </div>
          ))}

          {/* bike */}
          <div
            className="absolute bottom-8 text-5xl transition-all duration-150"
            style={{
              left: LANES[lane],
            }}
          >
            🏍️
          </div>
        </div>

        {/* controls */}
        <div className="flex justify-center gap-5 mt-5">
          <button
            onClick={moveLeft}
            className="px-6 py-3 rounded-xl bg-yellow-500 font-bold"
          >
            ⬅️
          </button>

          <button
            onClick={moveRight}
            className="px-6 py-3 rounded-xl bg-yellow-500 font-bold"
          >
            ➡️
          </button>
        </div>

        {/* game over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 rounded-3xl flex flex-col items-center justify-center text-white">

            <h1 className="text-5xl font-black text-red-500">
              CRASH 💥
            </h1>

            <p className="mt-3 text-2xl">Score: {score}</p>

            <button
              onClick={restart}
              className="mt-5 px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 font-bold"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BikeRacing;
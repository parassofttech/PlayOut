import { useEffect, useState } from "react";

const LANES = [30, 130, 230];

function DriftKing() {
  const [lane, setLane] = useState(1);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  const [obstacles, setObstacles] = useState([
    {
      id: 1,
      lane: 0,
      y: -150,
    },
  ]);

  const moveLeft = () => {
    if (gameOver) return;
    setLane((prev) => Math.max(prev - 1, 0));
  };

  const moveRight = () => {
    if (gameOver) return;
    setLane((prev) => Math.min(prev + 1, 2));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev.map((obs) => ({
          ...obs,
          y: obs.y + speed,
        }));

        updated.forEach((obs) => {
          if (
            obs.lane === lane &&
            obs.y > 520 &&
            obs.y < 620
          ) {
            setGameOver(true);
          }
        });

        const filtered = updated.filter(
          (obs) => obs.y < 750
        );

        if (
          filtered.length < 3 &&
          Math.random() > 0.94
        ) {
          filtered.push({
            id: Date.now(),
            lane: Math.floor(
              Math.random() * 3
            ),
            y: -150,
          });
        }

        return filtered;
      });

      setScore((prev) => prev + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [lane, speed, gameOver]);

  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      setSpeed((prev) =>
        Math.min(prev + 0.5, 15)
      );
    }
  }, [score]);

  const restart = () => {
    setLane(1);
    setScore(0);
    setSpeed(5);
    setGameOver(false);

    setObstacles([
      {
        id: 1,
        lane: 0,
        y: -150,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="relative">

        {/* HUD */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between text-white font-bold">
          <span>🏆 {score}</span>
          <span>⚡ {speed.toFixed(1)}</span>
        </div>

        {/* ROAD */}
        <div
  className="relative overflow-hidden rounded-3xl bg-linear-to-b from-zinc-900 to-zinc-800 border-x-8 border-orange-500"
  style={{
    width: 330,
    height: 650,
  }}
>

          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 bg-white"
              style={{
                width: "8px",
                height: "70px",
                top: `${
                  ((i * 90 + score) % 900) -
                  100
                }px`,
              }}
            />
          ))}

          {/* Obstacles */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              className="absolute text-5xl"
              style={{
                left: LANES[obs.lane],
                top: obs.y,
              }}
            >
              🚧
            </div>
          ))}

          {/* Player */}
          <div
            className="absolute bottom-8 text-6xl transition-all duration-150"
            style={{
              left: LANES[lane],
            }}
          >
            🏎️
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={moveLeft}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold"
          >
            ⬅️
          </button>

          <button
            onClick={moveRight}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold"
          >
            ➡️
          </button>
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/90 rounded-3xl flex flex-col items-center justify-center text-white">

            <h1 className="text-5xl font-black text-red-500">
              CRASH!
            </h1>

            <p className="mt-4 text-2xl">
              Score: {score}
            </p>

            <button
              onClick={restart}
              className="mt-6 px-8 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 font-bold"
            >
              Play Again
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default DriftKing;
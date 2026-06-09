import { useEffect, useState } from "react";

const LANES = [35, 135, 235];

const CarRacing = () => {
  const [carLane, setCarLane] = useState(1);
  const [obstacles, setObstacles] = useState([
    { id: 1, lane: 0, y: -200 },
  ]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(6);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;

      if (e.key === "ArrowLeft") {
        setCarLane((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "ArrowRight") {
        setCarLane((prev) => Math.min(prev + 1, 2));
      }
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
            obs.y > 520 &&
            obs.y < 620 &&
            obs.lane === carLane
          ) {
            setGameOver(true);
          }
        });

        const filtered = updated.filter(
          (obs) => obs.y < 700
        );

        if (Math.random() > 0.96) {
          filtered.push({
            id: Date.now(),
            lane: Math.floor(Math.random() * 3),
            y: -120,
          });
        }

        return filtered;
      });

      setScore((prev) => prev + 1);
    }, 30);

    return () => clearInterval(interval);
  }, [carLane, speed, gameOver]);

  useEffect(() => {
    if (score > 0 && score % 500 === 0) {
      setSpeed((prev) => prev + 1);
    }
  }, [score]);

  const restart = () => {
    setCarLane(1);
    setObstacles([{ id: 1, lane: 0, y: -200 }]);
    setScore(0);
    setSpeed(6);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative">

        {/* HUD */}
        <div className="absolute -top-20 left-0 right-0 flex justify-between text-white font-bold">
          <div>🏆 Score: {score}</div>
          <div>⚡ Speed: {speed}</div>
        </div>

        {/* Road */}
        <div className="relative w-[340px] h-[700px] bg-zinc-900 border-x-8 border-yellow-400 overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,255,255,0.3)]">

          {/* Road Animation */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-20 bg-white left-1/2 -translate-x-1/2"
                style={{
                  top: `${(i * 90 + score * 0.4) % 900}px`,
                }}
              />
            ))}
          </div>

          {/* Side Lights */}
          <div className="absolute left-0 top-0 w-2 h-full bg-cyan-400/50 blur-sm" />
          <div className="absolute right-0 top-0 w-2 h-full bg-cyan-400/50 blur-sm" />

          {/* Obstacles */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              className="absolute w-[70px] h-[120px] rounded-xl bg-gradient-to-b from-red-400 to-red-700 shadow-lg"
              style={{
                left: LANES[obs.lane],
                top: obs.y,
              }}
            >
                <img
    src="/assets/player-car.png"
    alt="car"
    className="w-[70px] h-[120px] object-contain drop-shadow-lg"
  />
              🚓
            </div>
          ))}

          {/* Player Car */}
          <div
            className="absolute bottom-8 w-[70px] h-[120px] rounded-xl bg-gradient-to-b from-cyan-300 to-cyan-700 shadow-[0_0_25px_cyan]"
            style={{
              left: LANES[carLane],
              transition: "left .15s ease",
            }}
          >
            <img
    src="/assets/player-car.png"
    alt="car"
    className="w-[70px] h-[120px] object-contain drop-shadow-lg"
  />
            🚗
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 text-center text-gray-300">
          ⬅️ ➡️ Arrow Keys to Move
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white rounded-xl">
            <h1 className="text-5xl font-black text-red-500">
              GAME OVER
            </h1>

            <p className="mt-4 text-xl">
              Final Score: {score}
            </p>

            <button
              onClick={restart}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRacing;
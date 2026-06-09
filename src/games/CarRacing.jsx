import { useEffect, useState } from "react";
import playerCar from "../assets/player-car.png";
import enemyCar from "../assets/enemy-car.png";

const LANES = [35, 135, 235];

const CarRacing = () => {
  const [lane, setLane] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [enemyBaseSpeed, setEnemyBaseSpeed] = useState(4);

  const [enemies, setEnemies] = useState([
    {
      id: 1,
      lane: 1,
      y: -200,
      speed: 30,
    },
  ]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === "ArrowLeft") {
        setLane((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "ArrowRight") {
        setLane((prev) => Math.min(prev + 1, 2));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setEnemies((prev) => {
        const updated = prev.map((enemy) => ({
          ...enemy,
          y: enemy.y + enemy.speed,
        }));

        // Collision Detection
        updated.forEach((enemy) => {
          if (
            enemy.lane === lane &&
            enemy.y > 500 &&
            enemy.y < 610
          ) {
            setGameOver(true);
          }
        });

        // Remove Passed Cars
        const filtered = updated.filter(
          (enemy) => enemy.y < 800
        );

        // Spawn New Enemy
        if (
          filtered.length < 3 &&
          Math.random() > 0.945
        ) {
          const newLane = Math.floor(
            Math.random() * 3
          );

          const laneBusy = filtered.some(
            (enemy) =>
              enemy.lane === newLane &&
              enemy.y < 250
          );

          if (!laneBusy) {
            filtered.push({
              id: Date.now(),
              lane: newLane,
              y: -220,
              speed:
                enemyBaseSpeed +
                Math.random() * 1.5,
            });
          }
        }

        return filtered;
      });

      setScore((prev) => prev + 1);
    }, 30);

    return () => clearInterval(gameLoop);
  }, [lane, gameOver, enemyBaseSpeed]);

  // Increase Difficulty
  useEffect(() => {
    if (score > 0 && score % 200 === 0) {
      setEnemyBaseSpeed((prev) =>
        Math.min(prev + 0.3, 15)
      );
    }
  }, [score]);

  const restartGame = () => {
    setLane(1);
    setScore(0);
    setGameOver(false);
    setEnemyBaseSpeed(4);

    setEnemies([
      {
        id: 1,
        lane: 1,
        y: -200,
        speed: 4,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative">

        {/* HUD */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between text-white font-bold text-lg">
          <span>🏆 Score: {score}</span>
          <span>
            ⚡ Speed: {enemyBaseSpeed.toFixed(1)}
          </span>
        </div>

        {/* Road */}
        <div className="relative w-[340px] h-[700px] overflow-hidden rounded-2xl border-x-8 border-yellow-400 bg-zinc-900 shadow-[0_0_50px_rgba(0,255,255,0.25)]">

          {/* Road Lines */}
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 -translate-x-1/2 bg-white"
              style={{
                width: "10px",
                height: "80px",
                top: `${
                  ((index * 100 + score * 0.8) %
                    1200) - 100
                }px`,
              }}
            />
          ))}

          {/* Side Glow */}
          <div className="absolute left-0 top-0 w-2 h-full bg-cyan-400 blur-md" />
          <div className="absolute right-0 top-0 w-2 h-full bg-cyan-400 blur-md" />

          {/* Enemy Cars */}
          {enemies.map((enemy) => (
            <img
              key={enemy.id}
              src={enemyCar}
              alt="enemy"
              className="absolute w-[70px] h-[120px] object-contain"
              style={{
                left: LANES[enemy.lane],
                top: enemy.y,
              }}
            />
          ))}

          {/* Player Car */}
          <img
            src={playerCar}
            alt="player"
            className="absolute bottom-5 w-[75px] h-[125px] object-contain drop-shadow-[0_0_25px_cyan]"
            style={{
              left: LANES[lane],
              transition:
                "all .12s cubic-bezier(0.4,0,0.2,1)",
              transform:
                lane === 0
                  ? "rotate(-10deg)"
                  : lane === 2
                  ? "rotate(10deg)"
                  : "rotate(0deg)",
            }}
          />
        </div>

        {/* Controls */}
        <div className="mt-5 text-center text-gray-300">
          ⬅️ Move Left &nbsp;&nbsp; ➡️ Move Right
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 rounded-2xl flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-black text-red-500">
              GAME OVER
            </h1>

            <p className="mt-4 text-2xl">
              Score: {score}
            </p>

            <button
              onClick={restartGame}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold hover:scale-105 transition"
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
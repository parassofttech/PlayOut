import { useEffect, useState, useCallback } from "react";
import {
  Trophy,
  Play,
  RotateCcw,
  Pause,
  Crown,
} from "lucide-react";

import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];

const getRandomFood = (snake) => {
  let food;

  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (
    snake.some(
      (segment) =>
        segment.x === food.x &&
        segment.y === food.y
    )
  );

  return food;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);

  const [food, setFood] = useState(
    getRandomFood(INITIAL_SNAKE)
  );

  const [direction, setDirection] = useState("RIGHT");

  const [gameStarted, setGameStarted] =
    useState(false);

  const [gameOver, setGameOver] = useState(false);

  const [paused, setPaused] = useState(false);

  const [score, setScore] = useState(0);

  const [speed, setSpeed] = useState(140);

  const [bestScore, setBestScore] = useState(
    localStorage.getItem("snakeBestScore") || 0
  );

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomFood(INITIAL_SNAKE));
    setDirection("RIGHT");
    setGameStarted(false);
    setGameOver(false);
    setPaused(false);
    setScore(0);
    setSpeed(140);
  };

  const changeDirection = (newDirection) => {
  if (
    newDirection === "UP" &&
    direction !== "DOWN"
  ) {
    setDirection("UP");
  }

  if (
    newDirection === "DOWN" &&
    direction !== "UP"
  ) {
    setDirection("DOWN");
  }

  if (
    newDirection === "LEFT" &&
    direction !== "RIGHT"
  ) {
    setDirection("LEFT");
  }

  if (
    newDirection === "RIGHT" &&
    direction !== "LEFT"
  ) {
    setDirection("RIGHT");
  }

  if (!gameStarted) {
    setGameStarted(true);
  }
};

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
  changeDirection("UP");
  break;

case "ArrowDown":
  changeDirection("DOWN");
  break;

case "ArrowLeft":
  changeDirection("LEFT");
  break;

case "ArrowRight":
  changeDirection("RIGHT");
  break;

        case " ":
          setPaused((prev) => !prev);
          break;

        default:
          break;
      }

      if (!gameStarted) {
        setGameStarted(true);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [direction, gameStarted]);

  const moveSnake = useCallback(() => {
    if (
      gameOver ||
      paused ||
      !gameStarted
    )
      return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }

      // Wall Collision
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= BOARD_SIZE ||
        head.y >= BOARD_SIZE
      ) {
        setGameOver(true);

        if (score > bestScore) {
          localStorage.setItem(
            "snakeBestScore",
            score
          );

          setBestScore(score);
        }

        return prevSnake;
      }

      // Self Collision
      if (
        prevSnake.some(
          (segment) =>
            segment.x === head.x &&
            segment.y === head.y
        )
      ) {
        setGameOver(true);

        if (score > bestScore) {
          localStorage.setItem(
            "snakeBestScore",
            score
          );

          setBestScore(score);
        }

        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Eat Food
      if (
        head.x === food.x &&
        head.y === food.y
      ) {
        setFood(getRandomFood(newSnake));

        setScore((prev) => prev + 10);

        setSpeed((prev) =>
          Math.max(prev - 3, 60)
        );
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [
    direction,
    food,
    gameOver,
    paused,
    gameStarted,
    score,
    bestScore,
  ]);

  useEffect(() => {
    const interval = setInterval(
      moveSnake,
      speed
    );

    return () => clearInterval(interval);
  }, [moveSnake, speed]);




  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center px-5 py-10">

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-black text-white">
        🐍 Snake Game
      </h1>

      <p className="text-gray-400 mt-3">
        Eat food, grow longer and beat your
        record.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-5 mt-8">
        <div className="px-5 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
          Score: {score}
        </div>

        <div className="px-5 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold flex items-center gap-2">
          <Crown size={18} />
          {bestScore}
        </div>

        <div className="px-5 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold">
          Speed: {Math.round(
            (140 - speed) / 4
          )}
        </div>
      </div>

      {/* Board */}
      <div className="relative mt-8">

        <div
          className="grid border-4 border-cyan-500 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.4)]"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 24px)`,
          }}
        >
          {Array.from({
            length:
              BOARD_SIZE * BOARD_SIZE,
          }).map((_, index) => {
            const x =
              index % BOARD_SIZE;

            const y = Math.floor(
              index / BOARD_SIZE
            );

            const isSnake =
              snake.some(
                (segment) =>
                  segment.x === x &&
                  segment.y === y
              );

            const isHead =
              snake[0]?.x === x &&
              snake[0]?.y === y;

            const isFood =
              food.x === x &&
              food.y === y;

            return (
              <div
                key={index}
                className={`
                w-6 h-6
                ${
                  isHead
                    ? "bg-cyan-400 shadow-[0_0_15px_cyan]"
                    : isSnake
                    ? "bg-green-500"
                    : isFood
                    ? "bg-red-500 rounded-full animate-pulse"
                    : "bg-slate-900"
                }
              `}
              />
            );
          })}
        </div>

        {!gameStarted && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-3xl">
            <Play
              size={70}
              className="text-cyan-400"
            />

            <h2 className="text-3xl font-black text-white mt-4">
              Press Arrow Key
            </h2>

            <p className="text-gray-400 mt-2">
              Start Playing
            </p>
          </div>
        )}

        {paused && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-3xl">
            <Pause
              size={70}
              className="text-yellow-400"
            />

            <h2 className="text-3xl font-black text-white mt-4">
              Paused
            </h2>
          </div>
        )}
      </div>

     {/* Mobile Controls */}

<div className="mt-8 md:hidden flex flex-col items-center gap-3">

  <button
    onClick={() => changeDirection("UP")}
    className="
      w-16 h-16
      rounded-2xl
      bg-gradient-to-r
      from-cyan-500
      to-purple-600
      text-white
      shadow-[0_0_20px_rgba(34,211,238,.4)]
      flex items-center justify-center
      active:scale-90
      transition
    "
  >
    <ArrowUp size={30} />
  </button>

  <div className="flex gap-3">

    <button
      onClick={() => changeDirection("LEFT")}
      className="
        w-16 h-16
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white
        shadow-[0_0_20px_rgba(34,211,238,.4)]
        flex items-center justify-center
        active:scale-90
        transition
      "
    >
      <ArrowLeft size={30} />
    </button>

    <button
      onClick={() => changeDirection("DOWN")}
      className="
        w-16 h-16
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white
        shadow-[0_0_20px_rgba(34,211,238,.4)]
        flex items-center justify-center
        active:scale-90
        transition
      "
    >
      <ArrowDown size={30} />
    </button>

    <button
      onClick={() => changeDirection("RIGHT")}
      className="
        w-16 h-16
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        text-white
        shadow-[0_0_20px_rgba(34,211,238,.4)]
        flex items-center justify-center
        active:scale-90
        transition
      "
    >
      <ArrowRight size={30} />
    </button>

  </div>
</div>

      {/* Controls */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() =>
            setPaused(!paused)
          }
          className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:scale-105 transition"
        >
          {paused ? "Resume" : "Pause"}
        </button>

        <button
          onClick={restartGame}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold flex items-center gap-2 hover:scale-105 transition"
        >
          <RotateCcw size={18} />
          Restart
        </button>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-red-500/30 rounded-3xl p-10 text-center">
            <Trophy
              size={70}
              className="mx-auto text-yellow-400"
            />

            <h2 className="text-5xl font-black text-red-500 mt-4">
              Game Over
            </h2>

            <p className="text-2xl text-white mt-4">
              Score: {score}
            </p>

            <button
              onClick={restartGame}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
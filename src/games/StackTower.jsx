import { useEffect, useState } from "react";

function StackTower() {
  const [blocks, setBlocks] = useState([]);
  const [moving, setMoving] = useState(true);
  const [direction, setDirection] = useState(1);
  const [pos, setPos] = useState(0);
  const [speed, setSpeed] = useState(3);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const width = 100;

  // Move block left-right
  useEffect(() => {
    if (gameOver || !moving) return;

    const interval = setInterval(() => {
      setPos((p) => {
        let next = p + direction * speed;

        if (next > 250) {
          setDirection(-1);
          next = 250;
        }
        if (next < 0) {
          setDirection(1);
          next = 0;
        }

        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [direction, speed, moving, gameOver]);

  // Drop block
  const drop = () => {
    if (gameOver) return;

    const last = blocks[blocks.length - 1];

    const newBlock = {
      x: pos,
      y: blocks.length * 30,
    };

    // first block always allowed
    if (!last) {
      setBlocks([newBlock]);
      setScore(1);
      setSpeed(4);
      return;
    }

    // check overlap
    const overlap =
      Math.abs(last.x - newBlock.x) < 30;

    if (!overlap) {
      setGameOver(true);
      return;
    }

    setBlocks([...blocks, newBlock]);
    setScore((s) => s + 1);

    // increase difficulty
    if (score % 3 === 0) {
      setSpeed((s) => Math.min(s + 0.5, 10));
    }
  };

  // keyboard + touch
  useEffect(() => {
    const handle = (e) => {
      if (e.code === "Space") drop();
    };

    window.addEventListener("keydown", handle);
    window.addEventListener("touchstart", drop);

    return () => {
      window.removeEventListener("keydown", handle);
      window.removeEventListener("touchstart", drop);
    };
  });

  const restart = () => {
    setBlocks([]);
    setScore(0);
    setSpeed(3);
    setPos(0);
    setGameOver(false);
    setDirection(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-purple-900 flex items-center justify-center p-4">

      <div className="text-center">

        {/* SCORE */}
        <h1 className="text-4xl font-black text-white mb-2">
          🧱 Stack Tower
        </h1>

        <p className="text-gray-300 mb-4">
          Score:{" "}
          <span className="text-cyan-400 font-bold">
            {score}
          </span>
        </p>

        {/* GAME AREA */}
        <div className="relative w-[300px] h-[400px] bg-black border-2 border-white/20 overflow-hidden rounded-xl">

          {/* stacked blocks */}
          {blocks.map((b, i) => (
            <div
              key={i}
              className="absolute h-[30px] bg-gradient-to-r from-cyan-500 to-purple-600"
              style={{
                width: width,
                bottom: b.y,
                left: b.x,
              }}
            />
          ))}

          {/* moving block */}
          {!gameOver && (
            <div
              className="absolute h-[30px] bg-yellow-400"
              style={{
                width: width,
                bottom: blocks.length * 30,
                left: pos,
              }}
            />
          )}

          {/* base line */}
          <div className="absolute bottom-0 w-full h-1 bg-white/20" />
        </div>

        {/* CONTROLS */}
        <button
          onClick={drop}
          className="mt-5 px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl"
        >
          DROP
        </button>

        {/* GAME OVER */}
        {gameOver && (
          <div className="mt-4 text-red-500 font-black text-2xl">
            GAME OVER 💥
          </div>
        )}

        <button
          onClick={restart}
          className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-lg"
        >
          Restart
        </button>

        <p className="text-gray-400 text-sm mt-3">
          👆 Tap or Press SPACE to drop
        </p>

      </div>
    </div>
  );
}

export default StackTower;
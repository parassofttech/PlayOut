import { useEffect, useRef, useState } from "react";

function CricketGame() {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);

  const [ballY, setBallY] = useState(-40);
  const [ballSpeed, setBallSpeed] = useState(5);

  const [message, setMessage] = useState("🏏 Time your shot perfectly!");
  const [showShot, setShowShot] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameLoop = useRef(null);

  const BATTING_ZONE_START = 470;
  const BATTING_ZONE_END = 560;

  // Start Game Loop
  useEffect(() => {
    if (gameOver) return;

    gameLoop.current = setInterval(() => {
      setBallY((prev) => {
        const next = prev + ballSpeed;

        // Missed Ball
        if (next > 650) {
          handleWicket();
          return -40;
        }

        return next;
      });
    }, 16);

    return () => clearInterval(gameLoop.current);
  }, [ballSpeed, gameOver]);

  // Spacebar Support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        hitBall();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  });

  const nextBall = () => {
    setBallY(-40);

    setBallSpeed((prev) =>
      Math.min(prev + 0.15, 12)
    );
  };

  const handleWicket = () => {
    const newWickets = wickets + 1;

    setMessage("❌ WICKET!");
    setWickets(newWickets);
    setBalls((prev) => prev + 1);

    if (newWickets >= 5) {
      setGameOver(true);
    }
  };

  const hitBall = () => {
    if (gameOver) return;

    setShowShot(true);

    setTimeout(() => {
      setShowShot(false);
    }, 180);

    const position = ballY;

    // PERFECT SIX
    if (
      position >= 510 &&
      position <= 535
    ) {
      setScore((prev) => prev + 6);
      setMessage("🚀 PERFECT SIX!");
    }

    // FOUR
    else if (
      position >= 490 &&
      position <= 550
    ) {
      setScore((prev) => prev + 4);
      setMessage("🔥 FOUR!");
    }

    // DOUBLE
    else if (
      position >= BATTING_ZONE_START &&
      position <= BATTING_ZONE_END
    ) {
      setScore((prev) => prev + 2);
      setMessage("🏏 TWO RUNS!");
    }

    // MISS
    else {
      handleWicket();
      nextBall();
      return;
    }

    setBalls((prev) => prev + 1);
    nextBall();
  };

  const restartGame = () => {
    setScore(0);
    setWickets(0);
    setBalls(0);

    setBallY(-40);
    setBallSpeed(5);

    setMessage("🏏 Time your shot perfectly!");
    setGameOver(false);
  };

  const overs = `${Math.floor(
    balls / 6
  )}.${balls % 6}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-700 to-green-900 flex items-center justify-center p-2 sm:p-4 overflow-x-hidden">

      <div className="w-full max-w-md mx-auto">

        {/* SCOREBOARD */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-5 mb-4">

          <h1 className="text-center text-2xl sm:text-3xl font-black text-white">
            🏏 Cricket Challenge
          </h1>

          <div className="grid grid-cols-3 gap-3 mt-5">

            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-gray-400 text-sm">
                Score
              </p>
              <h2 className="text-yellow-400 text-2xl font-black">
                {score}
              </h2>
            </div>

            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-gray-400 text-sm">
                Wickets
              </p>
              <h2 className="text-red-400 text-2xl font-black">
                {wickets}/5
              </h2>
            </div>

            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-gray-400 text-sm">
                Overs
              </p>
              <h2 className="text-cyan-400 text-2xl font-black">
                {overs}
              </h2>
            </div>

          </div>
        </div>

        {/* GROUND */}
        <div
  className="
    relative
    h-[530px]
    sm:h-[600px]
    md:h-[750px]
    overflow-hidden
    rounded-3xl
    border-4
    border-white/10
    bg-gradient-to-b
    from-sky-400
    via-green-400
    to-green-700
  "
>

          {/* Crowd */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-gray-700" />

          {/* Pitch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-full bg-yellow-200/70" />

          {/* Batting Zone */}
          <div className="absolute left-0 right-0 bottom-[70px] sm:bottom-[80px] md:bottom-[90px]
h-[70px] sm:h-[80px] md:h-[90px] border-y-4 border-red-500 bg-red-500/10">
            <div className="text-center text-red-600 font-black mt-6">
              HIT ZONE
            </div>
          </div>

          {/* Ball */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-600 shadow-[0_0_25px_red]"
            style={{
              top: `${ballY}px`,
            }}
          />

          {/* Bat */}
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl md:text-8xl transition-all duration-150 ${
              showShot
                ? "-rotate-45 scale-125"
                : "rotate-0"
            }`}
          >
            🏏
          </div>

        </div>

        {/* MESSAGE */}
        <div className="text-center mt-4">
          <p className="text-white font-bold text-xl">
            {message}
          </p>
        </div>

        {/* CONTROLS */}
        {!gameOver ? (
          <button
            onClick={hitBall}
            className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xl font-black hover:scale-105 active:scale-95 transition"
          >
            🏏 HIT BALL
          </button>
        ) : (
          <div className="mt-5 bg-black/40 rounded-3xl p-6 text-center">

            <h2 className="text-red-500 text-4xl font-black">
              GAME OVER
            </h2>

            <p className="text-white text-xl mt-3">
              Final Score:
              <span className="text-yellow-400 font-black ml-2">
                {score}
              </span>
            </p>

            <button
              onClick={restartGame}
              className="mt-5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black hover:scale-105 transition"
            >
              🔄 Play Again
            </button>

          </div>
        )}

        <p className="text-center text-gray-300 mt-4 text-sm">
          📱 Tap HIT BALL | ⌨️ Press SPACEBAR
        </p>

      </div>
    </div>
  );
}

export default CricketGame;
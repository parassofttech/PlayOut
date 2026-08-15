import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Target,
  Zap,
  Flame,
} from "lucide-react";

/* =========================================================
   GAME CONFIG
========================================================= */

const TABLE_WIDTH = 360;
const TABLE_HEIGHT = 640;

const BALL_RADIUS = 12;
const HOLE_RADIUS = 18;

/* =========================================================
   POCKETS
========================================================= */

const POCKETS = [
  { x: 25, y: 25 },
  { x: TABLE_WIDTH / 2, y: 20 },
  { x: TABLE_WIDTH - 25, y: 25 },

  { x: 25, y: TABLE_HEIGHT - 25 },
  { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 20 },
  { x: TABLE_WIDTH - 25, y: TABLE_HEIGHT - 25 },
];

/* =========================================================
   INITIAL BALLS
========================================================= */

const INITIAL_BALLS = [
  {
    id: 0,
    x: TABLE_WIDTH / 2,
    y: TABLE_HEIGHT - 160,
    vx: 0,
    vy: 0,
    color: "#f8fafc",
    type: "cue",
    potted: false,
  },

  // Solid
  {
    id: 1,
    x: TABLE_WIDTH / 2,
    y: 150,
    vx: 0,
    vy: 0,
    color: "#eab308",
    type: "solid",
    potted: false,
  },
  {
    id: 2,
    x: TABLE_WIDTH / 2 - 14,
    y: 172,
    vx: 0,
    vy: 0,
    color: "#3b82f6",
    type: "solid",
    potted: false,
  },
  {
    id: 3,
    x: TABLE_WIDTH / 2 + 14,
    y: 172,
    vx: 0,
    vy: 0,
    color: "#ef4444",
    type: "solid",
    potted: false,
  },
  {
    id: 4,
    x: TABLE_WIDTH / 2 - 28,
    y: 194,
    vx: 0,
    vy: 0,
    color: "#a855f7",
    type: "solid",
    potted: false,
  },
  {
    id: 5,
    x: TABLE_WIDTH / 2,
    y: 194,
    vx: 0,
    vy: 0,
    color: "#f97316",
    type: "solid",
    potted: false,
  },
  {
    id: 6,
    x: TABLE_WIDTH / 2 + 28,
    y: 194,
    vx: 0,
    vy: 0,
    color: "#22c55e",
    type: "solid",
    potted: false,
  },
  {
    id: 7,
    x: TABLE_WIDTH / 2 - 42,
    y: 216,
    vx: 0,
    vy: 0,
    color: "#7f1d1d",
    type: "solid",
    potted: false,
  },

  // 8 Ball
  {
    id: 8,
    x: TABLE_WIDTH / 2,
    y: 172,
    vx: 0,
    vy: 0,
    color: "#09090b",
    type: "eight",
    potted: false,
  },

  // Stripes
  {
    id: 9,
    x: TABLE_WIDTH / 2 + 14,
    y: 216,
    vx: 0,
    vy: 0,
    color: "#eab308",
    type: "stripe",
    potted: false,
  },
  {
    id: 10,
    x: TABLE_WIDTH / 2 + 42,
    y: 216,
    vx: 0,
    vy: 0,
    color: "#3b82f6",
    type: "stripe",
    potted: false,
  },
  {
    id: 11,
    x: TABLE_WIDTH / 2 - 14,
    y: 216,
    vx: 0,
    vy: 0,
    color: "#ef4444",
    type: "stripe",
    potted: false,
  },
  {
    id: 12,
    x: TABLE_WIDTH / 2 - 21,
    y: 238,
    vx: 0,
    vy: 0,
    color: "#a855f7",
    type: "stripe",
    potted: false,
  },
  {
    id: 13,
    x: TABLE_WIDTH / 2 + 7,
    y: 238,
    vx: 0,
    vy: 0,
    color: "#f97316",
    type: "stripe",
    potted: false,
  },
  {
    id: 14,
    x: TABLE_WIDTH / 2 - 7,
    y: 238,
    vx: 0,
    vy: 0,
    color: "#22c55e",
    type: "stripe",
    potted: false,
  },
  {
    id: 15,
    x: TABLE_WIDTH / 2 + 21,
    y: 238,
    vx: 0,
    vy: 0,
    color: "#7f1d1d",
    type: "stripe",
    potted: false,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function EightBallPool() {
  const [balls, setBalls] = useState(INITIAL_BALLS);

  const [cueAngle, setCueAngle] = useState(-90);
  const [power, setPower] = useState(20);

  const [isAiming, setIsAiming] = useState(true);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [sound, setSound] = useState(true);

  const [gameMessage, setGameMessage] = useState(
    "Break the rack & sink the balls!"
  );

  const requestRef = useRef(null);

  /* =========================================================
     PHYSICS
  ========================================================= */

  const updatePhysics = () => {
    setBalls((prevBalls) => {
      let moving = false;

      let updated = prevBalls.map((b) => {
        if (b.potted) return b;

        let nx = b.x + b.vx;
        let ny = b.y + b.vy;

        let nvx = b.vx * 0.985;
        let nvy = b.vy * 0.985;

        if (Math.abs(nvx) < 0.05) nvx = 0;
        if (Math.abs(nvy) < 0.05) nvy = 0;

        if (nvx !== 0 || nvy !== 0) {
          moving = true;
        }

        const minX = 25 + BALL_RADIUS;
        const maxX = TABLE_WIDTH - 25 - BALL_RADIUS;

        const minY = 25 + BALL_RADIUS;
        const maxY = TABLE_HEIGHT - 25 - BALL_RADIUS;

        if (nx < minX) {
          nx = minX;
          nvx *= -1;
        }

        if (nx > maxX) {
          nx = maxX;
          nvx *= -1;
        }

        if (ny < minY) {
          ny = minY;
          nvy *= -1;
        }

        if (ny > maxY) {
          ny = maxY;
          nvy *= -1;
        }

        return {
          ...b,
          x: nx,
          y: ny,
          vx: nvx,
          vy: nvy,
        };
      });

      /* =====================================================
         POCKET CHECK
      ===================================================== */

      updated = updated.map((b) => {
        if (b.potted) return b;

        for (const pocket of POCKETS) {
          const dx = b.x - pocket.x;
          const dy = b.y - pocket.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < HOLE_RADIUS) {
            if (b.type === "cue") {
              return {
                ...b,
                x: TABLE_WIDTH / 2,
                y: TABLE_HEIGHT - 160,
                vx: 0,
                vy: 0,
              };
            }

            setScore((s) => s + 100);
            setStreak((s) => s + 1);

            return {
              ...b,
              potted: true,
              vx: 0,
              vy: 0,
              x: -100,
              y: -100,
            };
          }
        }

        return b;
      });

      /* =====================================================
         BALL COLLISIONS
      ===================================================== */

      for (let i = 0; i < updated.length; i++) {
        for (let j = i + 1; j < updated.length; j++) {
          const b1 = updated[i];
          const b2 = updated[j];

          if (b1.potted || b2.potted) continue;

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (
            distance > 0 &&
            distance < BALL_RADIUS * 2
          ) {
            const angle = Math.atan2(dy, dx);

            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            let vx1 =
              b1.vx * cos +
              b1.vy * sin;

            let vy1 =
              b1.vy * cos -
              b1.vx * sin;

            let vx2 =
              b2.vx * cos +
              b2.vy * sin;

            let vy2 =
              b2.vy * cos -
              b2.vx * sin;

            const finalVx1 = vx2;
            const finalVx2 = vx1;

            b1.vx =
              finalVx1 * cos -
              vy1 * sin;

            b1.vy =
              vy1 * cos +
              finalVx1 * sin;

            b2.vx =
              finalVx2 * cos -
              vy2 * sin;

            b2.vy =
              vy2 * cos +
              finalVx2 * sin;

            const overlap =
              BALL_RADIUS * 2 -
              distance;

            const pushX =
              (dx / distance) *
              (overlap / 2);

            const pushY =
              (dy / distance) *
              (overlap / 2);

            b1.x -= pushX;
            b1.y -= pushY;

            b2.x += pushX;
            b2.y += pushY;
          }
        }
      }

      if (!moving && !isAiming) {
        setIsAiming(true);
        setGameMessage("Your turn — aim carefully!");
      }

      return updated;
    });

    requestRef.current =
      requestAnimationFrame(updatePhysics);
  };

  /* =========================================================
     GAME LOOP
  ========================================================= */

  useEffect(() => {
    requestRef.current =
      requestAnimationFrame(updatePhysics);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(
          requestRef.current
        );
      }
    };
  }, [isAiming]);

  /* =========================================================
     SHOOT
  ========================================================= */

  const shootCueBall = () => {
    if (!isAiming) return;

    setIsAiming(false);

    setGameMessage("Shot in progress...");

    const rad =
      (cueAngle * Math.PI) / 180;

    const force = power / 3;

    setBalls((prev) =>
      prev.map((b) => {
        if (b.type === "cue") {
          return {
            ...b,
            vx: Math.cos(rad) * force,
            vy: Math.sin(rad) * force,
          };
        }

        return b;
      })
    );
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetGame = () => {
    setBalls(
      INITIAL_BALLS.map((ball) => ({
        ...ball,
        vx: 0,
        vy: 0,
        potted: false,
      }))
    );

    setScore(0);
    setStreak(0);
    setPower(20);
    setCueAngle(-90);
    setIsAiming(true);

    setGameMessage(
      "New Rack! Aim & Shoot."
    );
  };

  const cueBall = balls.find(
    (b) => b.type === "cue"
  );

  const pottedCount = balls.filter(
    (b) =>
      b.potted &&
      b.type !== "cue"
  ).length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-gradient-to-br
        from-[#030712]
        via-[#0f172a]
        to-[#020617]
        text-white
        flex
        flex-col
        items-center
        px-3
        py-4
        sm:px-5
        select-none
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          w-full
          max-w-[420px]
          flex
          items-center
          justify-between
          gap-3
          mb-3
        "
      >
        <div className="min-w-0">
          <h1
            className="
              text-lg
              sm:text-2xl
              font-black
              bg-gradient-to-r
              from-emerald-400
              via-cyan-400
              to-indigo-400
              bg-clip-text
              text-transparent
              flex
              items-center
              gap-1.5
              truncate
            "
          >
            🎱 Pro 8-Ball Arena
          </h1>

          <p className="text-[10px] sm:text-[11px] text-gray-400">
            Precision Billiards Experience
          </p>
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => setSound(!sound)}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              flex
              items-center
              justify-center
              rounded-xl
              bg-white/10
              hover:bg-white/20
              active:scale-95
              transition
            "
          >
            {sound ? (
              <Volume2 size={16} />
            ) : (
              <VolumeX size={16} />
            )}
          </button>

          <button
            onClick={resetGame}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              flex
              items-center
              justify-center
              rounded-xl
              bg-white/10
              hover:bg-white/20
              active:scale-95
              transition
            "
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div
        className="
          w-full
          max-w-[360px]
          grid
          grid-cols-3
          gap-2
          mb-3
        "
      >
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-2
            text-center
            backdrop-blur-md
          "
        >
          <Target
            size={15}
            className="mx-auto text-emerald-400"
          />

          <p className="text-[8px] text-gray-400 mt-1">
            SCORE
          </p>

          <p className="font-black text-sm text-emerald-300">
            {score}
          </p>
        </div>

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-2
            text-center
            backdrop-blur-md
          "
        >
          <Flame
            size={15}
            className="mx-auto text-orange-400"
          />

          <p className="text-[8px] text-gray-400 mt-1">
            STREAK
          </p>

          <p className="font-black text-sm text-orange-300">
            {streak}x
          </p>
        </div>

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-2
            text-center
            backdrop-blur-md
          "
        >
          <Trophy
            size={15}
            className="mx-auto text-yellow-400"
          />

          <p className="text-[8px] text-gray-400 mt-1">
            POCKETS
          </p>

          <p className="font-black text-sm text-yellow-300">
            {pottedCount}/15
          </p>
        </div>
      </div>

      {/* =====================================================
          RESPONSIVE TABLE WRAPPER
      ===================================================== */}

      <div
        className="
          w-full
          
          flex
          justify-center
          overflow-hidden
        "
      >
        <div
          className="
            relative
            w-[min(360px,calc(100vw-24px))]
            aspect-360/640
            
            rounded-[22px]
            overflow-hidden
            border-[5px]
            sm:border-[6px]
            border-[#3f2b1d]
            shadow-[0_20px_50px_rgba(0,0,0,0.8)]
          "
          style={{
            background:
              "radial-gradient(circle at center, #065f46 0%, #022c22 100%)",
          }}
        >
          {/* =================================================
              INNER GAME CANVAS
          ================================================= */}

          <div
            className="absolute left-0 top-0"
            style={{
              width: TABLE_WIDTH,
              height: TABLE_HEIGHT,

              /*
                Scale the internal 360x640 game
                to the responsive container.
              */
              transformOrigin: "top left",
              transform:
                "scale(var(--game-scale))",
            }}
          >
            {/* POCKETS */}

            {POCKETS.map((p, idx) => (
              <div
                key={idx}
                className="
                  absolute
                  rounded-full
                  bg-black
                  border
                  border-stone-800
                "
                style={{
                  width: HOLE_RADIUS * 2,
                  height: HOLE_RADIUS * 2,
                  left:
                    p.x - HOLE_RADIUS,
                  top:
                    p.y - HOLE_RADIUS,
                  boxShadow:
                    "inset 0 4px 8px rgba(0,0,0,0.95)",
                }}
              />
            ))}

            {/* =================================================
                AIM GUIDE
            ================================================= */}

            {isAiming && cueBall && (
              <>
                <div
                  className="
                    absolute
                    h-[1.5px]
                    bg-white/40
                    origin-left
                    pointer-events-none
                    border-t
                    border-dashed
                    border-white/60
                  "
                  style={{
                    left: cueBall.x,
                    top: cueBall.y,
                    width: "150px",
                    transform:
                      `rotate(${cueAngle}deg)`,
                  }}
                />

                <div
                  className="
                    absolute
                    h-2.5
                    rounded-full
                    origin-left
                    pointer-events-none
                  "
                  style={{
                    left: cueBall.x,
                    top: cueBall.y - 5,
                    width: "180px",
                    background:
                      "linear-gradient(90deg,#d97706,#78350f,#292524)",
                    transform:
                      `rotate(${cueAngle}deg) translateX(${15 + power}px)`,
                    boxShadow:
                      "0 4px 8px rgba(0,0,0,0.5)",
                  }}
                />
              </>
            )}

            {/* =================================================
                BALLS
            ================================================= */}

            {balls.map((b) => {
              if (b.potted) return null;

              return (
                <div
                  key={b.id}
                  className="
                    absolute
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    width:
                      BALL_RADIUS * 2,
                    height:
                      BALL_RADIUS * 2,
                    left:
                      b.x - BALL_RADIUS,
                    top:
                      b.y - BALL_RADIUS,

                    background:
                      b.type === "stripe"
                        ? `radial-gradient(
                            circle at 35% 35%,
                            white 0%,
                            white 40%,
                            ${b.color} 41%,
                            ${b.color} 100%
                          )`
                        : `radial-gradient(
                            circle at 35% 35%,
                            #ffffff 0%,
                            ${b.color} 40%,
                            #000000 100%
                          )`,

                    boxShadow:
                      "0 4px 6px rgba(0,0,0,0.4), inset -2px -3px 4px rgba(0,0,0,0.6)",
                  }}
                >
                  {b.type !== "cue" && (
                    <span
                      className="
                        w-4
                        h-4
                        rounded-full
                        bg-white
                        text-[8px]
                        font-black
                        text-black
                        flex
                        items-center
                        justify-center
                        shadow-inner
                      "
                    >
                      {b.id}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          GAME MESSAGE
      ===================================================== */}

      <div
        className="
          mt-2
          text-[10px]
          sm:text-xs
          text-cyan-300
          text-center
          font-semibold
          min-h-[18px]
        "
      >
        {gameMessage}
      </div>

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <div
        className="
          w-full
          max-w-[420px]
          mt-2
          bg-white/5
          border
          border-white/10
          rounded-2xl
          p-3
          backdrop-blur-md
        "
      >
        {/* POWER HEADER */}

        <div className="flex items-center justify-between mb-2">
          <span
            className="
              text-[10px]
              sm:text-xs
              text-gray-400
              font-semibold
              flex
              items-center
              gap-1
            "
          >
            <Zap
              size={13}
              className="text-amber-400"
            />

            POWER: {power}%
          </span>

          <span
            className="
              text-[10px]
              sm:text-xs
              text-cyan-400
              font-bold
            "
          >
            {isAiming
              ? "Aiming Mode"
              : "Rolling..."}
          </span>
        </div>

        {/* POWER SLIDER */}

        <input
          type="range"
          min="10"
          max="100"
          value={power}
          onChange={(e) =>
            setPower(
              Number(e.target.value)
            )
          }
          className="
            w-full
            accent-cyan-400
            bg-white/20
            rounded-lg
            appearance-none
            h-2
            cursor-pointer
            mb-3
          "
        />

        {/* BUTTONS */}

        <div
          className="
            grid
            grid-cols-3
            gap-2
          "
        >
          <button
            onClick={() =>
              setCueAngle(
                (a) => (a - 10 + 360) % 360
              )
            }
            className="
              min-w-0
              py-2.5
              rounded-xl
              bg-white/10
              hover:bg-white/20
              text-[10px]
              sm:text-xs
              font-black
              active:scale-95
              transition
            "
          >
            ↺ Left
          </button>

          <button
            onClick={shootCueBall}
            disabled={!isAiming}
            className="
              min-w-0
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-emerald-400
              to-cyan-500
              text-black
              text-[10px]
              sm:text-xs
              font-black
              shadow-lg
              shadow-cyan-500/20
              active:scale-95
              transition
              disabled:opacity-50
            "
          >
            SHOOT 🎯
          </button>

          <button
            onClick={() =>
              setCueAngle(
                (a) => (a + 10) % 360
              )
            }
            className="
              min-w-0
              py-2.5
              rounded-xl
              bg-white/10
              hover:bg-white/20
              text-[10px]
              sm:text-xs
              font-black
              active:scale-95
              transition
            "
          >
            Right ↻
          </button>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <p
        className="
          mt-2
          px-4
          text-[9px]
          sm:text-[10px]
          text-gray-500
          text-center
        "
      >
        Use angle controls to aim,
        adjust power slider, and hit
        the shot!
      </p>

      {/* =====================================================
          RESPONSIVE SCALE
      ===================================================== */}

      <style>{`
        .w-\\[min\\(360px\\,calc\\(100vw-24px\\)\\)\\] {
          --game-scale: min(
            1,
            calc((100vw - 24px) / 360)
          );
        }
      `}</style>
    </div>
  );
}

export default EightBallPool;
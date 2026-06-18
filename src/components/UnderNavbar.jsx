import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Grid2X2,
  Gamepad2,
  Trophy,
  User,
} from "lucide-react";

const UnderNavbar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      icon: House,
      path: "/",
    },
    {
      name: "Categories",
      icon: Grid2X2,
      path: "/categories",
    },
    {
      name: "Games",
      icon: Gamepad2,
      path: "/games",
    },
    {
      name: "Leaderboard",
      icon: Trophy,
      path: "/leaderboard",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <div
        className="
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-black/95
        backdrop-blur-xl
        border-t
        border-white/10
      "
      >
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  transition-all
                "
              >
                <Icon
                  size={22}
                  className={
                    active
                      ? "text-cyan-400"
                      : "text-gray-400"
                  }
                />

                <span
                  className={`text-[11px] font-medium ${
                    active
                      ? "text-cyan-400"
                      : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>

                {active && (
                  <div className="absolute bottom-0 h-1 w-10 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Space */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default UnderNavbar;
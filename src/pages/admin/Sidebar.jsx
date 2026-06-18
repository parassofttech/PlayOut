import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Users,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  ShieldCheck,
  Home
} from "lucide-react";

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // 🔥 Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setCollapse(true); // auto collapse on mobile
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/admin/dashboard" },
    
    { name: "User Directory", icon: <Users size={22} />, path: "/admin/users" },
    { name: "Message", icon: <MessageCircle size={22} />, path: "/admin/messages" },
    // { name: "Settings", icon: <Settings size={22} />, path: "/admin/settings" },
  ];

  return (
    <>
      {/* 🔥 Overlay for mobile */}
      {isMobile && !collapse && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setCollapse(true)}
        />
      )}

      <div
        className={`fixed z-50 h-screen ${
          collapse ? "w-20" : "w-72"
        } bg-[#0F172A] text-slate-300 transition-all duration-500 ease-in-out flex flex-col shadow-2xl border-r border-white/5
        
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapse(!collapse)}
          className="absolute right-3 top-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-1 shadow-lg z-50"
        >
          {collapse ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo */}
        <div className="h-20 flex items-center px-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
              <ShieldCheck className="text-white" size={24} />
            </div>
            {!collapse && (
              <h1 className="text-xl font-bold text-white">
                ApniJourney
              </h1>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => isMobile && setCollapse(true)} // 👈 mobile close
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600/20 text-white"
                    : "hover:bg-white/5"
                }`}
              >
                {item.icon}
                {!collapse && <span>{item.name}</span>}
              </NavLink>
            );
          })}
          <button
            className="w-full ml-0 flex items-center gap-3 p-4 rounded-xl hover:bg-red-500/20 text-red-400"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
        

        {/* Footer */}
        <div className="p-4">
          {!collapse && (
            <div className="text-sm text-white">
              Paras Sahu
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";
import Dashboard from "./Dashboard";

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex">

      {/* Sidebar */}
      <aside className="w-72 bg-black/40 border-r border-white/10 p-6">

        <h1 className="text-3xl font-black mb-10">
          Admin Panel
        </h1>

        <nav className="space-y-3">

          <Link
            to="/admin"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10"
          >
            <Users size={20} />
            Users
          </Link>

          <Link
            to="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10"
          >
            <MessageSquare size={20} />
            Messages
          </Link>

          <button
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-500/20 text-red-400"
          >
            <LogOut size={20} />
            Logout
          </button>

        </nav>
      </aside>
      <Dashboard/>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
      

    </div>
  );
};

export default Admin;
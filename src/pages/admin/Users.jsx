import React, { useEffect, useState } from "react";
import { Users as UsersIcon, Search, Calendar, UserCheck, ShieldAlert, Trash2, UserX, Mail } from "lucide-react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/api/user",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      const {success,user,email}= result
      if (success) {
        setUsers(user);
        setFilteredUsers(result.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/user/delete/${id}`, authConfig);
      setUsers(users.filter((user) => user._id !== id));
    
    } catch (err) {
      alert("Error deleting user");
    }
  };

   const handleToggleBlock = async (user) => {
    try {
      await axios.put(`http://localhost:8000/api/user/users/${user._id}/toggleBlock`, {}, authConfig);
      setUsers(users.map((u) => u._id === user._id ? { ...u, blocked: !u.blocked } : u));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <Sidebar/>
       <div className="p-2 ml-15 md:ml-68  lg:ml-68 space-y-6 animate-in fade-in duration-500">
      
      {/* --- Top Header & Search --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="ml-15">
          <h1 className="text-2xl font-extrabold text-slate-800">User Directory</h1>
          <p className="text-slate-500 text-sm">Manage your community and account permissions</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-80 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none ml-3 w-full"
          />

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-[13px] uppercase tracking-wider">
                <th className="p-5 font-semibold">User Details</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Registration</th>
                <th className="p-5 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-blue-50/30 transition-colors group">
                    {/* User Info with Avatar */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                          <div className="flex items-center gap-1 text-slate-500 mt-1">
                            <Mail size={12} />
                            <span className="text-xs">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-5">
                      {user.blocked ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold ring-1 ring-red-200">
                          <ShieldAlert size={12} /> Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold ring-1 ring-emerald-200">
                          <UserCheck size={12} /> Active
                        </span>
                      )}
                    </td>

                    {/* Registration Date (Mockup or real date) */}
                    <td className="p-5 text-slate-500">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={14} />
                        {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleToggleBlock(user)}
                          title={user.blocked ? "Unblock User" : "Block User"}
                          className={`p-2 rounded-xl transition-all shadow-sm active:scale-90 ${
                            user.blocked 
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white" 
                            : "bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white"
                          }`}
                        >
                          {user.blocked ? <UserCheck size={18} /> : <UserX size={18} />}
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          title="Delete User"
                          className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-400 italic">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    </div>
  );
};

export default Users;
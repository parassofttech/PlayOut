import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Mail, User, Clock, Eye, X, Send, Search } from "lucide-react";
import Sidebar from "./Sidebar";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null); // Modal state
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:8000/api/contact";

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const data = res.data.messages || (Array.isArray(res.data) ? res.data : []);
      setMessages(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this communication record?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      if (selectedMsg?._id === id) setSelectedMsg(null);
    } catch (err) {
      alert("Error deleting record");
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
        <div className="w-3 h-3 bg-indigo-500 rounded-full delay-100"></div>
        <div className="w-3 h-3 bg-indigo-500 rounded-full delay-200"></div>
      </div>
    </div>
  );

  return (
    <div>
        <Sidebar/>
        <div className="p-2 ml-15 md:ml-65  lg:ml-68 space-y-6 animate-in fade-in duration-700">
      
      {/* --- Dashboard Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="ml-8">
          <h1 className="text-3xl font-black text-slate-900">Inbound Messages</h1>
          <p className="text-slate-500">Respond to customer inquiries and feedback</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by sender..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Inbox Layout --- */}
      <div className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="p-6">Sender Info</th>
                <th className="p-6">Message Snippet</th>
                <th className="p-6">Received At</th>
                <th className="p-6 text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMessages.map((msg) => (
                <tr key={msg._id} className="group hover:bg-indigo-50/30 transition-all cursor-pointer" onClick={() => setSelectedMsg(msg)}>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-200 uppercase">
                        {msg.name?.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-none">{msg.name}</p>
                        <p className="text-[11px] text-slate-500 mt-1.5">{msg.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 max-w-xs">
                    <p className="text-sm text-slate-600 truncate italic">"{msg.message}"</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <Clock size={14} />
                      {new Date(msg.createdAt || Date.now()).toLocaleDateString('en-GB')}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setSelectedMsg(msg)}
                        className="p-2 text-indigo-500 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(msg._id)}
                        className="p-2 text-red-500 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMessages.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="p-6 bg-slate-50 rounded-full text-slate-300 mb-4 animate-bounce">
                <Mail size={48} />
              </div>
              <p className="text-slate-500 font-bold">Your inbox is clear!</p>
              <p className="text-slate-400 text-sm">No inquiries found at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Message Preview Modal --- */}
      {selectedMsg && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="relative p-8 pb-0">
              <button 
                onClick={() => setSelectedMsg(null)}
                className="absolute right-6 top-6 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-200">
                  {selectedMsg.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedMsg.name}</h2>
                  <p className="text-indigo-600 font-medium text-sm">{selectedMsg.email}</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50/80 mx-4 rounded-3xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap italic">
                "{selectedMsg.message}"
              </p>
            </div>

            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                <Clock size={14} />
                Received on {new Date(selectedMsg.createdAt || Date.now()).toLocaleString()}
              </div>
              <a 
                href={`mailto:${selectedMsg.email}`}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all active:scale-95"
              >
                <Send size={16} /> Reply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ContactMessages;
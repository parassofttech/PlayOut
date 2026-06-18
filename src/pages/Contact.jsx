import React, { useState } from "react";
import { Mail, MessageSquare, Terminal, User, Send, Compass, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" }); // handles success/error responses smoothly

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Client-side quick verification
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please compile all required transmission fields." });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: "success", message: result.message || "Data packets transmitted successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: result.message || "Server rejected transmission array." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Network anomaly detected. Check your api link gateway." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040612] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">
      
      {/* ================= CYBERNETIC BACKDROP GLOWS ================= */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)]  pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10 items-stretch">
        
        {/* ================= LEFT COLUMN: PLATFORM INFO NODES (Spans 5 Cols) ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-950 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <Terminal size={12} />
              <span>Support Terminal</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              Get In <br />
              <span className="bg-cyan-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
              Facing latency errors, account discrepancies, or want to deploy your custom cloud build on PlayOut? Reach out straight away.
            </p>
          </div>

          {/* Quick Informational Grid Channels */}
          <div className="space-y-4 border-t border-white/5 pt-6">
            <div className="flex items-center gap-4 p-4 bg-slate-950/60 border border-white/5 rounded-2xl group hover:border-cyan-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Official Mail</span>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">support@playout.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-950/60 border border-white/5 rounded-2xl group hover:border-purple-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
                <Compass size={18} />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Server Core</span>
                <span className="text-sm font-semibold text-slate-300">Asia-South Central Gateway</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE INPUT DECK (Spans 7 Cols) ================= */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl flex flex-col justify-center">
          
          {/* DYNAMIC RESPONSE FEEDBACK LAYER */}
          {status.type && (
            <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 text-sm font-medium transition-all duration-300 ${
              status.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-950/20" 
                : "bg-red-500/10 border-red-500/30 text-red-400 shadow-md shadow-red-950/20"
            }`}>
              {status.type === "success" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950/60 border border-white/5 focus:border-cyan-500/40 text-white placeholder-slate-500 outline-none shadow-inner transition-all duration-300 text-sm"
                />
              </div>

              {/* Email Client Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950/60 border border-white/5 focus:border-cyan-500/40 text-white placeholder-slate-500 outline-none shadow-inner transition-all duration-300 text-sm"
                />
              </div>
            </div>

            {/* Subject Tracker */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors pointer-events-none">
                <Terminal size={16} />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject Protocol"
                value={formData.subject}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950/60 border border-white/5 focus:border-purple-500/40 text-white placeholder-slate-500 outline-none shadow-inner transition-all duration-300 text-sm"
              />
            </div>

            {/* Core Message Text Box */}
            <div className="relative group">
              <div className="absolute left-4 top-5 text-slate-500 group-focus-within:text-purple-400 transition-colors pointer-events-none">
                <MessageSquare size={16} />
              </div>
              <textarea
                rows="5"
                name="message"
                required
                placeholder="Type details regarding bugs, partnerships or community expansion queries..."
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-950/60 border border-white/5 focus:border-purple-500/40 text-white placeholder-slate-500 outline-none shadow-inner transition-all duration-300 text-sm resize-none"
              />
            </div>

            {/* Multi-gradient Dispatch Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl   bg-linear-to-r from-cyan-500 to-blue-500  text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-950/40 hover:brightness-110 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 group"
            >
              <span>{loading ? "Transmitting Node Arrays..." : "Launch Message"}</span>
              {!loading && <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
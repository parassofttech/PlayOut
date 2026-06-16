import React from "react";
import {
  Gamepad2,
  Trophy,
  Users,
  Zap,
  Shield,
  Target,
  Rocket,
  Star,
  ArrowRight,
  TrendingUp,
  Flame
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Gamepad2 size={26} className="text-cyan-400" />,
      title: "100+ Premium Titles",
      desc: "Play action, puzzle, racing, arcade, strategy and many more exciting games instantly.",
      borderHover: "hover:border-cyan-500/40",
      glow: "group-hover:bg-cyan-500/10"
    },
    {
      icon: <Users size={26} className="text-purple-400" />,
      title: "Active Community",
      desc: "Connect with players worldwide, challenge your friends and enjoy multiplayer hubs.",
      borderHover: "hover:border-purple-500/40",
      glow: "group-hover:bg-purple-500/10"
    },
    {
      icon: <Trophy size={26} className="text-pink-400" />,
      title: "Global Leaderboards",
      desc: "Compete globally, score tracking records, and climb the ranks to become an absolute pro.",
      borderHover: "hover:border-pink-500/40",
      glow: "group-hover:bg-pink-500/10"
    },
    {
      icon: <Zap size={26} className="text-amber-400" />,
      title: "Zero Downloads",
      desc: "No installation required. Heavy cloud assets compile directly within your web client browser.",
      borderHover: "hover:border-amber-500/40",
      glow: "group-hover:bg-amber-500/10"
    },
  ];

  return (
    <div className="min-h-screen bg-[#040612] text-white overflow-hidden relative font-sans selection:bg-cyan-500/30">
      
      {/* ================= HIGH-TECH BACKGROUND ARCHITECTURE ================= */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[35%] right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-pink-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/40 text-cyan-400 mb-6 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-cyan-950/50 backdrop-blur-md">
          <Rocket size={14} className="animate-bounce" />
          <span>Welcome To PlayOut Space</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none">
          About{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            PlayOut
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mt-6 leading-relaxed">
          PlayOut is an optimized cloud arena engine bridging high-fidelity web games 
          with absolute competitive accessibility. No friction, endless adventure.
        </p>
      </section>

      {/* ================= METRICS / STATS BLOCK ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1.5 bg-slate-900/30 border border-white/5 rounded-[2rem] backdrop-blur-xl shadow-2xl">
          {[
            { value: "100+", label: "Arcade Games", textStyle: "text-cyan-400" },
            { value: "10K+", label: "Active Gamers", textStyle: "text-purple-400" },
            { value: "500K+", label: "Live Sessions", textStyle: "text-pink-400" },
            { value: "99%", label: "Satisfaction", textStyle: "text-emerald-400" }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-950/50 border border-white/5 rounded-[1.75rem] p-6 text-center shadow-inner group hover:bg-slate-950 transition-colors duration-300">
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-105 ${stat.textStyle}`}>
                {stat.value}
              </h2>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= UNIQUE CARD FEATURES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Why Choose PlayOut?
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Everything you need for an immersive web terminal operation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/5 rounded-[2rem] p-8 transition-all duration-300 shadow-2xl relative overflow-hidden backdrop-blur-xl ${feature.borderHover}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-slate-800/40 border border-white/5 flex items-center justify-center mb-6 transition-colors duration-500 ${feature.glow}`}>
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-white transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLATFORM MISSION SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <Target size={22} />
                </div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight">Our Core Mission</h2>
              </div>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Our objective is to deliver zero-friction high-grade gaming ecosystems playable directly via basic browser web-sockets. 
                We eradicate boundaries, allowing competitive gameplay and community loops to unify instantly.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto shrink-0 bg-slate-950 p-3 rounded-2xl border border-white/5">
              {[
                { icon: <Shield className="text-green-400" size={20} />, text: "Secure" },
                { icon: <Star className="text-yellow-400" size={20} />, text: "Premium" },
                { icon: <Flame className="text-purple-400" size={20} />, text: "Velocity" }
              ].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/5 min-w-[75px]">
                  {val.icon}
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-wide">{val.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE FOUNDER BLOCK ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-b from-slate-900/40 via-slate-950/80 to-slate-950 border border-white/5 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl relative">
          
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center p-8 md:p-14">
            
            {/* Image Box */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 blur-2xl opacity-30 rounded-full group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative rounded-[2rem] overflow-hidden p-1 bg-gradient-to-b from-cyan-500/30 via-transparent to-purple-500/30 border border-white/10 shadow-2xl">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQGeEbP3nrtzJA/profile-displayphoto-shrink_200_200/B56ZpQCMbyKEAY-/0/1762279346709?e=2147483647&v=beta&t=Y6oUc5PAUMh5STJvJ5u_9Z5QtCyP7cLk5q_2HhKNfwY"
                    alt="Paras Sahu Portrait"
                    className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-[1.75rem] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold tracking-wide uppercase">
                <TrendingUp size={12} />
                <span>Founder & Chief Architect</span>
              </div>

              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Paras Sahu</h2>
                <p className="text-purple-400 text-sm font-semibold tracking-wide uppercase mt-1">Lead Developer, PlayOut</p>
              </div>

              <div className="space-y-4 text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                <p>
                  Hey, I'm Paras Sahu. I engineered PlayOut with an absolute focus on cross-client latency reduction and zero-friction browser deployment. 
                </p>

                <p className="text-xs md:text-sm text-slate-500">
                  By utilizing lightweight multi-threaded rendering mechanics, my target is a clean virtual gaming distribution deck that serves premium casual titles without local overhead requirements.
                </p>
              </div>

              {/* Multi-metrics block inside founder card */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { tag: "100+ Games", border: "border-cyan-500/20", bg: "bg-cyan-500/5", text: "text-cyan-400" },
                  { tag: "10K+ Players", border: "border-purple-500/20", bg: "bg-purple-500/5", text: "text-purple-400" },
                  { tag: "24/7 Engine", border: "border-pink-500/20", bg: "bg-pink-500/5", text: "text-pink-400" }
                ].map((item, id) => (
                  <span key={id} className={`px-4 py-2 border rounded-xl font-bold text-xs 
                  shadow-inner ${item.border} ${item.bg} ${item.text}`}>
                    {item.tag}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= HIGHLY CALL-TO-ACTION BANNER ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-white/5 rounded-[2.5rem] p-10 md:p-14 text-center shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-cyan-500 to-purple-500 blur-[120px] opacity-20 rounded-full pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Ready To Play?</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Dive instantly into curated global servers and unlock your next arcade streak without downloading a single megabyte.
            </p>
            
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold tracking-wide text-sm shadow-xl shadow-cyan-950/40 hover:brightness-110 active:scale-95 transition-all duration-200 group">
                <span>Start Matchmaking</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
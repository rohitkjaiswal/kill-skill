import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Zap, Shield, Target, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-900 font-sans selection:bg-orange-100">
      
      {/* --- Navigation --- */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-slate-900">
          KILL<span className="text-orange-500">SKILL</span>
        </div>
        <div className="hidden md:flex space-x-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-orange-500 transition">Features</a>
          <a href="how-it-works" className="hover:text-orange-500 transition">How it Works</a>
        </div>
        <button 
          onClick={() => navigate("/login")}
          className="px-5 py-2.5 rounded-full cursor-pointer bg-white border border-slate-200 font-semibold shadow-sm hover:bg-slate-50 transition"
        >
          Sign In
        </button>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-16 pb-24 px-4 overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[10%] w-72 h-72 bg-orange-200 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-yellow-200 rounded-full blur-[120px] opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} fill="currentColor" /> <span>The #1 AI Interview Coach</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            Master your next interview with <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Precision Intelligence.
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop guessing. Practice with real-world AI personas, receive instant feedback on your tone, 
            and bridge your skill gaps before the big day.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="group cursor-pointer bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-900/10"
            >
              Start Free Session
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:border-slate-300 transition-all">
              View Demo
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-slate-400 text-sm">
            <span className="flex items-center gap-1"><CheckCircle size={16} /> No credit card required</span>
            <span className="flex items-center gap-1"><CheckCircle size={16} /> 24/7 AI availability</span>
          </div>
        </div>
      </header>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why professionals choose Kill-Skill</h2>
            <div className="h-1 w-50 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Target className="text-orange-500" />, title: "Hyper-Realistic Scenarios", desc: "AI mimics specific company cultures and interviewer personalities from Google to startups." },
              { icon: <Zap className="text-amber-500" />, title: "Instant Performance Analytics", desc: "Get detailed reports on your technical accuracy, confidence levels, and filler word usage." },
              { icon: <Shield className="text-slate-800" />, title: "Safe Practice Space", desc: "Make mistakes where it doesn't count. Build muscle memory before the actual high-stakes call." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Footer --- */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 Kill-Skill. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { Lock, Mail, Loader2, Sparkles, ShieldCheck, Trophy } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Access Denied: Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white-900 overflow-hidden">
      
      {/* --- Left Side: Visual Experience (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-transparent z-0"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="text-2xl font-black tracking-tighter text-gray italic">
            KILL<span className="text-orange-500">SKILL</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-5xl font-bold text-green leading-tight mb-6">
            The secret to high-stakes <span className="text-orange-500 underline decoration-2 underline-offset-8">interviews.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Log in to access your AI-driven performance metrics and resume-specific practice sessions.
          </p>
        </div>

        {/* Floating Social Proof/Status Card */}
        <div className="relative z-10 flex gap-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-lg"><Trophy size={20} className="text-orange-500" /></div>
            <div>
              <div className="text-green-500 font-bold text-sm">92% Success Rate</div>
              <div className="text-gray-500 text-xs">For active trainees</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: The Branded Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white-50 lg:rounded-l-[40px]  z-20">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-900">KILL<span className="text-orange-500">SKILL</span></h1>
          </div>

          <div className="mb-10 text-left">
            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              Welcome back <Sparkles className="text-orange-500" size={24} />
            </h3>
            <p className="text-slate-500 mt-2">Enter your credentials to continue your path to mastery.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-slate-800"
                  onChange={handleForm}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                <Link to="/forgot" className="text-xs font-bold text-orange-600">Forgot Security Key?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-slate-800"
                  onChange={handleForm}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-orange-600 transition-all duration-500 flex items-center justify-center gap-3 group shadow-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Initiate Login"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
            <p className="text-slate-500 text-sm">
              New candidate? <Link to="/signup" className="text-orange-600 font-black hover:underline underline-offset-4">Join the program</Link>
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <ShieldCheck size={14} /> Encrypted Session Secure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
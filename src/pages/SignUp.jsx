import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, Lock, Loader2, Trophy, Fingerprint, Star } from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      toast.success("Account Created! Redirecting...", { position: "top-center" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white-900 overflow-hidden">
      <Toaster />

      {/* --- left Side: Registration Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white lg:rounded-l-[40px]  z-30">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <div className="lg:hidden mb-6">
               <span className="text-2xl font-black italic">KILL<span className="text-orange-500">SKILL</span></span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Create Account <Fingerprint className="text-orange-500" size={28} />
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Begin your personalized interview training.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name */}
            <div className="group space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-slate-800 font-medium"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="group space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-slate-800 font-medium"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="group space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 transition-all text-slate-800 font-medium"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-slate-900 text-white py-4 mt-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-600 transition-all duration-500 flex items-center justify-center gap-3 group shadow-2xl shadow-orange-900/20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Deploy Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">
              Already in the program?{" "}
              <Link to="/login" className="text-orange-600 font-black hover:underline underline-offset-4 decoration-2">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* --- right Side: The "Mission" Side (Visual Hook) --- */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/800 via-transparent to-transparent z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
        
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
        <div className="relative z-10 flex gap-4 text">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-lg"><Trophy size={20} className="text-orange-500" /></div>
            <div>
              <div className="text-green-500 font-bold text-sm">92% Success Rate</div>
              <div className="text-gray-500 text-xs">For active trainees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
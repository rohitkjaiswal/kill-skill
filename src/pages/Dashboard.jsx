import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import { BookOpen, ArrowRight ,Briefcase, Clock, Sparkles} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const fetchSessions = async () => {
    // console.log("Fetching sessions...");
    //console.log("TOKEN:", localStorage.getItem("token"));
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return  toast.error("enter the details") ;

    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
    } catch (error) {
      console.log(error.response);
      //toast.error("Error creating session. Please try again.");
      return;
    }

    setRole("");
    setExperience("");
    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-5">
      <Toaster/>
      {/* Header */}
      <Navbar />
      <div className="relative mb-10 pb-6 border-b border-slate-100 p-5">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-1 w-1 rounded-full bg-orange-500"></span>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">
            Interview Command Center
          </p>
        </div>
        <p className="text-slate-400 mt-1 text-sm">
          Manage your preparation sessions and track your career growth.
        </p>
      </div>

      {/* Create Session Card */}


<div className="relative overflow-hidden bg-white border border-slate-100 p-8 rounded-3xl shadow-sm mb-10 group">
  {/* Decorative Gradient Flare */}
  <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl group-hover:bg-orange-100 transition-colors duration-500" />

  <div className="relative z-10">
    <div className="flex items-center gap-2 mb-6">
      <div className="p-2 bg-orange-50 rounded-lg">
        <Sparkles size={18} className="text-orange-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-800">Start New Prep</h2>
        <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Configure your AI interviewer</p>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row gap-5">
      {/* Role Input Container */}
      <div className="relative flex-1 group/input">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-orange-500 transition-colors">
          <Briefcase size={18} />
        </div>
        <input
          placeholder="Target Role (e.g. Frontend Developer)"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full bg-slate-50 border-none pl-12 pr-4 py-4 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400/20 focus:bg-white transition-all outline-none font-medium"
        />
      </div>

      {/* Experience Input Container */}
      <div className="relative w-full lg:w-56 group/input">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-orange-500 transition-colors">
          <Clock size={18} />
        </div>
        <input
          placeholder="Experience"
          name="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
          className="w-full bg-slate-50 border-none pl-12 pr-4 py-4 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-400/20 focus:bg-white transition-all outline-none font-medium"
        />
      </div>

      <button
        onClick={createSession}
        className="relative cursor-pointer group overflow-hidden bg-slate-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95 duration-200"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Initialize Session <ArrowRight></ArrowRight>
        </span>
        
        {/* Hover Slide Effect */}
        <div className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 " />
      </button>
    </div>
  </div>
</div>

      {/* Sessions */}
      {sessions.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No sessions yet 😕</p>
          <p className="text-sm">Create your first session to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {sessions.map((s) => (
    <div
      key={s._id}
      onClick={() => navigate(`/interview/${s._id}`)}
      className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-orange-50 rounded-full transition-transform group-hover:scale-150 duration-500" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
             <BookOpen size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
            {s.experience} Exp
          </span>
        </div>

        <h2 className="font-bold text-xl text-slate-800 group-hover:text-orange-600 transition-colors">
          {s.role}
        </h2>
        
        <p className="text-slate-500 text-sm mt-1 line-clamp-1">
          Customized prep for {s.role} roles.
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-400">Ready to start</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
            Start <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default Dashboard;

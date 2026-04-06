import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Briefcase, ArrowUpRight,Calendar } from 'lucide-react';
import ShareExperienceModal from '../components/ShareExperienceModal';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import Navbar from '../components/Navbar';


const InterviewExperiences = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        console.log("fetching ....")
        const res = await axiosInstance.get(API_PATHS.EXPERIENCE.GET_ALL);
        console.log("Fetched experiences:", res.data?.experiences);
        setExperiences(res.data);
      } catch (error) {
        console.log(error.response || error.message);
        setExperiences([]);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Interview <span className="text-orange-600">Archive</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Real insights from real candidates.
          </p>
        </div>

        <button
          onClick={() => setShareModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-orange-600"
        >
          <Plus size={20} /> Share Your Story
        </button>
      </div>

      {shareModalOpen && (
        <ShareExperienceModal
          onClose={() => setShareModalOpen(false)}
          isOpen={true}
        />
      )}

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 bg-white p-4 rounded-3xl flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-50 pl-12 pr-4 py-3 rounded-xl outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {['All', 'Google', 'Amazon', 'Meta'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-xl ${
                activeFilter === f
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-slate-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-6 py-3 border rounded-xl">
          <Filter size={18} /> Advanced
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(experiences) &&
          experiences.map((exp) => (
            <ExperienceCard key={exp._id || exp.id} data={exp} />
          ))}
      </div>
    </div>
  );
};


    const ExperienceCard = ({ data }) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors" />

      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Animated Icon Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-violet-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
              {data?.company?.[0] || "?"}
            </div>
          </div>

          <span className="text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full bg-slate-900 text-white group-hover:bg-orange-500 transition-colors shadow-sm">
            {data?.status || "In Review"}
          </span>
        </div>

        {/* Title and Metadata */}
        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1 group-hover:text-orange-500 transition-colors">
          {data?.role || "Software Architect"}
        </h3>
        
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Briefcase size={15} className="text-orange-500" />
            {data?.company || "TechCorp"}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-slate-400">{data?.domain || "FinTech"}</span>
        </div>

        {/* Quote Section with Aesthetic Left Border */}
        <div className="relative pl-4 border-l-2 border-indigo-100 italic text-slate-600 leading-relaxed py-1 mb-4">
          <p className="text-[0.95rem]">
            "{data?.summary || "Transforming complex requirements into scalable cloud solutions."}"
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
            {data?.author?.split(" ").map(n => n[0]).join("") || "A"}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-none mb-1">
              {data?.author || "Anonymous User"}
            </p>
            <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Calendar size={10} />
              {data?.date || "Mar 2024"}
            </p>
          </div>
        </div>

        {/* Dynamic Action Button */}
        <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45 shadow-inner">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default InterviewExperiences;
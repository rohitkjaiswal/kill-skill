import React, { useContext, useState } from 'react';
import { X, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../contexts/AuthContext';

const ShareExperienceModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const [experience, setExperience] = useState({
    company: "",
    role: "",
    domain: "",
    status: "",
    rounds: "",
    questions: "",
    tips: "",
    experienceLevel: ""
  });

  const {user}=useContext(AuthContext);

  if (!isOpen) return null;

  console.log(user.email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.EXPERIENCE.CREATE, {
        ...experience,
        questions: experience.questions.split("\n") // split textarea lines into array
      });
      console.log("Experience saved:", res.data);
      onClose();
    } catch (error) {
      console.error("Error saving experience:", error.response?.data || error.message);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!experience.company || !experience.role)) {
      alert("Please fill Company and Role before continuing.");
      return;
    }
    if (step === 2 && !experience.rounds) {
      alert("Please add round-wise details before continuing.");
      return;
    }
    setStep(s => s + 1);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Share Interview Experience</h2>
            <p className="text-xs text-slate-500 mt-1">
              Step {step} of 3: {step === 1 ? 'Basic Info' : step === 2 ? 'The Process' : 'Advice'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <InputLabel label="Company Name" name="company" value={experience.company} onChange={handleChange} placeholder="e.g. Microsoft" />
                <InputLabel label="Role" name="role" value={experience.role} onChange={handleChange} placeholder="e.g. System Architect" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectLabel label="Domain" name="domain" value={experience.domain} onChange={handleChange} options={['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile']} />
                <SelectLabel label="Result" name="status" value={experience.status} onChange={handleChange} options={['Selected', 'Rejected', 'Waitlisted', 'Offered']} />
              </div>
              <InputLabel label="Experience Level" name="experienceLevel" value={experience.experienceLevel} onChange={handleChange} placeholder="e.g. 2 yrs" />
              <div className="p-4 bg-blue-50 rounded-2xl flex gap-3 items-start">
                <ShieldCheck className="text-blue-600 mt-0.5" size={18} />
                <p className="text-xs text-blue-700 leading-relaxed">
                  <strong>Privacy Note:</strong> Your identity is protected. We only show your first name and initial to keep the community authentic.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Round-wise Details</label>
                <textarea 
                  name="rounds"
                  value={experience.rounds}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none h-32"
                  placeholder="Round 1: Online Assessment... Round 2: Technical Interview..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Specific Questions Asked</label>
                <textarea 
                  name="questions"
                  value={experience.questions}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none h-24"
                  placeholder="What were the exact LeetCode or System Design questions?"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">One last thing!</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Any specific tips for future candidates? What resources helped you the most?
              </p>
              <textarea 
                name="tips"
                value={experience.tips}
                onChange={handleChange}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none h-24 text-left"
                placeholder="Study the STAR method, review basic TCP/IP..."
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between gap-4">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            Back
          </button>
          
          <button 
            onClick={() => step < 3 ? nextStep() : handleSubmit()}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95"
          >
            {step === 3 ? 'Publish Experience' : 'Next Step'}
            {step < 3 && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InputLabel = ({ label, placeholder, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
      placeholder={placeholder}
    />
  </div>
);

const SelectLabel = ({ label, options, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none cursor-pointer"
    >
      <option value="">Select...</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default ShareExperienceModal;

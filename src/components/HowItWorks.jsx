import React from 'react';
import { Upload, Cpu, MessageSquare, LineChart, ChevronRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Set the Scene",
      description: "Upload your resume or paste a job description. Our AI analyzes the specific requirements and company culture.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI Persona Matching",
      description: "We generate a custom interviewer persona—from a 'tough technical lead' to a 'friendly HR manager'.",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Interview",
      description: "Engage in a voice or text-based session. The AI reacts dynamically to your answers, just like a human would.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Deep Insights",
      description: "Receive a 'Kill-Skill' score based on your body language, technical accuracy, and keyword optimization.",
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Four Steps to <span className="text-orange-500">Interview Mastery</span>
          </h2>
          <p className="text-lg text-slate-600">
            We’ve simplified the science of interviewing into a seamless 4-step feedback loop.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase">Step 0{index + 1}</span>
                    <div className="h-px w-8 bg-slate-100"></div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700 transition">
            See a sample report <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
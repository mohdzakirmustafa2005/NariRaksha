import React from 'react';
import { ShieldCheck, FileText, Lock, Activity, Sparkles, MessageSquare, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HeroProps {
  onFileComplaint: () => void;
  onLegalHelp: () => void;
}

const data = [
  { name: 'Jan', cases: 400 },
  { name: 'Feb', cases: 300 },
  { name: 'Mar', cases: 550 },
  { name: 'Apr', cases: 480 },
  { name: 'May', cases: 600 },
];

const Hero: React.FC<HeroProps> = ({ onFileComplaint, onLegalHelp }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-24 px-4 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          <div className="md:w-1/2 space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-100 backdrop-blur-sm text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
              <ShieldCheck size={16} />
              <span>Government Verified & Secure Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Stand Against <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dowry & Jahez</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Empowering women with a secure, anonymous reporting channel directly to special police units. 
              <span className="block mt-2 font-medium text-slate-800">Now with Real-time AI Legal Assistance.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={onFileComplaint}
                className="bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                File Complaint
              </button>
              <button 
                onClick={onLegalHelp}
                className="group bg-white text-slate-700 border border-slate-200 text-lg font-semibold px-8 py-4 rounded-xl shadow-sm hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition flex items-center justify-center gap-2"
              >
                <Sparkles size={20} className="text-purple-500 group-hover:scale-110 transition-transform" />
                Ask Legal AI
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-500 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                24/7 Police Integration
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
                End-to-End Encrypted
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full animate-slideInRight">
             <div className="relative">
                {/* Floating Card AI */}
                <div onClick={onLegalHelp} className="absolute -top-10 -right-6 bg-white p-4 rounded-xl shadow-2xl border border-purple-100 z-20 cursor-pointer hover:scale-105 transition hidden md:block animate-bounce-slow">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-800">Ask NariRaksha AI</p>
                        <p className="text-[10px] text-slate-500">Online • Drafting Complaint...</p>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 italic">
                     "Draft a complaint letter for dowry..."
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative z-10">
                  <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-green-500"/>
                    Live Statistics
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip 
                          cursor={{fill: 'transparent'}}
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                        />
                        <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-bold text-slate-800">12,450+</p>
                      <p className="text-xs text-slate-500">Complaints Resolved</p>
                    </div>
                    <div className="text-right">
                       <p className="text-green-600 font-bold text-sm">+18%</p>
                       <p className="text-xs text-slate-500">Efficiency Rate</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce">
          <ArrowDown size={24} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
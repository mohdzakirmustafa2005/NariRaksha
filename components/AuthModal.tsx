import React, { useState } from 'react';
import { User, Shield, EyeOff, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onRegister: (profile: UserProfile) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onRegister }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      id: Date.now().toString(),
      name: isAnonymous ? `Protected_User_${Math.floor(Math.random() * 10000)}` : name,
      mobile: isAnonymous ? '' : mobile,
      isAnonymous
    };
    onRegister(profile);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn">
        <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <Shield size={48} className="mx-auto mb-4 text-blue-400 relative z-10" />
          <h2 className="text-2xl font-bold relative z-10">Welcome to NariRaksha</h2>
          <p className="text-slate-400 text-sm mt-1 relative z-10">Secure & Confidential Reporting Platform</p>
        </div>
        
        <form onSubmit={handleRegister} className="p-6 space-y-6">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2
                ${!isAnonymous ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <User size={16} /> Standard
            </button>
            <button
              type="button"
              onClick={() => setIsAnonymous(true)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2
                ${isAnonymous ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <EyeOff size={16} /> Anonymous
            </button>
          </div>

          <div className="space-y-4 min-h-[140px]">
            {isAnonymous ? (
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl animate-fadeIn">
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-600 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-blue-800 text-sm">Safe Mode Enabled</h4>
                    <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                      Your identity will be hidden from the public dashboard. 
                      You will be assigned a random alias: <br/>
                      <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 mt-1 inline-block font-bold">Protected_User_XXXX</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    required={!isAnonymous}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    required={!isAnonymous}
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter 10-digit number"
                  />
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            {isAnonymous ? 'Create Anonymous Profile' : 'Register Securely'} <ArrowRight size={18} />
          </button>

          <p className="text-center text-[10px] text-slate-400">
            By continuing, you agree to our Terms of Service. Your data is end-to-end encrypted.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
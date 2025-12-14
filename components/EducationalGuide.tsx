import React from 'react';
import { ShieldAlert, FileCheck, PhoneCall, Gavel, ArrowRight, AlertTriangle, CheckSquare } from 'lucide-react';

const EducationalGuide: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <ShieldAlert size={16} /> Knowledge is Power
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">What To Do If Harassed?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Follow this government-recommended protocol to ensure your safety and build a strong legal case.</p>
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition">
            <div className="absolute top-0 right-0 bg-red-200 text-red-800 text-xs font-bold px-3 py-1 rounded-bl-xl">STEP 1</div>
            <div className="mb-4 bg-red-100 w-12 h-12 rounded-full flex items-center justify-center text-red-600">
              <PhoneCall size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Immediate Safety</h3>
            <p className="text-sm text-slate-600 mb-4">If you are in physical danger, do not wait.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <span>Call <strong>112 (Police)</strong> or <strong>181 (Women Helpline)</strong>.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-red-500 mt-0.5 shrink-0" />
                <span>Leave the premises if possible. Go to a parent's house or shelter.</span>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition">
            <div className="absolute top-0 right-0 bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-xl">STEP 2</div>
            <div className="mb-4 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600">
              <FileCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Gather Evidence</h3>
            <p className="text-sm text-slate-600 mb-4">Documentation is crucial for IPC 498A cases.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <span>Save WhatsApp chats/SMS demanding dowry.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <span>Keep medical reports of any physical injury.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <span>List your <strong>Stridhan</strong> (Jewelry/Gifts).</span>
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition">
            <div className="absolute top-0 right-0 bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-xl">STEP 3</div>
            <div className="mb-4 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600">
              <Gavel size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Legal Action</h3>
            <p className="text-sm text-slate-600 mb-4">File a formal complaint.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>Visit the nearest <strong>Mahila Thana</strong>.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>File a <strong>Zero FIR</strong> if jurisdiction is an issue.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckSquare size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>Approach a Protection Officer (PWDVA).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Laws Section */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">Understand Your Rights</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 bg-yellow-500 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-lg text-yellow-400">IPC Section 498A</h4>
                    <p className="text-slate-300 text-sm">Makes cruelty by husband or relatives a non-bailable offense punishable by up to 3 years jail.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-lg text-blue-400">Dowry Prohibition Act, 1961</h4>
                    <p className="text-slate-300 text-sm">Giving or taking dowry is a crime punishable with imprisonment for at least 5 years.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                <h4 className="font-bold text-xl mb-2">Need Help Drafting?</h4>
                <p className="text-xs text-slate-300 mb-4">Our AI can write a complaint letter for you in seconds.</p>
                <button className="bg-white text-slate-900 font-bold py-2 px-6 rounded-full text-sm hover:bg-purple-100 transition flex items-center justify-center gap-2 w-full">
                  Try AI Assistant <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalGuide;
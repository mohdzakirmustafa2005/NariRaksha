import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Upload, CheckCircle, AlertCircle, EyeOff } from 'lucide-react';
import { INDIAN_STATES } from '../constants';
import { UserProfile } from '../types';

interface ComplaintFormProps {
  onSubmitSuccess: () => void;
  userProfile: UserProfile | null;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmitSuccess, userProfile }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    relation: 'Self',
    mobile: '',
    victimName: '',
    victimAge: '',
    victimMarriageDate: '',
    accusedName: '',
    accusedAddress: '',
    state: '',
    district: '',
    description: '',
    evidenceFiles: [] as File[]
  });

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        applicantName: userProfile.name,
        mobile: userProfile.mobile
      }));
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Progress Bar */}
        <div className="bg-slate-50 p-6 border-b border-slate-100">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step {step} of 4</span>
            <span className="text-xs font-bold text-blue-600">{Math.round((step / 4) * 100)}% Completed</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          
          {/* Step 1: Applicant Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Applicant Details</h2>
                {userProfile?.isAnonymous && (
                  <div className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <EyeOff size={12} /> Anonymous Mode Active
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                  <input 
                    required 
                    name="applicantName" 
                    value={formData.applicantName} 
                    onChange={handleChange} 
                    readOnly={userProfile?.isAnonymous}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${userProfile?.isAnonymous ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
                    placeholder="Enter full name" 
                  />
                  {userProfile?.isAnonymous && <p className="text-xs text-slate-400 mt-1">Using generated alias for safety.</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Relationship to Bride</label>
                  <select name="relation" value={formData.relation} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Self (Bride)</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Brother/Sister</option>
                    <option>Legal Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
                  <input 
                    required={!userProfile?.isAnonymous} 
                    type="tel" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                    readOnly={userProfile?.isAnonymous}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${userProfile?.isAnonymous ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
                    placeholder={userProfile?.isAnonymous ? "Not shared (Anonymous)" : "10-digit number"} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Victim Info */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-800">Victim / Bride Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bride's Name</label>
                  <input required name="victimName" value={formData.victimName} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                  <input required type="number" name="victimAge" value={formData.victimAge} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date of Marriage</label>
                  <input type="date" name="victimMarriageDate" value={formData.victimMarriageDate} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Accused Info */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-800">Accused Party Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Primary Accused (Groom/Father-in-law)</label>
                  <input required name="accusedName" value={formData.accusedName} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Name of main accused" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Address of Accused</label>
                  <textarea required name="accusedAddress" value={formData.accusedAddress} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24" placeholder="Full address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">State (Incident Location)</label>
                  <select required name="state" value={formData.state} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">District</label>
                  <input required name="district" value={formData.district} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="District name" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Evidence & Description */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-800">Evidence & Details</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-yellow-600 shrink-0 mt-1" size={20} />
                <p className="text-sm text-yellow-800">
                  <strong>Legal Notice:</strong> False complaints are punishable under IPC. Ensure all details provided are true to your knowledge.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Describe the Incident / Demands</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-32" placeholder="Describe the dowry demands (cash, items, car), dates of harassment, and threats made..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Proof (Audio/Video/Photos)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition cursor-pointer relative">
                  <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                  <p className="text-slate-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400 mt-1">MP3, MP4, JPG, PDF (Max 100MB)</p>
                </div>
                {formData.evidenceFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.evidenceFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                        <CheckCircle size={14} />
                        {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-slate-600 font-medium px-4 py-2 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft size={18} /> Previous
              </button>
            ) : <div></div>}

            {step < 4 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EducationalGuide from './components/EducationalGuide';
import ComplaintForm from './components/ComplaintForm';
import PoliceDashboard from './components/PoliceDashboard';
import LegalAssistant from './components/LegalAssistant';
import AuthModal from './components/AuthModal';
import { UserRole, ComplaintStatus, UserProfile } from './types';
import { CheckCircle2 } from 'lucide-react';

// Mock Component for User Dashboard (simplified)
const UserDashboard = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">My Complaints</h1>
    <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
      <div className="flex justify-between items-start pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Harassment & Dowry Demand</h3>
          <p className="text-sm text-slate-500">ID: NR-2023-8821 • Filed on 24 Oct, 2023</p>
        </div>
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
          {ComplaintStatus.UNDER_VERIFICATION}
        </span>
      </div>
      <div className="pt-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Police Remarks:</h4>
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded">
          "Initial verification in progress. Statement recording scheduled for 28th Oct at Mahila Thana." - Sub-Inspector R. Singh
        </p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [role, setRole] = useState<UserRole>('victim');
  const [showSuccess, setShowSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const toggleRole = () => {
    setRole(prev => prev === 'victim' ? 'police' : 'victim');
    setCurrentPage('home'); // Reset to home on switch
  };

  const handleRegister = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleComplaintSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentPage('dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {!userProfile && <AuthModal onRegister={handleRegister} />}

      <Header 
        currentRole={role} 
        userProfile={userProfile} 
        setPage={setCurrentPage} 
        toggleRole={toggleRole} 
      />
      
      <main className="flex-grow relative">
        {/* Success Modal Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 animate-scaleIn">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Complaint Submitted</h2>
              <p className="text-slate-600">
                Your complaint ID is <span className="font-mono font-bold text-slate-900">NR-2023-XXXX</span>. 
                It has been securely routed to the Women's Police Station.
              </p>
            </div>
          </div>
        )}

        {/* Route Handling */}
        {currentPage === 'home' && (
          <>
            <Hero 
              onFileComplaint={() => setCurrentPage('file-complaint')} 
              onLegalHelp={() => setCurrentPage('legal-ai')}
            />
            <EducationalGuide />
          </>
        )}
        
        {currentPage === 'file-complaint' && <ComplaintForm onSubmitSuccess={handleComplaintSuccess} userProfile={userProfile} />}
        
        {currentPage === 'dashboard' && <UserDashboard />}
        
        {currentPage === 'police-dashboard' && role === 'police' && <PoliceDashboard />}
        {currentPage === 'police-dashboard' && role !== 'police' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
            <p className="text-slate-600">Please switch to Police View mode in the header.</p>
          </div>
        )}

        {currentPage === 'legal-ai' && <LegalAssistant />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2023 NariRaksha. Government of India Initiative (Concept MVP).</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Use</a>
          <a href="#" className="hover:text-white transition">Helpline Directory</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
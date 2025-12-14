import React from 'react';
import { Shield, AlertTriangle, Menu, X, UserCircle, EyeOff } from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  userProfile: UserProfile | null;
  setPage: (page: string) => void;
  toggleRole: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, userProfile, setPage, toggleRole }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Emergency Strip */}
      <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold flex justify-between items-center animate-pulse">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} />
          <span>EMERGENCY: DIAL 112 (Police) or 181 (Women Helpline)</span>
        </div>
        <button onClick={toggleRole} className="text-xs bg-red-800 px-2 py-1 rounded hover:bg-red-900 transition">
           Mode: {currentRole === 'police' ? 'Police View' : 'Citizen View'}
        </button>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setPage('home')}
        >
          <div className="bg-blue-600 p-2 rounded-full text-white">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">NariRaksha</h1>
            <p className="text-xs text-slate-500 font-medium">National Anti-Dowry Portal</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center font-medium text-slate-600">
          <button onClick={() => setPage('home')} className="hover:text-blue-600 transition">Home</button>
          <button onClick={() => setPage('legal-ai')} className="hover:text-blue-600 transition flex items-center gap-1">
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">AI</span> Legal Help
          </button>
          <button onClick={() => setPage('dashboard')} className="hover:text-blue-600 transition">Track Complaint</button>
          
          {userProfile && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
              {userProfile.isAnonymous ? (
                <EyeOff size={16} className="text-slate-500" />
              ) : (
                <UserCircle size={16} className="text-blue-600" />
              )}
              <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">
                {userProfile.name}
              </span>
            </div>
          )}

          {currentRole === 'police' ? (
             <button 
             onClick={() => setPage('police-dashboard')}
             className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition flex items-center gap-2"
           >
             Police Login
           </button>
          ) : (
            <button 
              onClick={() => setPage('file-complaint')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg hover:shadow-blue-200"
            >
              File Complaint
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg">
          {userProfile && (
            <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
               {userProfile.isAnonymous ? <EyeOff size={16} /> : <UserCircle size={16} />}
               <span className="text-sm font-bold text-slate-800">{userProfile.name}</span>
            </div>
          )}
          <button onClick={() => { setPage('home'); setIsMenuOpen(false); }} className="text-left py-2">Home</button>
          <button onClick={() => { setPage('legal-ai'); setIsMenuOpen(false); }} className="text-left py-2">Legal AI Assistant</button>
          <button onClick={() => { setPage('dashboard'); setIsMenuOpen(false); }} className="text-left py-2">Track Status</button>
          <button 
            onClick={() => { setPage('file-complaint'); setIsMenuOpen(false); }}
            className="bg-blue-600 text-white py-3 rounded-lg text-center font-bold"
          >
            File New Complaint
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
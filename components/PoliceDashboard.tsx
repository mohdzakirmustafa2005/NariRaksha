import React from 'react';
import { MOCK_COMPLAINTS } from '../constants';
import { ComplaintStatus } from '../types';
import { Eye, Download, Search, Filter, ShieldAlert } from 'lucide-react';

const PoliceDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="text-blue-800" />
            Police Jurisdiction Dashboard
          </h1>
          <p className="text-slate-500 text-sm">Welcome, Inspector (Mahila Thana, Lucknow Zone)</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search Complaint ID..." />
          </div>
          <button className="p-2 border rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                <th className="p-4 font-semibold">Complaint ID</th>
                <th className="p-4 font-semibold">Date Filed</th>
                <th className="p-4 font-semibold">Victim / Complainant</th>
                <th className="p-4 font-semibold">Accused</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Evidence</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_COMPLAINTS.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-blue-600">{complaint.id}</td>
                  <td className="p-4 text-slate-600">{complaint.dateFiled}</td>
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{complaint.victimName}</div>
                    <div className="text-xs text-slate-500">Rel: {complaint.applicantRelation}</div>
                  </td>
                  <td className="p-4 text-slate-800">{complaint.accusedName}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${complaint.status === ComplaintStatus.SUBMITTED ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${complaint.status === ComplaintStatus.UNDER_VERIFICATION ? 'bg-orange-100 text-orange-700' : ''}
                      ${complaint.status === ComplaintStatus.ACTION_TAKEN ? 'bg-green-100 text-green-700' : ''}
                    `}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-slate-600 text-sm">
                      <Download size={14} />
                      {complaint.evidenceCount} Files
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition inline-flex items-center gap-1">
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Input } from '../../../components/ui/Input';
import {
  User,
  Shield,
  Key,
  Smartphone,
  Calendar
} from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#006765] text-white flex items-center justify-center font-bold text-lg font-serif">
            {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-[#151C27]">{user?.name || 'Admin Supervisor'}</h1>
              <span className="text-[10px] font-bold text-white bg-[#006765] px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-[#555E74] mt-0.5">{user?.email || 'admin@placezy.com'} • Verified Staff</p>
            <span className="text-[10px] text-[#006765] font-semibold mt-1 block">
              Platform Administrator • {user?.city || 'Rajkot'} Territory Lead
            </span>
          </div>
        </div>
      </div>

      {/* Admin Information Cards */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
          Administrator Credentials & Scope
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" value={user?.name || 'Admin Supervisor'} disabled />
          <Input label="Admin Email" value={user?.email || 'admin@placezy.com'} disabled />
          <Input label="Assigned Territory" value={`${user?.city || 'Rajkot'}, Gujarat`} disabled />
          <Input label="Access Role" value="Super Administrator (MongoDB Root)" disabled />
        </div>
      </div>

      {/* Security & Sessions */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
          Security & Active Sessions
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
            <div className="flex items-center gap-3">
              <Key size={16} className="text-[#006765]" />
              <div>
                <span className="font-bold text-[#151C27] block">JWT Authentication Session</span>
                <span className="text-[10px] text-[#555E74]">Secured session tokens via bcrypt and HMAC SHA-256</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
            <div className="flex items-center gap-3">
              <Smartphone size={16} className="text-[#006765]" />
              <div>
                <span className="font-bold text-[#151C27] block">Territory Node</span>
                <span className="text-[10px] text-[#555E74]">{user?.city || 'Rajkot'} Hub • Connected to MongoDB (localhost:27017/placezy)</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

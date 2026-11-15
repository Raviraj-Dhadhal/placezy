import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  User,
  Shield,
  Key,
  Smartphone,
  Lock,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header matching Screen 08 Module 03 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#151C27] text-white flex items-center justify-center font-bold text-lg font-serif">
            GP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-[#151C27]">Gaurav Patel</h1>
              <span className="text-[10px] font-bold text-white bg-[#006765] px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-[#555E74] mt-0.5">admin@placezy.com • Staff ID: #PLC-ADM-0042</p>
            <span className="text-[10px] text-[#006765] font-semibold mt-1 block">
              Level 4 Regional Auditor • Gujarat Territory Lead
            </span>
          </div>
        </div>

        <Button size="sm">Edit Admin Profile</Button>
      </div>

      {/* Admin Information Cards matching Screen 08 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
          Administrator Credentials & Scope
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="Gaurav Patel" disabled />
          <Input label="Admin Email" defaultValue="admin@placezy.com" disabled />
          <Input label="Assigned Territory" defaultValue="Gujarat State (Rajkot Hub)" disabled />
          <Input label="Access Level" defaultValue="Level 4 Super Administrator" disabled />
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
                <span className="font-bold text-[#151C27] block">Hardware Security Key (FIDO2)</span>
                <span className="text-[10px] text-[#555E74]">Enforced for all Level 4 administrative operations</span>
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
                <span className="font-bold text-[#151C27] block">Recent Admin Session</span>
                <span className="text-[10px] text-[#555E74]">Chrome macOS • IP: 103.24.88.12 (Rajkot, Gujarat) • Active now</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
};

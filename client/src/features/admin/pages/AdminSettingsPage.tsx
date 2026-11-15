import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Sliders,
  AlertTriangle,
  Check,
  RefreshCw
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [autoApproval, setAutoApproval] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header matching Screen 07 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            System & Territory Settings
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Configure regional defaults, notification dispatchers, security rules, and administrative controls.
          </p>
        </div>

        <Button size="sm" onClick={handleSave}>
          {saved ? 'Settings Saved!' : 'Save System Settings'}
        </Button>
      </div>

      {/* Grid of Settings Cards matching Screen 07 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform & Regional Defaults */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
            Platform & Regional Settings
          </h3>

          <div className="space-y-3">
            <Input label="Primary Territory Name" defaultValue="Rajkot City & Saurashtra" />
            <Input label="Default Country" defaultValue="India" disabled />
            <Input label="Default Currency" defaultValue="INR (₹)" disabled />
            <Input label="Default Language" defaultValue="English (with Gujarati locality support)" />
          </div>
        </div>

        {/* Content Moderation Rules */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
            Moderation & Approval Policies
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <div>
                <span className="font-bold text-[#151C27] block">Auto-approve Verified Merchant Venues</span>
                <span className="text-[10px] text-[#555E74]">Venues with valid GSTIN and location match skip manual queue</span>
              </div>
              <button
                onClick={() => setAutoApproval(!autoApproval)}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  autoApproval ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    autoApproval ? 'right-1' : 'left-1'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
              <div>
                <span className="font-bold text-[#151C27] block">Strict Profanity & Anti-Spam Filter</span>
                <span className="text-[10px] text-[#555E74]">Flags suspicious customer reviews automatically</span>
              </div>
              <button className="w-9 h-5 rounded-full bg-[#006765] relative">
                <span className="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 right-1"></span>
              </button>
            </div>
          </div>
        </div>

        {/* System & Maintenance */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
            System Telemetry & Cache
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#151C27] block">Spatial Vector Index</span>
                <span className="text-[10px] text-[#555E74]">Active nodes: 3,420 places</span>
              </div>
              <button className="text-[11px] font-semibold text-[#006765] hover:underline flex items-center gap-1">
                <RefreshCw size={12} />
                <span>Re-index</span>
              </button>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#151C27] block">CDN Cache Purge</span>
                <span className="text-[10px] text-[#555E74]">Last synced: 12 minutes ago</span>
              </div>
              <button className="text-[11px] font-semibold text-[#006765] hover:underline">
                Purge
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider border-b border-red-100 pb-2">
            <AlertTriangle size={15} />
            <span>Danger Zone</span>
          </div>

          <p className="text-xs text-[#555E74] leading-relaxed">
            Emergency administrative overrides. These actions require Super Admin clearance and are recorded in the audit log.
          </p>

          <Button variant="danger" size="sm" fullWidth>
            Enable Platform Maintenance Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

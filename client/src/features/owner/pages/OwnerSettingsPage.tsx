import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  User,
  Building2,
  Shield,
  Bell,
  Lock,
  Smartphone,
  Check,
  AlertTriangle,
  Eye
} from 'lucide-react';

export const OwnerSettingsPage: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching Screen 07 Module 02 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#006765] text-white flex items-center justify-center font-bold text-lg font-serif">
            RD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-[#151C27]">Raviraj Dhadhal</h1>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                • Verified Business Owner
              </span>
            </div>
            <p className="text-xs text-[#555E74] mt-0.5">raviraj.dhadhal@rajkotcafe.in • Rajkot, Gujarat</p>
            <span className="text-[10px] text-[#006765] font-semibold mt-1 block">
              Managing Rajkot Cafe & 3 other listings
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" icon={<Eye size={14} />}>
            View Public Listing
          </Button>
          <Button size="sm" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      {/* 2-Column Layout matching Screen 07 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Personal & Business Info */}
        <div className="md:col-span-8 space-y-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue="Raviraj Dhadhal" />
              <Input label="Email Address" defaultValue="raviraj.dhadhal@rajkotcafe.in" disabled />
              <Input label="Mobile Number" defaultValue="+91 98250 12345" />
              <Input label="City & State" defaultValue="Rajkot, Gujarat" disabled />
            </div>

            <Button size="sm" variant="outline">
              Save Personal Details
            </Button>
          </div>

          {/* Primary Business Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
              <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Primary Business Information
              </h3>
              <span className="text-xs text-[#006765] font-semibold cursor-pointer">
                Manage All 4 Listings →
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Registered Business Name" defaultValue="Rajkot Cafe" />
              <Input label="Business Category" defaultValue="Café & Gourmet Bakery" />
            </div>

            <Input
              label="Primary Business Address"
              defaultValue="Opp. Imperial Palace, Yagnik Road, Rajkot, Gujarat 360001"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Business Contact Number" defaultValue="+91 281 248 7890" />
              <Input label="Merchant GSTIN" defaultValue="24AAACR1234F1Z5" />
            </div>
          </div>

          {/* Account Settings & Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Notification Preferences
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">Email alerts for new customer reviews</h4>
                  <span className="text-[10px] text-[#555E74]">Receive instant email digest whenever a local explorer leaves a review</span>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    emailAlerts ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      emailAlerts ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">SMS alerts for urgent merchant notifications</h4>
                  <span className="text-[10px] text-[#555E74]">Receive SMS messages to registered phone for verification requests</span>
                </div>
                <button
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    smsAlerts ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      smsAlerts ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Security & Danger Zone */}
        <div className="md:col-span-4 space-y-4">
          {/* Change Password Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Change Password
            </h4>
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="Min. 8 characters" />
            <Button size="sm" fullWidth>
              Update Password
            </Button>
          </div>

          {/* Security & Devices */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Security & 2FA
            </h4>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-xs font-semibold text-[#151C27]">Two-Step Verification</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-[#555E74]">
              SMS 2FA configured for phone ending in +91 98250 ••••45.
            </p>
          </div>

          {/* Danger Zone */}
          <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
              <AlertTriangle size={14} />
              <span>Danger Zone</span>
            </div>
            <p className="text-[10px] text-[#555E74] leading-relaxed">
              Deactivate or permanently remove your merchant listing profile from Placezy.
            </p>
            <Button variant="danger" size="sm" fullWidth>
              Deactivate Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

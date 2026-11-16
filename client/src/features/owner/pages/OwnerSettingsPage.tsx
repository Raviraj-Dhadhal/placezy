import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../context/AuthContext';
import { ownerApi } from '../services/ownerService';
import api from '../../../services/api';
import {
  User,
  Building2,
  Shield,
  Bell,
  Lock,
  Smartphone,
  Check,
  Eye
} from 'lucide-react';
import type { Place } from '../../../types';

export const OwnerSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [listings, setListings] = useState<Place[]>([]);
  const [name, setName] = useState(user?.name || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');

  useEffect(() => {
    if (user?.name) setName(user.name);
    ownerApi.getListings().then((data) => {
      setListings(data || []);
    }).catch(console.error);
  }, [user]);

  const primaryListing = listings[0];

  const handleSaveProfile = async () => {
    try {
      const res = await api.put('/auth/profile', { name });
      if (res.data?.success) {
        updateUser({ name });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error('Failed to update owner profile:', err);
      alert('Error updating profile');
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg('Password must be at least 6 characters.');
      return;
    }
    try {
      const res = await api.put('/auth/profile', { password: newPassword });
      if (res.data?.success) {
        setPasswordMsg('Password successfully updated in database!');
        setNewPassword('');
        setTimeout(() => setPasswordMsg(''), 3000);
      }
    } catch (err: any) {
      setPasswordMsg(err.response?.data?.message || 'Error updating password');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#006765] text-white flex items-center justify-center font-bold text-lg font-serif">
            {user?.name?.slice(0, 2).toUpperCase() || 'OW'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-[#151C27]">{user?.name || 'Business Owner'}</h1>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                • Verified Business Owner
              </span>
            </div>
            <p className="text-xs text-[#555E74] mt-0.5">{user?.email} • {user?.city || 'Rajkot'}, Gujarat</p>
            <span className="text-[10px] text-[#006765] font-semibold mt-1 block">
              Managing {listings.length} listed {listings.length === 1 ? 'property' : 'properties'} in database
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {primaryListing && (
            <Button
              size="sm"
              variant="outline"
              icon={<Eye size={14} />}
              onClick={() => window.open(`/place/${primaryListing.slug || primaryListing.id || (primaryListing as any)._id}`, '_blank')}
            >
              View Public Venue
            </Button>
          )}
          <Button size="sm" onClick={handleSaveProfile}>
            {saved ? 'Saved!' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Personal & Business Info */}
        <div className="md:col-span-8 space-y-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input label="Email Address" value={user?.email || ''} disabled />
              <Input label="Role" value="Business Owner / Partner" disabled />
              <Input label="Territory" value={`${user?.city || 'Rajkot'}, Gujarat`} disabled />
            </div>

            <Button size="sm" variant="outline" onClick={handleSaveProfile}>
              Save Personal Details
            </Button>
          </div>

          {/* Primary Business Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
              <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Primary Business Information
              </h3>
              <span className="text-xs text-[#006765] font-semibold">
                {listings.length} venues managed
              </span>
            </div>

            {primaryListing ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Registered Business Name" value={primaryListing.name} disabled />
                  <Input label="Business Category" value={primaryListing.category} disabled />
                </div>

                <Input
                  label="Primary Business Address"
                  value={primaryListing.address || primaryListing.city}
                  disabled
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Business Contact" value={primaryListing.phone || '+91 281 248 7890'} disabled />
                  <Input label="Verification Status" value={primaryListing.isVerified ? 'Verified by Rajkot Admin' : 'Pending'} disabled />
                </div>
              </>
            ) : (
              <p className="text-xs text-[#555E74]">No active venue found in database.</p>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Notification Preferences
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">Email alerts for customer reviews</h4>
                  <span className="text-[10px] text-[#555E74]">Receive instant notification whenever an explorer reviews your venues</span>
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
                  <h4 className="text-xs font-bold text-[#151C27]">SMS alerts for verification updates</h4>
                  <span className="text-[10px] text-[#555E74]">Receive SMS alerts regarding listing approvals in Rajkot</span>
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

        {/* Right Column (4 Cols): Security */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Change Account Password
            </h4>
            <p className="text-[10px] text-[#555E74]">
              Update your account password in MongoDB.
            </p>

            <Input
              type="password"
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {passwordMsg && (
              <span className={`text-[10px] font-semibold block ${passwordMsg.includes('success') ? 'text-emerald-700' : 'text-red-600'}`}>
                {passwordMsg}
              </span>
            )}

            <Button size="sm" fullWidth onClick={handleUpdatePassword}>
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

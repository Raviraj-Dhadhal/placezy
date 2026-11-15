import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Bell,
  MapPin,
  Check,
  ChevronRight,
  ExternalLink,
  LogOut
} from 'lucide-react';

export const UserSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-1 hover:text-[#151C27] font-medium"
        >
          <ArrowLeft size={15} />
          <span>Back to Profile</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          Settings
        </h1>
        <p className="text-xs text-[#555E74] mt-0.5">
          Manage your account credentials, preferences, and privacy parameters.
        </p>
      </div>

      {/* Main Settings Container matching Screen 18 */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
        {/* Section 1: Account */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
            Account
          </span>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">Profile Information</h4>
                  <span className="text-[10px] text-[#555E74]">Personal details, display name, and photo</span>
                </div>
              </div>
              <button className="text-xs text-[#006765] font-semibold hover:underline">
                Edit &gt;
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#151C27]">Email Address</h4>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <span className="text-[10px] text-[#555E74]">mahek.explorer@placezy.com</span>
                </div>
              </div>
              <button className="text-xs text-[#006765] font-semibold hover:underline">
                Change &gt;
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                  <Lock size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">Change Password</h4>
                  <span className="text-[10px] text-[#555E74]">Last updated 3 months ago</span>
                </div>
              </div>
              <button className="text-xs text-[#006765] font-semibold hover:underline">
                Update &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Preferences */}
        <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
          <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
            Preferences
          </span>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">Notifications</h4>
                  <span className="text-[10px] text-[#555E74]">Receive updates, trip reminders, and local alerts</span>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  notificationsEnabled ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notificationsEnabled ? 'right-1' : 'left-1'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151C27]">Location Services</h4>
                  <span className="text-[10px] text-[#555E74]">Personalize recommendations based on current city radius</span>
                </div>
              </div>
              <button
                onClick={() => setLocationEnabled(!locationEnabled)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  locationEnabled ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    locationEnabled ? 'right-1' : 'left-1'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Privacy & Legal */}
        <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
          <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
            Privacy & Legal
          </span>

          <div className="space-y-2 text-xs">
            <div
              onClick={() => navigate('/privacy')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FF] cursor-pointer"
            >
              <span className="text-[#151C27] font-medium">Privacy Policy</span>
              <ExternalLink size={14} className="text-[#8E98B0]" />
            </div>

            <div
              onClick={() => navigate('/terms')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FF] cursor-pointer"
            >
              <span className="text-[#151C27] font-medium">Terms of Service</span>
              <ExternalLink size={14} className="text-[#8E98B0]" />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-xs text-red-600 font-semibold hover:text-red-700"
          >
            <LogOut size={15} />
            <span>Log Out</span>
          </button>

          <Button size="md" icon={<Check size={16} />} onClick={handleSave}>
            {savedSuccess ? 'Changes Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

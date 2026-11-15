import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Avatar } from '../../../components/ui/Avatar';
import {
  User,
  Heart,
  Calendar,
  Star,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Shield,
  MapPin,
  Bell
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#555E74]">
        <span>Home</span>
        <span>/</span>
        <span>Account</span>
        <span>/</span>
        <span className="font-semibold text-[#151C27]">Profile & Settings</span>
      </div>

      {/* Main Profile Header Card matching Screen 16 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar gender="female" size={64} name="Mahek Patel" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-[#151C27]">Mahek Patel</h1>
              <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
                Urban Explorer & Rajkot Insider
              </span>
            </div>
            <p className="text-xs text-[#555E74]">mahek.urban@example.com</p>
            <div className="flex items-center gap-3 text-[11px] text-[#555E74] pt-1">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-[#006765]" />
                Rajkot, Gujarat, India
              </span>
              <span>•</span>
              <span>Member since Nov 2024</span>
              <span>•</span>
              <span className="font-semibold text-[#151C27]">6 Saved Places</span>
              <span>•</span>
              <span className="font-semibold text-[#151C27]">3 Trips</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/settings')}
        >
          Edit Profile
        </Button>
      </div>

      {/* 4 Feature Blocks matching Screen 16 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Block 1: Account */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">Account</h3>
            <span className="text-[10px] text-[#555E74]">2 settings</span>
          </div>

          <div className="space-y-1 divide-y divide-[#F1F5F9] text-xs">
            <div
              onClick={() => navigate('/settings')}
              className="py-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <User size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">Personal Information</span>
                  <span className="text-[10px] text-[#555E74]">Update name, contact email, and bio</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>

            <div
              onClick={() => navigate('/settings')}
              className="pt-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Shield size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">Change Password</span>
                  <span className="text-[10px] text-[#555E74]">Manage security credentials and 2FA</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>
          </div>
        </div>

        {/* Block 2: Preferences */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">Preferences</h3>
            <span className="text-[10px] text-[#555E74]">3 settings</span>
          </div>

          <div className="space-y-1 divide-y divide-[#F1F5F9] text-xs">
            <div
              onClick={() => navigate('/register/interests')}
              className="py-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">My Interests</span>
                  <span className="text-[10px] text-[#555E74]">Fine-tune café, heritage, and nature vibes</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>

            <div
              onClick={() => navigate('/settings')}
              className="pt-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">Preferred Location</span>
                  <span className="text-[10px] text-[#555E74]">Current: Rajkot, Gujarat (Change)</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>
          </div>
        </div>

        {/* Block 3: Activity */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">Activity</h3>
            <span className="text-[10px] text-[#006765] font-semibold">Rajkot Curations</span>
          </div>

          <div className="space-y-1 divide-y divide-[#F1F5F9] text-xs">
            <div
              onClick={() => navigate('/wishlist')}
              className="py-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">My Wishlist</span>
                  <span className="text-[10px] text-[#555E74]">6 curated places saved across Rajkot</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>

            <div
              onClick={() => navigate('/trip-planner')}
              className="pt-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">My Trips</span>
                  <span className="text-[10px] text-[#555E74]">Active itinerary: "My Rajkot Trip" (3 days)</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>
          </div>
        </div>

        {/* Block 4: Other & Legal */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">Other & Legal</h3>
            <span className="text-[10px] text-[#555E74]">System</span>
          </div>

          <div className="space-y-1 divide-y divide-[#F1F5F9] text-xs">
            <div
              onClick={() => navigate('/help')}
              className="py-2.5 flex items-center justify-between hover:text-[#006765] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle size={15} className="text-[#006765]" />
                <div>
                  <span className="font-semibold text-[#151C27] block">Help & Support</span>
                  <span className="text-[10px] text-[#555E74]">FAQs, curator contact, and guide</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8E98B0]" />
            </div>

            <div
              onClick={() => navigate('/login')}
              className="pt-2.5 flex items-center justify-between hover:text-red-600 cursor-pointer text-red-600"
            >
              <div className="flex items-center gap-2.5">
                <LogOut size={15} />
                <div>
                  <span className="font-semibold block">Logout</span>
                  <span className="text-[10px] text-red-400">Sign out of your Placezy account</span>
                </div>
              </div>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

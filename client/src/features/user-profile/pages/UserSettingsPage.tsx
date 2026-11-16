import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
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
  LogOut,
  AlertCircle
} from 'lucide-react';

export const UserSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [city, setCity] = useState('Rajkot, Gujarat');
  const [newPassword, setNewPassword] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await api.put('/auth/profile', { name, city });
      if (res.data?.success && user) {
        login(localStorage.getItem('placezy_token') || '', {
          ...user,
          name: name,
        });
        setSavedSuccess('Profile updated in database!');
        setIsEditingProfile(false);
        setTimeout(() => setSavedSuccess(''), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await api.put('/auth/profile', { password: newPassword });
      setSavedSuccess('Password updated successfully!');
      setIsChangingPass(false);
      setNewPassword('');
      setTimeout(() => setSavedSuccess(''), 3000);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setIsSubmitting(false);
    }
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

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
              <Check size={16} />
              <span>{savedSuccess}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-3">
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#151C27]">Profile Information</h4>
                    <span className="text-[10px] text-[#555E74]">{user?.name || 'Personal details'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-xs text-[#006765] font-semibold hover:underline"
                >
                  {isEditingProfile ? 'Cancel' : 'Edit >'}
                </button>
              </div>

              {isEditingProfile && (
                <form onSubmit={handleUpdateProfile} className="pt-2 space-y-3 border-t border-[#E2E8F0]">
                  <Input
                    label="Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="City Territory"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <Button type="submit" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              )}
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
                      Active
                    </span>
                  </div>
                  <span className="text-[10px] text-[#555E74]">{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                    <Lock size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#151C27]">Change Password</h4>
                    <span className="text-[10px] text-[#555E74]">Update password in database</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsChangingPass(!isChangingPass)}
                  className="text-xs text-[#006765] font-semibold hover:underline"
                >
                  {isChangingPass ? 'Cancel' : 'Update >'}
                </button>
              </div>

              {isChangingPass && (
                <form onSubmit={handleUpdatePassword} className="pt-2 space-y-3 border-t border-[#E2E8F0]">
                  <Input
                    type="password"
                    label="New Password"
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Save Password'}
                  </Button>
                </form>
              )}
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
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-2 text-xs text-red-600 font-semibold hover:text-red-700"
          >
            <LogOut size={15} />
            <span>Log Out</span>
          </button>

          <Button
            size="md"
            icon={<Check size={16} />}
            onClick={() => {
              setSavedSuccess('Preferences saved!');
              setTimeout(() => setSavedSuccess(''), 3000);
            }}
          >
            {savedSuccess ? 'Changes Saved!' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
};

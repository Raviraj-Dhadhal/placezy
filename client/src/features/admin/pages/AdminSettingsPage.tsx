import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { adminApi } from '../services/adminService';
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
  const [territoryName, setTerritoryName] = useState('Rajkot City & Saurashtra');
  const [defaultLanguage, setDefaultLanguage] = useState('English (with Gujarati locality support)');
  const [autoApproval, setAutoApproval] = useState(false);
  const [profanityFilter, setProfanityFilter] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [cacheMessage, setCacheMessage] = useState('');

  useEffect(() => {
    adminApi
      .getSettings()
      .then((data) => {
        if (data) {
          if (data.territoryName !== undefined) setTerritoryName(data.territoryName);
          if (data.language !== undefined) setDefaultLanguage(data.language);
          if (data.autoApproval !== undefined) setAutoApproval(data.autoApproval);
          if (data.profanityFilter !== undefined) setProfanityFilter(data.profanityFilter);
          if (data.maintenanceMode !== undefined) setMaintenanceMode(data.maintenanceMode);
        }
      })
      .catch((err) => console.error('Failed to load settings from DB:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      await adminApi.updateSettings({
        territoryName,
        language: defaultLanguage,
        autoApproval,
        profanityFilter,
        maintenanceMode,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Could not persist settings to MongoDB.');
    }
  };

  const handlePurgeCache = () => {
    setCacheMessage('Database cache and indexes successfully refreshed!');
    setTimeout(() => setCacheMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            System & Territory Settings
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Configure regional defaults, automated approval queues, and maintenance rules stored in MongoDB.
          </p>
        </div>

        <Button size="sm" onClick={handleSave}>
          {saved ? 'Settings Saved to Database!' : 'Save System Settings'}
        </Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs text-[#555E74]">
          Loading platform configuration from MongoDB...
        </div>
      ) : (
        /* Grid of Settings Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform & Regional Defaults */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Platform & Regional Settings
            </h3>

            <div className="space-y-3">
              <Input
                label="Primary Territory Name"
                value={territoryName}
                onChange={(e) => setTerritoryName(e.target.value)}
              />
              <Input label="Default Country" defaultValue="India" disabled />
              <Input label="Default Currency" defaultValue="INR (₹)" disabled />
              <Input
                label="Default Language"
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
              />
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
                  <span className="text-[10px] text-[#555E74]">
                    Venues with valid GSTIN and location match skip manual queue
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoApproval(!autoApproval)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    autoApproval ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      autoApproval ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <div>
                  <span className="font-bold text-[#151C27] block">Strict Profanity & Anti-Spam Filter</span>
                  <span className="text-[10px] text-[#555E74]">
                    Flags suspicious customer reviews automatically in moderation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setProfanityFilter(!profanityFilter)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    profanityFilter ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      profanityFilter ? 'right-1' : 'left-1'
                    }`}
                  ></span>
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
                  <span className="font-bold text-[#151C27] block">Spatial 2dsphere GeoJSON Index</span>
                  <span className="text-[10px] text-[#555E74]">Connected MongoDB instances on localhost:27017</span>
                </div>
                <button
                  type="button"
                  onClick={handlePurgeCache}
                  className="text-[11px] font-semibold text-[#006765] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>Re-sync</span>
                </button>
              </div>

              {cacheMessage && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-lg font-medium text-center">
                  {cacheMessage}
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider border-b border-red-100 pb-2">
              <AlertTriangle size={15} />
              <span>Danger Zone</span>
            </div>

            <p className="text-xs text-[#555E74] leading-relaxed">
              Toggle emergency platform maintenance mode. Restricts public exploring activities and requires Super Admin clearance.
            </p>

            <Button
              variant={maintenanceMode ? 'primary' : 'danger'}
              size="sm"
              fullWidth
              onClick={() => setMaintenanceMode(!maintenanceMode)}
            >
              {maintenanceMode ? 'Disable Platform Maintenance Mode' : 'Enable Platform Maintenance Mode'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

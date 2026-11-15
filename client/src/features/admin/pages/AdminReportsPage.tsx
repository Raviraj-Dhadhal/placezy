import React from 'react';
import { Button } from '../../../components/ui/Button';
import {
  FileBarChart2,
  TrendingUp,
  FileDown,
  Building2,
  Users,
  MapPin,
  Star
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Screen 06 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Platform Reports & Analytics
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Territory-level performance reports across users, businesses, reviews, and regional activity in Gujarat.
          </p>
        </div>

        <Button size="sm" variant="outline" icon={<FileDown size={14} />}>
          Export Full Report
        </Button>
      </div>

      {/* 5 KPI Metric Cards matching Screen 06 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Users</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">18,420</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 8.5% Active</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">3,420</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 6.8% Growth</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Places</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">3,420</span>
          <span className="text-[10px] text-[#006765] font-semibold">Verified directory</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Reviews</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">28,450</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 12.4% this month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Active Listings</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">3,180</span>
          <span className="text-[10px] text-[#006765] font-semibold">93.0% Live</span>
        </div>
      </div>

      {/* Territory Regional Breakdown matching Screen 06 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#151C27] border-b border-[#F1F5F9] pb-3">
          Territory Performance: Gujarat Region
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 text-xs">
          <div className="p-3.5 bg-[#CFE7E6]/30 border border-[#006765]/30 rounded-xl space-y-1">
            <span className="font-bold text-[#006765] block">Rajkot</span>
            <span className="text-[#555E74] block">Places: 1,420</span>
            <span className="text-[10px] text-[#006765] font-semibold">Primary Active Territory</span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
            <span className="font-bold text-[#151C27] block">Ahmedabad</span>
            <span className="text-[#555E74] block">Places: 1,150</span>
            <span className="text-[10px] text-[#555E74]">Expansion Hub</span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
            <span className="font-bold text-[#151C27] block">Surat</span>
            <span className="text-[#555E74] block">Places: 480</span>
            <span className="text-[10px] text-[#555E74]">Coastal Node</span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
            <span className="font-bold text-[#151C27] block">Vadodara</span>
            <span className="text-[#555E74] block">Places: 260</span>
            <span className="text-[10px] text-[#555E74]">Heritage Node</span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
            <span className="font-bold text-[#151C27] block">Gandhinagar</span>
            <span className="text-[#555E74] block">Places: 110</span>
            <span className="text-[10px] text-[#555E74]">Capitol District</span>
          </div>
        </div>
      </div>

      {/* Downloadable Report Center matching Screen 06 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#151C27] border-b border-[#F1F5F9] pb-3">
          Downloadable Report Center
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2 text-center">
            <span className="text-xs font-bold text-[#151C27] block">User Activity Report</span>
            <span className="text-[10px] text-[#555E74] block">CSV / PDF • Updated today</span>
            <Button size="sm" variant="outline" fullWidth>
              Download Report
            </Button>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2 text-center">
            <span className="text-xs font-bold text-[#151C27] block">Business Directory</span>
            <span className="text-[10px] text-[#555E74] block">CSV / PDF • Updated today</span>
            <Button size="sm" variant="outline" fullWidth>
              Download Report
            </Button>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2 text-center">
            <span className="text-xs font-bold text-[#151C27] block">Review Moderation Report</span>
            <span className="text-[10px] text-[#555E74] block">CSV / PDF • Updated today</span>
            <Button size="sm" variant="outline" fullWidth>
              Download Report
            </Button>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2 text-center">
            <span className="text-xs font-bold text-[#151C27] block">Territory Analytics</span>
            <span className="text-[10px] text-[#555E74] block">CSV / PDF • Updated today</span>
            <Button size="sm" variant="outline" fullWidth>
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

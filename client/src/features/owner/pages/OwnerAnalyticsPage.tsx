import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import {
  BarChart3,
  TrendingUp,
  FileDown,
  Calendar,
  Users,
  Compass,
  Star,
  CheckCircle2
} from 'lucide-react';

export const OwnerAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Screen 06 Module 02 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Business Performance Analytics
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Track how people discover and interact with your business across Rajkot.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1 text-xs">
            {['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'This Year'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  timeRange === t ? 'bg-[#006765] text-white' : 'text-[#555E74] hover:bg-[#F0F3FF]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Button size="sm" variant="outline" icon={<FileDown size={14} />}>
            Export CSV / PDF
          </Button>
        </div>
      </div>

      {/* 5 KPI Metric Cards matching Screen 06 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Total Views</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">14,820</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 18.4% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Profile Visits</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">6,450</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 12.1% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Wishlist Saves</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">940</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 24.5% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Direction Requests</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">1,820</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 15.2% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Average Rating</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">4.7 / 5.0</span>
          <span className="text-[10px] text-amber-600 font-semibold">★ Top 5% in Saurashtra</span>
        </div>
      </div>

      {/* Main Split Grid: Views Area Chart Left, Wishlist Frequency Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Area chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#151C27]">Views & Profile Visits Over Time</h3>
              <p className="text-[10px] text-[#555E74]">Daily impressions across search & recommendation feeds vs unique profile views</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#006765] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006765]"></span>
                Total Views
              </span>
              <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Profile Visits
              </span>
            </div>
          </div>

          <div className="h-64 w-full flex items-end pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#006765" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#006765" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 140 Q 100 110, 200 120 T 350 40 T 500 70 L 500 180 L 0 180 Z"
                fill="url(#analyticsGrad)"
              />
              <path
                d="M 0 140 Q 100 110, 200 120 T 350 40 T 500 70"
                stroke="#006765"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 0 160 Q 100 135, 200 145 T 350 85 T 500 100"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <circle cx="350" cy="40" r="5" fill="#006765" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F1F5F9] text-center text-xs">
            <div>
              <span className="text-[10px] text-[#555E74] block">Peak Single Day</span>
              <span className="font-bold text-[#151C27]">724 Views (Oct 22)</span>
            </div>
            <div>
              <span className="text-[10px] text-[#555E74] block">Conversion to Visit</span>
              <span className="font-bold text-[#151C27]">43.5% Rate</span>
            </div>
            <div>
              <span className="text-[10px] text-[#555E74] block">Weekend Spike</span>
              <span className="font-bold text-[#006765]">+38% higher interest</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Monthly Wishlist Saves */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#151C27]">Monthly Wishlist Saves</h3>
              <p className="text-[10px] text-[#555E74]">Weekly bookmark frequency</p>
            </div>
            <span className="text-xs font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded">
              940 Total
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Oct 1-7', count: 175, pct: '60%' },
              { label: 'Oct 8-14', count: 210, pct: '72%' },
              { label: 'Oct 15-21', count: 285, pct: '92%' },
              { label: 'Oct 22-30', count: 270, pct: '88%' },
            ].map((bar) => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#555E74]">{bar.label}</span>
                  <span className="font-bold text-[#151C27]">{bar.count} saves</span>
                </div>
                <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div style={{ width: bar.pct }} className="h-full bg-[#006765] rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[11px] text-[#555E74]">
            Peak bookmark action occurs during weekend trip planning.
          </div>
        </div>
      </div>

      {/* Popular Visit Times Weekly Heatmap matching Screen 06 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#151C27]">Popular Visit Times</h3>
            <span className="text-[10px] text-[#555E74]">Foot traffic interest across days of week (peak: Fri, Sat, Sun evenings)</span>
          </div>
          <span className="text-xs font-bold text-[#006765]">Yagnik Road Area</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {[
            { day: 'Mon', traffic: '42%', peak: '6pm - 8pm' },
            { day: 'Tue', traffic: '48%', peak: '6pm - 8pm' },
            { day: 'Wed', traffic: '55%', peak: '7pm - 9pm' },
            { day: 'Thu', traffic: '68%', peak: '7pm - 10pm' },
            { day: 'Fri', traffic: '88%', peak: '6pm - 11pm (Peak Busy)' },
            { day: 'Sat', traffic: '98%', peak: '5pm - Midnight (Peak Busy)' },
            { day: 'Sun', traffic: '94%', peak: '4pm - 11pm (Peak Busy)' },
          ].map((item) => (
            <div key={item.day} className="flex items-center gap-3">
              <span className="w-8 font-bold text-[#151C27]">{item.day}</span>
              <div className="flex-1 h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div style={{ width: item.traffic }} className="h-full bg-[#006765] rounded-full"></div>
              </div>
              <span className="w-10 text-right font-bold text-[#151C27]">{item.traffic}</span>
              <span className="w-48 text-[11px] text-[#555E74] hidden sm:block">{item.peak}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

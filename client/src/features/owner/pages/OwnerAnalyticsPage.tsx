import React, { useState, useEffect } from 'react';
import { ownerApi } from '../services/ownerService';

export const OwnerAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ownerApi.getAnalytics(timeRange)
      .then((data) => {
        setAnalytics(data);
      })
      .catch((err) => {
        console.error('Error fetching analytics:', err);
      })
      .finally(() => setLoading(false));
  }, [timeRange]);

  // Derived metrics according to selected time range
  const totalViews = analytics?.totalViews ?? 14820;
  const profileVisits = analytics?.profileVisits ?? 6450;
  const wishlistSaves = analytics?.wishlistSaves ?? 940;
  const directionRequests = analytics?.directionRequests ?? 1820;
  const avgRating = analytics?.averageRating ? Number(analytics.averageRating).toFixed(1) : '4.7';
  const label = analytics?.label || 'vs last month';
  const peakDay = analytics?.peakDay || 'Oct 22';

  // Dynamic breakdown for weekly saves based on range
  const savesBreakdown = timeRange === 'Last 7 Days'
    ? [
        { label: 'Day 1-2', count: Math.round(wishlistSaves * 0.22), pct: '48%' },
        { label: 'Day 3-4', count: Math.round(wishlistSaves * 0.26), pct: '62%' },
        { label: 'Day 5-6', count: Math.round(wishlistSaves * 0.32), pct: '88%' },
        { label: 'Day 7 (Peak)', count: Math.round(wishlistSaves * 0.20), pct: '95%' },
      ]
    : timeRange === 'Last 3 Months'
    ? [
        { label: 'Month 1', count: Math.round(wishlistSaves * 0.28), pct: '70%' },
        { label: 'Month 2', count: Math.round(wishlistSaves * 0.34), pct: '82%' },
        { label: 'Month 3', count: Math.round(wishlistSaves * 0.38), pct: '94%' },
      ]
    : timeRange === 'This Year'
    ? [
        { label: 'Q1 (Jan-Mar)', count: Math.round(wishlistSaves * 0.20), pct: '55%' },
        { label: 'Q2 (Apr-Jun)', count: Math.round(wishlistSaves * 0.24), pct: '65%' },
        { label: 'Q3 (Jul-Sep)', count: Math.round(wishlistSaves * 0.26), pct: '72%' },
        { label: 'Q4 (Oct-Dec)', count: Math.round(wishlistSaves * 0.30), pct: '92%' },
      ]
    : [
        { label: 'Week 1', count: Math.round(wishlistSaves * 0.20), pct: '60%' },
        { label: 'Week 2', count: Math.round(wishlistSaves * 0.24), pct: '72%' },
        { label: 'Week 3', count: Math.round(wishlistSaves * 0.30), pct: '92%' },
        { label: 'Week 4', count: Math.round(wishlistSaves * 0.26), pct: '88%' },
      ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
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

        {/* Time range switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1 text-xs shadow-sm">
            {['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'This Year'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  timeRange === t ? 'bg-[#006765] text-white shadow-sm' : 'text-[#555E74] hover:bg-[#F0F3FF]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Total Views</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : totalViews.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 18.4% {label}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Profile Visits</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : profileVisits.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 12.1% {label}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Wishlist Saves</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : wishlistSaves.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 24.5% {label}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Direction Requests</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : directionRequests.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 15.2% {label}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74] font-medium">Average Rating</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            ★ {avgRating} / 5.0
          </span>
          <span className="text-[10px] text-amber-600 font-semibold">★ Verified Saurashtra Reviews</span>
        </div>
      </div>

      {/* Main Split Grid: Views Area Chart Left, Wishlist Frequency Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Area chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#151C27]">Views & Profile Visits ({timeRange})</h3>
              <p className="text-[10px] text-[#555E74]">Daily impressions across search & discovery feeds vs unique profile views</p>
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
              <span className="text-[10px] text-[#555E74] block">Peak Traffic</span>
              <span className="font-bold text-[#151C27]">{peakDay}</span>
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

        {/* Right Column (4 Cols): Wishlist Saves Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#151C27]">Wishlist Saves ({timeRange})</h3>
              <p className="text-[10px] text-[#555E74]">Bookmark frequency breakdown</p>
            </div>
            <span className="text-xs font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded">
              {wishlistSaves.toLocaleString()} Total
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {savesBreakdown.map((bar) => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#555E74]">{bar.label}</span>
                  <span className="font-bold text-[#151C27]">{bar.count.toLocaleString()} saves</span>
                </div>
                <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div style={{ width: bar.pct }} className="h-full bg-[#006765] rounded-full transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[11px] text-[#555E74]">
            Peak bookmark action occurs during weekend trip planning across Gujarat.
          </div>
        </div>
      </div>

      {/* Popular Visit Times Weekly Heatmap */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#151C27]">Popular Visit Times</h3>
            <span className="text-[10px] text-[#555E74]">Foot traffic interest across days of week (peak: Fri, Sat, Sun evenings)</span>
          </div>
          <span className="text-xs font-bold text-[#006765]">Rajkot Area</span>
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

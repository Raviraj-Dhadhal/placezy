import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  TrendingUp,
  Eye,
  Bookmark,
  MessageSquare,
  Star,
  Plus,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Camera,
  CheckCircle2
} from 'lucide-react';

export const OwnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Total Views',
      value: '12,480',
      change: '+18% vs last month',
      positive: true,
      icon: <Eye size={18} className="text-[#006765]" />,
    },
    {
      title: 'Listing Visits',
      value: '3,840',
      change: '+12% vs last month',
      positive: true,
      icon: <TrendingUp size={18} className="text-blue-600" />,
    },
    {
      title: 'Wishlist Saves',
      value: '642',
      change: '+24% vs last month',
      positive: true,
      icon: <Bookmark size={18} className="text-purple-600" />,
    },
    {
      title: 'Average Rating',
      value: '4.8 ★',
      change: 'Based on 142 reviews',
      positive: true,
      icon: <Star size={18} className="text-amber-500 fill-amber-500" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner matching Screen 02 Module 02 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-serif text-[#151C27]">
              Welcome back, Raviraj!
            </h1>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Verified Merchant • Active
            </span>
          </div>
          <p className="text-xs text-[#555E74] mt-1">
            Here's how your business is performing across the Rajkot, Gujarat territory.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="sm"
            variant="outline"
            icon={<Camera size={14} />}
            onClick={() => navigate('/owner/photos')}
          >
            + Add Photos
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/owner/listings')}
          >
            Edit Listing
          </Button>

          <Button
            size="sm"
            onClick={() => navigate('/owner/reviews')}
          >
            View Reviews
          </Button>
        </div>
      </div>

      {/* 4 Metric KPI Cards matching Screen 02 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.title} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#555E74]">{m.title}</span>
              <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                {m.icon}
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#151C27] block font-serif">{m.value}</span>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                <ArrowUpRight size={12} />
                <span>{m.change}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Grid: Charts & Reviews Left, Listing Snippet Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Performance Chart + Recent Reviews */}
        <div className="lg:col-span-8 space-y-6">
          {/* Performance Trend Chart Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Business Performance</h3>
                <span className="text-[10px] text-[#555E74]">Views and customer visit inquiries over time</span>
              </div>

              <div className="flex items-center gap-1 text-xs">
                {['Last 7 Days', 'Last 30 Days', 'Last 3 Months'].map((t, idx) => (
                  <button
                    key={t}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      idx === 1
                        ? 'bg-[#006765] text-white'
                        : 'text-[#555E74] hover:bg-[#F0F3FF]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Stylized SVG Area Chart representation */}
            <div className="h-56 w-full relative flex items-end pt-6 pb-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                <defs>
                  <linearGradient id="ownerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#006765" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#006765" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <path
                  d="M 0 120 Q 80 80, 160 100 T 320 40 T 500 60 L 500 160 L 0 160 Z"
                  fill="url(#ownerGrad)"
                />
                {/* Line */}
                <path
                  d="M 0 120 Q 80 80, 160 100 T 320 40 T 500 60"
                  stroke="#006765"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Active marker dot at peak */}
                <circle cx="320" cy="40" r="5" fill="#006765" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* Tooltip bubble at peak */}
              <div className="absolute top-2 left-[60%] bg-[#151C27] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none">
                Oct 22: 540 Views
              </div>
            </div>

            {/* Chart Summary Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F1F5F9] text-center">
              <div>
                <span className="text-[10px] text-[#555E74] block">Peak Activity Day</span>
                <span className="text-xs font-bold text-[#151C27]">Oct 22 (Sunday)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E74] block">Avg. Daily Views</span>
                <span className="text-xs font-bold text-[#151C27]">416 users / day</span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E74] block">Inquiry Conversion</span>
                <span className="text-xs font-bold text-[#006765]">30.7% CTR</span>
              </div>
            </div>
          </div>

          {/* Recent Reviews Snippet */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Recent Customer Reviews</h3>
                <span className="text-[10px] text-[#555E74]">Verified feedback from diners and remote workers in Rajkot</span>
              </div>
              <button
                onClick={() => navigate('/owner/reviews')}
                className="text-xs text-[#006765] font-semibold hover:underline"
              >
                View All Reviews (142) →
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#006765] text-white text-xs font-bold flex items-center justify-center">
                      AP
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#151C27]">Aarav Patel</h4>
                      <span className="text-[10px] text-[#555E74]">2 days ago • ★★★★★</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate('/owner/reviews')}>
                    Reply
                  </Button>
                </div>
                <p className="text-xs text-[#555E74]">
                  "Best cold brew in Rajkot! Courtyard ambiance is unmatched for creative remote work with high-speed internet."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Business Card + Inquiries + Action Checklist */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Listing Card matching Screen 02 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
              <img
                src="/images/places/grand-courtyard.jpg"
                alt="Grand Heritage"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 right-2.5 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                • Verified
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#151C27]">The Grand Heritage Cafe</h3>
              <p className="text-xs text-[#555E74] mt-0.5">Cafe & Restaurant • Kalawad Road, Rajkot</p>
              <div className="flex items-center gap-2 text-xs text-[#555E74] mt-1.5">
                <span className="font-bold text-[#151C27]">4.8 ★ (142 reviews)</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Open Now</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
              <Button size="sm" variant="outline" onClick={() => navigate('/owner/listings')}>
                Edit Listing
              </Button>
              <Button size="sm" onClick={() => navigate('/place/p1')}>
                View Public Page
              </Button>
            </div>
          </div>

          {/* Top Customer Inquiries */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Top Customer Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Free High-Speed Wi-Fi</span>
                <span className="font-bold text-[#151C27]">88%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Valet Parking</span>
                <span className="font-bold text-[#151C27]">76%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Outdoor Seating</span>
                <span className="font-bold text-[#151C27]">64%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Quiet Workspaces</span>
                <span className="font-bold text-[#151C27]">59%</span>
              </div>
            </div>
          </div>

          {/* Action Items Checklist */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Action Items
            </h4>
            <div className="space-y-1.5 text-xs">
              <div
                onClick={() => navigate('/owner/photos')}
                className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F0F3FF] cursor-pointer flex items-center justify-between"
              >
                <span>Upload New Photos (6/20 used)</span>
                <ChevronRight size={14} className="text-[#8E98B0]" />
              </div>
              <div
                onClick={() => navigate('/owner/reviews')}
                className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F0F3FF] cursor-pointer flex items-center justify-between"
              >
                <span>Respond to Unread Reviews (2)</span>
                <ChevronRight size={14} className="text-[#8E98B0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

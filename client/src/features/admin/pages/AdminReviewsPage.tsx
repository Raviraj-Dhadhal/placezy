import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  MessageSquareCheck,
  Star,
  CheckCircle,
  XCircle,
  Flag,
  Search,
  Filter,
  Eye,
  Check
} from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<any | null>({
    author: 'Priyanshi Mehta',
    venue: 'Rajkot Cafe & Bakery',
    rating: 5.0,
    text: 'Love their cold brew and fresh sourdough pastries. Ambient seating is perfect for casual work. Quick service even during evening rush hours on Yagnik Road.',
    sentiment: 'Positive (98%)',
    date: 'Oct 24, 2026',
    status: 'Pending Moderation',
  });

  const reviews = [
    {
      id: 'ar1',
      author: 'Harshvardhan Jadeja',
      venue: 'Kathiyawadi Thali Bhavan',
      rating: 5.0,
      text: 'Authentic Ringan No Oro and Bajra No Rotlo! The best traditional Gujarati experience.',
      status: 'Approved',
    },
    {
      id: 'ar2',
      author: 'Priyanshi Mehta',
      venue: 'Rajkot Cafe & Bakery',
      rating: 5.0,
      text: 'Love their cold brew and fresh sourdough pastries. Ambient seating is perfect...',
      status: 'Pending Moderation',
    },
    {
      id: 'ar3',
      author: 'Ronak Sanghavi',
      venue: 'Girnar Garden Restaurant',
      rating: 1.0,
      text: 'Food was served cold and hygiene in the dining area was questionable. Not recommended.',
      status: 'Reported',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header matching Screen 05 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Reviews
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Review, moderate, and manage user feedback across the Placezy platform.
          </p>
        </div>

        <Button size="sm" icon={<Check size={14} />}>
          Bulk Moderate
        </Button>
      </div>

      {/* 4 Metric Cards matching Screen 05 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Reviews</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">28,450</span>
          <span className="text-[10px] text-emerald-700 font-semibold">+12.4% this month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Pending Reviews</span>
          <span className="text-2xl font-bold font-serif text-amber-600 block mt-1">14</span>
          <span className="text-[10px] text-amber-700 font-semibold">Action Req. • Needs Moderation</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Approved Reviews</span>
          <span className="text-2xl font-bold font-serif text-[#006765] block mt-1">27,820</span>
          <span className="text-[10px] text-[#006765] font-semibold">97.8% verified public</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Reported Reviews</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">42</span>
          <span className="text-[10px] text-red-600 font-semibold">Flagged for violation</span>
        </div>
      </div>

      {/* Main Grid: Reviews Table Left, Review Details Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input placeholder="Search reviews by keyword, user or venue..." icon={<Search size={14} />} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {['All', 'Pending (14)', 'Approved', 'Reported (42)'].map((t, idx) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    idx === 1 ? 'bg-[#006765] text-white' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                  <th className="pb-2.5 pl-2">User</th>
                  <th className="pb-2.5">Place / Business</th>
                  <th className="pb-2.5">Rating</th>
                  <th className="pb-2.5">Feedback</th>
                  <th className="pb-2.5 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {reviews.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedReview(r)}
                    className="hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                  >
                    <td className="py-3 pl-2 font-bold text-[#151C27]">{r.author}</td>
                    <td className="py-3 text-[#555E74]">{r.venue}</td>
                    <td className="py-3 font-bold text-amber-500">★ {r.rating}</td>
                    <td className="py-3 text-[#555E74] line-clamp-1">{r.text}</td>
                    <td className="py-3 pr-2 text-right">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Review Details Drawer (4 Cols) matching Screen 05 */}
        {selectedReview && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Review Details
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Pending Moderation
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#151C27]">{selectedReview.author}</h3>
              <span className="text-[11px] text-[#555E74]">Reviewed {selectedReview.venue}</span>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#151C27]">★ {selectedReview.rating || '5.0'} / 5.0</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Positive Sentiment</span>
              </div>
              <p className="text-xs text-[#555E74] leading-relaxed">
                "{selectedReview.text}"
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <Button size="sm">
                Approve Review
              </Button>
              <Button size="sm" variant="danger">
                Hide from Public
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

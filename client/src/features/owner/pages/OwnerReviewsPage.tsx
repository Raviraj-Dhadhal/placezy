import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import {
  Star,
  MessageSquare,
  Search,
  Filter,
  Check,
  Share2,
  Flag,
  FileDown
} from 'lucide-react';

export const OwnerReviewsPage: React.FC = () => {
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>('rev1');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header matching Screen 04 Module 02 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Customer Reviews</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Customer Reviews
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Monitor, analyze, and respond to customer feedback across all your Rajkot locations.
          </p>
        </div>

        <Button size="sm" variant="outline" icon={<FileDown size={14} />}>
          Export Reviews CSV
        </Button>
      </div>

      {/* Review Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">AVERAGE RATING</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-bold font-serif text-[#151C27]">4.7</span>
            <span className="text-xs text-[#555E74]">/ 5.0</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={13} className="fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">TOTAL REVIEWS</span>
          <span className="text-3xl font-bold font-serif text-[#151C27] block mt-1">284</span>
          <span className="text-xs text-emerald-700 font-semibold">+18 new feedback entries this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">PENDING REPLIES</span>
          <span className="text-3xl font-bold font-serif text-[#006765] block mt-1">14</span>
          <span className="text-xs text-[#555E74]">Average response time: 3.4 hours</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">CUSTOMER SATISFACTION</span>
          <span className="text-3xl font-bold font-serif text-[#151C27] block mt-1">94.8%</span>
          <span className="text-xs text-[#006765] font-semibold">Positive rating sentiment</span>
        </div>
      </div>

      {/* Reviews Interactive List with Direct Reply */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
        <div className="space-y-4">
          {/* Review 1 with open reply box matching Screen 04 */}
          <div className="p-5 rounded-xl border border-[#E2E8F0] space-y-3 bg-[#F8FAFC]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#151C27] flex items-center gap-2">
                  <span>Pooja Trivedi</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                    Verified Customer
                  </span>
                </h4>
                <span className="text-[10px] text-[#555E74]">Kathiyawadi Thali Bhavan • 2 days ago</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star size={13} className="fill-amber-400" />
                <span>5.0</span>
              </div>
            </div>

            <p className="text-xs text-[#555E74] leading-relaxed">
              "The Ringan No Oro and Bajra No Rotlo with fresh white butter were exceptional! Authentic Saurashtra taste and quick service even during peak Sunday dinner rush. Will definitely bring family again."
            </p>

            {/* Direct Response Form */}
            <div className="p-4 bg-white rounded-xl border border-[#CFE7E6] space-y-2.5">
              <span className="text-[11px] font-bold text-[#006765]">
                Respond as Kathiyawadi Thali Bhavan Management:
              </span>
              <textarea
                rows={2}
                placeholder="Write an official reply to Pooja..."
                defaultValue="Dear Pooja, thank you so much for celebrating traditional Kathiyawadi cuisine with us. We take great pride in our woodfire recipes and hope to serve your family again soon!"
                className="w-full p-2.5 text-xs border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006765] resize-none"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#8E98B0]">Replies are public and visible on your place profile.</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">Cancel</Button>
                  <Button size="sm">Post Reply</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-5 rounded-xl border border-[#E2E8F0] space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#151C27] flex items-center gap-2">
                  <span>Jignesh Vora</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                    Verified Customer
                  </span>
                </h4>
                <span className="text-[10px] text-[#555E74]">Rajkot Cafe & Bakery • Yesterday</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star size={13} className="fill-amber-400" />
                <span>5.0</span>
              </div>
            </div>

            <p className="text-xs text-[#555E74]">
              "Best cold coffee and grilled cheese sandwich on Yagnik Road. Cozy ambiance, great high-speed Wi-Fi, and very courteous staff. Perfect spot for quick work meetings."
            </p>

            {/* Existing Reply */}
            <div className="p-3 bg-[#F8FAFC] rounded-lg border-l-2 border-[#006765] text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#151C27] text-[11px]">Response from Owner</span>
                <span className="text-[10px] text-[#8E98B0]">Oct 23, 2026</span>
              </div>
              <p className="text-[11px] text-[#555E74]">
                "Thank you so much Jignesh! We take great pride in our cold coffee recipe and friendly atmosphere. Looking forward to serving you again soon!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

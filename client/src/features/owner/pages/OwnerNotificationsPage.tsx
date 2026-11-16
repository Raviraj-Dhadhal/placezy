import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ownerApi } from '../services/ownerService';
import {
  Bell,
  Star,
  Eye,
  CheckCircle,
  Clock,
  CheckCheck,
  MessageSquare
} from 'lucide-react';
import type { Place, Review } from '../../../types';

export const OwnerNotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [listings, setListings] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ownerApi.getListings(),
      ownerApi.getReviews(),
    ]).then(([lData, rData]) => {
      setListings(lData || []);
      setReviews(rData || []);
    }).catch((err) => {
      console.error('Error loading notifications data:', err);
    }).finally(() => setLoading(false));
  }, []);

  // Build dynamic notifications based on real database activity
  const notifications: Array<{
    id: string;
    title: string;
    tag: string;
    message: string;
    time: string;
    unread: boolean;
    icon: React.ReactNode;
  }> = [];

  // Recent reviews
  reviews.slice(0, 4).forEach((r, idx) => {
    const venueName = typeof r.placeId === 'object' ? (r.placeId as any).name : 'your listed venue';
    notifications.push({
      id: `rev-${r.id || (r as any)._id || idx}`,
      title: 'New Customer Review',
      tag: 'Review',
      message: `${r.userName} submitted a ${r.rating}★ rating on "${venueName}".`,
      time: 'Recent',
      unread: !r.ownerReply,
      icon: <Star size={16} className="text-amber-500 fill-amber-500" />,
    });
  });

  // Venue approvals
  listings.slice(0, 3).forEach((l, idx) => {
    notifications.push({
      id: `list-${l.id || (l as any)._id || idx}`,
      title: l.isVerified ? 'Business Verified' : 'Listing Submitted',
      tag: 'Listing',
      message: l.isVerified
        ? `Your venue "${l.name}" is verified and active on Placezy Gujarat discovery.`
        : `Verification pending for "${l.name}".`,
      time: 'Active',
      unread: false,
      icon: <CheckCircle size={16} className="text-emerald-600" />,
    });
  });

  const filtered = notifications.filter((n) => {
    if (activeTab === 'Unread') return n.unread;
    if (activeTab === 'Reviews') return n.tag === 'Review';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Notifications</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Notifications
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Real-time updates regarding your {listings.length} listed properties and reviews.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 text-xs">
        {['All', 'Unread', 'Reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-[#006765] text-white shadow-sm'
                : 'text-[#555E74] hover:bg-[#F0F3FF]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#555E74]">
            Loading notifications from database...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Bell size={32} className="mx-auto text-[#006765]" />
            <h3 className="text-sm font-bold text-[#151C27]">No notifications</h3>
            <p className="text-xs text-[#555E74]">You're all caught up with your business activity.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
                item.unread ? 'bg-[#F0F3FF]/40 border-[#CFE7E6]' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-[#151C27] flex items-center gap-2">
                    <span>{item.title}</span>
                    <span className="text-[10px] font-semibold text-[#006765] bg-[#CFE7E6]/40 px-1.5 py-0.2 rounded">
                      {item.tag}
                    </span>
                  </h4>
                  <span className="text-[10px] text-[#555E74]">{item.time}</span>
                </div>
                <p className="text-xs text-[#555E74] mt-1">{item.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

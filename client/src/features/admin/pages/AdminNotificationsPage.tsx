import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminService';
import api from '../../../services/api';
import {
  Bell,
  Star,
  CheckCircle,
  Clock,
  CheckCheck,
  Building2,
  UserCheck,
  Mail
} from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [reviews, setReviews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getAllReviews(),
      adminApi.getUsers(),
      adminApi.getBusinesses(),
      api.get('/contact').then((res) => res.data?.data || []).catch(() => []),
    ])
      .then(([r, u, b, c]) => {
        setReviews(r || []);
        setUsers(u || []);
        setBusinesses(b || []);
        setInquiries(c || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Dynamically assemble platform notifications from live database activity
  const notifications: Array<{
    id: string;
    title: string;
    tag: string;
    message: string;
    time: string;
    unread: boolean;
    icon: React.ReactNode;
  }> = [];

  // Pending reviews
  reviews
    .filter((r) => r.status === 'pending')
    .forEach((r, idx) => {
      const placeName = typeof r.placeId === 'object' ? r.placeId.name : 'Rajkot venue';
      notifications.push({
        id: `rev-pending-${r.id || r._id || idx}`,
        title: 'Review Requires Moderation',
        tag: 'Moderation',
        message: `${r.userName} submitted a review on "${placeName}" awaiting moderation.`,
        time: 'Pending',
        unread: true,
        icon: <Star size={16} className="text-amber-500 fill-amber-500" />,
      });
    });

  // Recent user registrations
  users.slice(0, 4).forEach((u, idx) => {
    notifications.push({
      id: `usr-${u.id || u._id || idx}`,
      title: 'New Explorer Registered',
      tag: 'User',
      message: `${u.name} (${u.email}) joined Placezy Gujarat community.`,
      time: u.status === 'suspended' ? 'Suspended' : 'Active',
      unread: false,
      icon: <UserCheck size={16} className="text-blue-600" />,
    });
  });

  // Business verification status
  businesses.slice(0, 3).forEach((b, idx) => {
    notifications.push({
      id: `biz-${b.id || b._id || idx}`,
      title: b.isVerified ? 'Business Verified' : 'Business Pending Approval',
      tag: 'Business',
      message: `"${b.name}" in ${b.city || 'Rajkot'} is ${b.isVerified ? 'verified & active' : 'under review'}.`,
      time: 'Live',
      unread: !b.isVerified,
      icon: <Building2 size={16} className="text-emerald-600" />,
    });
  });

  // Contact Support Inquiries from Explorers & Businesses
  inquiries.forEach((inq, idx) => {
    notifications.push({
      id: `inq-${inq._id || idx}`,
      title: `Contact Inquiry: ${inq.subject}`,
      tag: 'Inquiry',
      message: `From ${inq.fullName} (${inq.email}): "${inq.message}"`,
      time: inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent',
      unread: inq.status === 'unread',
      icon: <Mail size={16} className="text-purple-600" />,
    });
  });

  const filtered = notifications.filter((n) => {
    if (activeTab === 'Unread') return n.unread;
    if (activeTab === 'Moderation') return n.tag === 'Moderation';
    if (activeTab === 'Inquiries') return n.tag === 'Inquiry';
    if (activeTab === 'Users') return n.tag === 'User';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Notifications
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Real-time updates regarding explorer registrations, venue verifications, and review moderation.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 text-xs">
        {['All', 'Unread', 'Inquiries', 'Moderation', 'Users'].map((tab) => (
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

      {/* Notifications List */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#555E74]">Loading notifications...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Bell size={32} className="mx-auto text-[#006765]" />
            <h3 className="text-sm font-bold text-[#151C27]">No notifications</h3>
            <p className="text-xs text-[#555E74]">All moderation queues and platform alerts are clear.</p>
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

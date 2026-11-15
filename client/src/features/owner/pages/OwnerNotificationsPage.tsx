import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import {
  Bell,
  Star,
  Eye,
  CheckCircle,
  Clock,
  CheckCheck,
  Search,
  ChevronDown
} from 'lucide-react';

export const OwnerNotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All (6)');

  const notifications = [
    {
      id: 'on1',
      title: 'New Review Received',
      tag: 'New',
      message: 'A customer left a 5-star review on your business listing "Rajkot Cafe & Bakery".',
      time: '10 min ago',
      unread: true,
      actionText: 'View Review →',
      icon: <Star size={16} className="text-amber-500 fill-amber-500" />,
    },
    {
      id: 'on2',
      title: 'Listing Viewed Spike',
      tag: 'Analytics',
      message: 'Your business listing received over 420 new views today from the Jubilee Garden radius.',
      time: '2 hours ago',
      unread: true,
      icon: <Eye size={16} className="text-[#006765]" />,
    },
    {
      id: 'on3',
      title: 'Business Listing Approved',
      tag: 'System',
      message: 'Your business listing "Kathiyawadi Thali Bhavan" has been successfully verified by Rajkot territory admins.',
      time: 'Yesterday',
      unread: false,
      icon: <CheckCircle size={16} className="text-emerald-600" />,
    },
    {
      id: 'on4',
      title: 'Listing Update Reminder',
      tag: 'Reminder',
      message: 'Review your business hours and festival holiday timings to keep your active listing accurate.',
      time: '2 days ago',
      unread: false,
      icon: <Clock size={16} className="text-[#555E74]" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching Screen 08 Module 02 */}
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
            Stay updated with important platform activity and alerts across Gujarat territory.
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs text-[#006765] font-semibold hover:underline">
          <CheckCheck size={16} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E2E8F0]">
        {['All (6)', 'Unread (2)', 'Users', 'Businesses', 'Reviews', 'Reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? 'border-[#006765] text-[#006765] bg-[#F0F3FF]'
                : 'border-transparent text-[#555E74] hover:text-[#151C27]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 bg-white ${
              n.unread ? 'border-[#006765]/30 shadow-card' : 'border-[#E2E8F0]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5">
              {n.icon}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#151C27]">{n.title}</h4>
                  {n.tag && (
                    <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.2 rounded-full">
                      {n.tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#555E74]">
                  <span>{n.time}</span>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#006765]"></span>}
                </div>
              </div>

              <p className="text-xs text-[#555E74]">{n.message}</p>

              {n.actionText && (
                <div className="pt-1">
                  <span className="text-xs text-[#006765] font-semibold hover:underline cursor-pointer">
                    {n.actionText}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

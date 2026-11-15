import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import {
  Bell,
  AlertTriangle,
  Building2,
  User,
  Star,
  CheckCheck,
  Search,
  Eye,
  ShieldAlert
} from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All (128)');

  const alerts = [
    {
      id: 'a1',
      title: 'New Business Registration',
      tag: 'NEW',
      tagColor: 'bg-emerald-50 text-emerald-700',
      description: 'A new business "Kathiyawadi Heritage Cafe" has been submitted for approval in Rajkot.',
      time: '10 min ago',
      action: 'Review Registration',
    },
    {
      id: 'a2',
      title: 'New User Registered',
      tag: 'USER',
      tagColor: 'bg-blue-50 text-blue-700',
      description: 'A new user has created a Placezy explorer account in Rajkot territory.',
      time: '1 hour ago',
      action: 'View Profile',
    },
    {
      id: 'a3',
      title: 'Business Report Submitted',
      tag: 'URGENT',
      tagColor: 'bg-red-50 text-red-700',
      description: 'A business listing has been reported for review by 3 local guides.',
      time: '3 hours ago',
      action: 'Investigate',
    },
    {
      id: 'a4',
      title: 'New Review Flagged',
      tag: 'MODERATION',
      tagColor: 'bg-amber-50 text-amber-700',
      description: 'A review has been flagged and requires moderation attention.',
      time: 'Yesterday',
      action: 'Moderate',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching Screen 09 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Notifications
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Stay updated with important platform activity across Gujarat territory.
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs text-[#006765] font-semibold hover:underline">
          <CheckCheck size={16} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* 4 Metric Alert Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Alerts</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">128</span>
          <span className="text-[10px] text-emerald-700 font-semibold">+8% today</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Pending Unread</span>
          <span className="text-2xl font-bold font-serif text-amber-600 block mt-1">6</span>
          <span className="text-[10px] text-amber-700 font-semibold">Needs attention</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Action Required</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">3</span>
          <span className="text-[10px] text-red-600 font-semibold">Flagged for review</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Handled / Closed</span>
          <span className="text-2xl font-bold font-serif text-[#006765] block mt-1">119</span>
          <span className="text-[10px] text-[#006765] font-semibold">93% resolution rate</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E2E8F0]">
        {['All (128)', 'Unread (6)', 'Users', 'Businesses', 'Reviews', 'Reports'].map((tab) => (
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

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-4 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-[#151C27]">{a.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${a.tagColor}`}>
                  {a.tag}
                </span>
                <span className="text-[10px] text-[#555E74]">10 min ago</span>
              </div>
              <p className="text-xs text-[#555E74]">{a.description}</p>
            </div>

            <Button size="sm" variant="outline">
              {a.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Bell,
  Heart,
  Calendar,
  Star,
  CheckCheck,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const UserNotificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { label: 'All', count: 7 },
    { label: 'Recommendations', count: 2 },
    { label: 'Wishlist', count: 2 },
    { label: 'Trip Planner', count: 2 },
    { label: 'Reviews', count: 1 },
  ];

  const notifications = [
    {
      id: 'n1',
      title: 'New places you may like',
      category: 'Recommendations',
      message: 'Based on your love for heritage cafes, 2 new curated spots were added near Kalawad Road: "The Grand Courtyard Roastery" & "Kavita Artisan Tea".',
      time: '15m ago',
      unread: true,
      actionText: 'Explore Recommendations →',
      icon: <Sparkles size={16} className="text-[#006765]" />,
    },
    {
      id: 'n2',
      title: 'Your saved place has a new review',
      category: 'Wishlist',
      message: 'Dr. Ananya Mehta left a 5-star review for "Watson Museum & Jubilee Gardens": "Sensational evening heritage walk!"',
      time: '1h ago',
      unread: true,
      actionText: 'Read Review →',
      icon: <Heart size={16} className="text-rose-500" />,
    },
    {
      id: 'n3',
      title: 'Trip reminder: My Rajkot Trip',
      category: 'Trip Planner',
      message: 'Your itinerary starts tomorrow at 09:30 AM with Day 1: Heritage & Historic Old City.',
      time: '3h ago',
      unread: true,
      actionText: 'Open Itinerary →',
      icon: <Calendar size={16} className="text-blue-600" />,
    },
    {
      id: 'n4',
      title: 'Your review was submitted successfully',
      category: 'Reviews',
      message: 'Thank you for reviewing The Grand Courtyard Roastery & Bistro. Your review has been published to help Rajkot explorers.',
      time: 'Yesterday',
      unread: false,
      actionText: 'View Public Review →',
      icon: <Star size={16} className="text-amber-500" />,
    },
    {
      id: 'n5',
      title: 'Wishlist spot updated hours',
      category: 'Wishlist',
      message: 'Oasis Heritage Pavilions on University Road updated their evening timing to 4:00 PM - 10:30 PM.',
      time: '2 days ago',
      unread: false,
      actionText: 'View Place →',
      icon: <Clock size={16} className="text-[#555E74]" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching Screen 15 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
              Notifications
            </h1>
            <span className="text-xs font-semibold bg-[#CFE7E6]/40 text-[#006765] px-2.5 py-0.5 rounded-full">
              3 Unread
            </span>
          </div>
          <p className="text-xs text-[#555E74] mt-0.5">
            Stay updated with your places, itineraries, and activities across Rajkot.
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs text-[#006765] font-semibold hover:underline self-start sm:self-auto">
          <CheckCheck size={16} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E2E8F0]">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === tab.label
                ? 'border-[#006765] text-[#006765] bg-[#F0F3FF]'
                : 'border-transparent text-[#555E74] hover:text-[#151C27]'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] bg-slate-100 text-[#555E74] px-1.5 py-0.2 rounded-full font-bold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 bg-white ${
              item.unread
                ? 'border-[#006765]/30 shadow-card'
                : 'border-[#E2E8F0]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5">
              {item.icon}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#151C27]">{item.title}</h4>
                  <Badge variant="white" size="sm">{item.category}</Badge>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#555E74]">
                  <span>{item.time}</span>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#006765]"></span>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#555E74] leading-relaxed">
                {item.message}
              </p>

              <div className="pt-1">
                <span className="text-xs text-[#006765] font-semibold hover:underline cursor-pointer">
                  {item.actionText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

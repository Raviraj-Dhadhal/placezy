import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import {
  Bell,
  Heart,
  Calendar,
  Star,
  CheckCheck,
  Clock,
  Sparkles,
  ArrowRight,
  LogIn
} from 'lucide-react';

export const UserNotificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshNotifications } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDbNotifications = () => {
    setLoading(true);
    api
      .get('/notifications')
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data?.data)) {
          setNotifications(res.data.data);
        }
      })
      .catch((err) => console.error('Error fetching notifications:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDbNotifications();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto">
          <Bell size={24} />
        </div>
        <h2 className="text-lg font-bold text-[#151C27]">Notifications require sign in</h2>
        <p className="text-xs text-[#555E74] leading-relaxed">
          Please log in to your Placezy account to view your notifications, trip updates, and community alerts.
        </p>
        <Button fullWidth icon={<LogIn size={14} />} onClick={() => navigate('/login')}>
          Log In Now
        </Button>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      refreshNotifications();
    } catch (err) {
      console.error('Failed to mark all notifications read:', err);
    }
  };

  const handleMarkOneRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => ((n._id || n.id) === id ? { ...n, read: true } : n))
      );
      refreshNotifications();
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  };

  const tabs = [
    { label: 'All', count: notifications.length },
    { label: 'Unread', count: unreadCount },
    { label: 'Reviews', count: notifications.filter((n) => n.type === 'review').length },
    { label: 'System', count: notifications.filter((n) => n.type === 'system').length },
  ];

  const displayedNotifications = notifications.filter((n) => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Reviews') return n.type === 'review';
    if (activeTab === 'System') return n.type === 'system';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
              Notifications
            </h1>
            {unreadCount > 0 ? (
              <span className="text-xs font-semibold bg-[#CFE7E6]/40 text-[#006765] px-2.5 py-0.5 rounded-full">
                {unreadCount} Unread
              </span>
            ) : (
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                All Read
              </span>
            )}
          </div>
          <p className="text-xs text-[#555E74] mt-0.5">
            Stay updated with your places, itineraries, and activities across Rajkot.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-xs text-[#006765] font-semibold hover:underline self-start sm:self-auto cursor-pointer"
          >
            <CheckCheck size={16} />
            <span>Mark all as read</span>
          </button>
        )}
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
        {loading ? (
          <div className="py-12 text-center text-xs text-[#555E74]">Loading notifications from database...</div>
        ) : displayedNotifications.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] text-center space-y-2">
            <p className="text-sm font-semibold text-[#151C27]">No notifications</p>
            <p className="text-xs text-[#555E74]">You're all caught up! Updates about your saved places and trips will appear here.</p>
          </div>
        ) : (
          displayedNotifications.map((item) => {
            const notifId = item._id || item.id;
            const isUnread = !item.read;

            return (
              <div
                key={notifId}
                onClick={() => {
                  if (isUnread) handleMarkOneRead(notifId);
                }}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 bg-white cursor-pointer ${
                  isUnread
                    ? 'border-[#006765]/40 shadow-sm bg-[#F0F3FF]/20'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5 text-[#006765]">
                  {item.type === 'review' ? (
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                  ) : item.type === 'trip' ? (
                    <Calendar size={16} className="text-blue-500" />
                  ) : (
                    <Sparkles size={16} className="text-[#006765]" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#151C27]">{item.title}</h4>
                      <Badge variant="white" size="sm">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#555E74]">
                      <span>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-[#006765]"></span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#555E74] leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

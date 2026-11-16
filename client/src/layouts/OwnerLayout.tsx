import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '../components/shared/Logo';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Store,
  MessageSquare,
  Image,
  BarChart3,
  User,
  LogOut,
  Bell,
  ChevronDown,
  MapPin
} from 'lucide-react';

export const OwnerLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, unreadNotificationsCount } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/owner/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'My Listings', path: '/owner/listings', icon: <Store size={18} /> },
    { label: 'Reviews', path: '/owner/reviews', icon: <MessageSquare size={18} />, badge: '2 New' },
    { label: 'Photos', path: '/owner/photos', icon: <Image size={18} /> },
    { label: 'Analytics', path: '/owner/analytics', icon: <BarChart3 size={18} /> },
    { label: 'Profile & Settings', path: '/owner/settings', icon: <User size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Bar for Merchant / Owner */}
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={34} />
          <span className="text-[11px] font-semibold bg-[#CFE7E6]/50 text-[#006765] px-2.5 py-0.5 rounded-full border border-[#006765]/20">
            Business Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#555E74] bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
            <MapPin size={14} className="text-[#006765]" />
            <span>Rajkot, Gujarat</span>
          </div>

          <button
            onClick={() => navigate('/owner/notifications')}
            className="p-2 text-[#555E74] hover:text-[#151C27] hover:bg-[#F0F3FF] rounded-full relative"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#006765]"></span>
            )}
          </button>

          {/* Business profile info */}
          <div
            onClick={() => navigate('/owner/settings')}
            className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#006765] text-white flex items-center justify-center font-bold text-xs font-serif">
              {user?.name?.slice(0, 2).toUpperCase() || 'OW'}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-[#151C27]">{user?.name || 'Business Owner'}</span>
              <span className="text-[10px] text-[#555E74]">{user?.city || 'Rajkot'} Merchant</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E2E8F0] p-4 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors
                  ${isActive
                    ? 'bg-[#F0F3FF] text-[#006765] font-semibold'
                    : 'text-[#555E74] hover:bg-[#F0F3FF] hover:text-[#151C27]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#CFE7E6] text-[#006765] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 text-xs text-[#555E74] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border-t border-[#E2E8F0] pt-4"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

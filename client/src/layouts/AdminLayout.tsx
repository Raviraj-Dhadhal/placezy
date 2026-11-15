import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '../components/shared/Logo';
import {
  LayoutDashboard,
  Users,
  Building2,
  FolderTree,
  MessageSquareCheck,
  FileBarChart2,
  Settings,
  LogOut,
  Bell,
  ChevronDown
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Users', path: '/admin/users', icon: <Users size={18} />, badge: '12.4k' },
    { label: 'Businesses', path: '/admin/businesses', icon: <Building2 size={18} />, badge: '1,840' },
    { label: 'Categories', path: '/admin/categories', icon: <FolderTree size={18} />, badge: '48' },
    { label: 'Reviews', path: '/admin/reviews', icon: <MessageSquareCheck size={18} />, badge: '3 pending', badgeColor: 'bg-amber-100 text-amber-800' },
    { label: 'Reports', path: '/admin/reports', icon: <FileBarChart2 size={18} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Bar for Admin */}
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={34} />
          <span className="text-[11px] font-semibold bg-[#F0F3FF] text-[#006765] px-2.5 py-0.5 rounded-full border border-[#006765]/20">
            Enterprise v2.4
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#555E74] ml-4 pl-4 border-l border-[#E2E8F0]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Reports & Analytics | Gujarat Territory Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/notifications')}
            className="p-2 text-[#555E74] hover:text-[#151C27] hover:bg-[#F0F3FF] rounded-full relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          {/* Admin User Badge */}
          <div
            onClick={() => navigate('/admin/profile')}
            className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#151C27] text-white flex items-center justify-center font-bold text-xs">
              GP
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-[#151C27]">Admin Console</span>
              <span className="text-[10px] text-[#555E74]">Gujarat Region (Super Admin)</span>
            </div>
            <ChevronDown size={14} className="text-[#555E74]" />
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
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-[#F1F5F9] text-[#555E74]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => navigate('/login')}
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

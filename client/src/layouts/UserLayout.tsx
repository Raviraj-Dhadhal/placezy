import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '../components/shared/Logo';
import { Footer } from '../components/shared/Footer';
import {
  Compass,
  MapPin,
  Map,
  Heart,
  Calendar,
  Bell,
  User,
  Search,
  ChevronDown,
  Settings,
  HelpCircle,
  Plus,
  Menu,
  X
} from 'lucide-react';

export const UserLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/', icon: <Compass size={18} /> },
    { label: 'Explore', path: '/explore', icon: <Search size={18} /> },
    { label: 'Nearby', path: '/nearby', icon: <MapPin size={18} /> },
    { label: 'Map', path: '/map', icon: <Map size={18} /> },
    { label: 'Wishlist', path: '/wishlist', icon: <Heart size={18} /> },
    { label: 'Trip Planner', path: '/trip-planner', icon: <Calendar size={18} /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={18} />, badge: 3 },
    { label: 'Profile', path: '/profile', icon: <User size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#555E74] hover:text-[#151C27] p-1.5 rounded-lg hover:bg-[#F0F3FF]"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Logo size={34} />
        </div>

        {/* Global Search & Territory Selector */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-button px-3 py-1.5 w-80 text-xs text-[#555E74]">
            <Search size={14} className="text-[#8E98B0]" />
            <input
              type="text"
              placeholder="Search settings or account details..."
              className="bg-transparent border-none outline-none w-full text-xs text-[#151C27]"
            />
          </div>

          {/* Territory Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#CFE7E6]/40 text-[#006765] px-3 py-1.5 rounded-full text-xs font-medium border border-[#006765]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006765] animate-pulse"></span>
            <span>Rajkot, Gujarat</span>
            <span
              onClick={() => navigate('/explore/filter')}
              className="text-[#006765]/60 hover:underline cursor-pointer ml-1"
            >
              (Change)
            </span>
          </div>

          {/* Notification bell */}
          <button
            onClick={() => navigate('/notifications')}
            className="p-2 text-[#555E74] hover:text-[#151C27] hover:bg-[#F0F3FF] rounded-full relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#006765]"></span>
          </button>

          {/* User Profile Pill */}
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#F0F3FF] transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Mahek"
              className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0]"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#151C27]">Mahek</span>
              <span className="text-[10px] text-[#555E74]">Urban Explorer & Insider</span>
            </div>
            <ChevronDown size={14} className="text-[#555E74] hidden md:block" />
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside
          className={`
            fixed md:sticky top-16 z-20 h-[calc(100vh-4rem)] w-64 bg-white border-r border-[#E2E8F0]
            flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="space-y-4">
            {/* CTA: Plan New Trip */}
            <button
              onClick={() => {
                navigate('/plan-trip');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#006765] hover:bg-[#005553] text-white text-xs font-semibold py-2.5 px-4 rounded-button transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span>Plan New Trip</span>
            </button>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
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
                    <span className="w-2 h-2 rounded-full bg-[#006765]"></span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Territory & Settings Block (matching Figma: Rajkot Active Territory placed ABOVE settings) */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-xs text-[#555E74]">
            {/* Active Territory Indicator above Settings */}
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[11px]">
              <div className="flex items-center gap-1.5 font-semibold text-[#151C27]">
                <MapPin size={13} className="text-[#006765]" />
                <span>Rajkot, Gujarat</span>
              </div>
              <span className="text-[#006765] block mt-0.5 font-medium pl-4">• Active Territory</span>
            </div>

            {/* Settings & Help */}
            <div className="space-y-0.5">
              <NavLink
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2 rounded-lg transition-colors
                  ${isActive ? 'bg-[#F0F3FF] text-[#006765] font-semibold' : 'hover:bg-[#F0F3FF] hover:text-[#151C27]'}
                `}
              >
                <Settings size={16} />
                <span>Settings</span>
              </NavLink>
              <NavLink
                to="/help"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2 rounded-lg transition-colors
                  ${isActive ? 'bg-[#F0F3FF] text-[#006765] font-semibold' : 'hover:bg-[#F0F3FF] hover:text-[#151C27]'}
                `}
              >
                <HelpCircle size={16} />
                <span>Help & Support</span>
              </NavLink>
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Reusable Footer Component with 2026 */}
      <Footer />
    </div>
  );
};

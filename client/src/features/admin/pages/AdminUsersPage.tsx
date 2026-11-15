import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Avatar } from '../../../components/ui/Avatar';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Ban,
  MoreVertical,
  X,
  FileDown,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>({
    name: 'Harshvardhan Jadeja',
    gender: 'male',
    role: 'Verified Explorer • Rajkot Local',
    email: 'harsh.jadeja@gmail.com',
    phone: '+91 98251 44521',
    city: 'Rajkot, Gujarat',
    registered: 'Oct 24, 2026',
    status: 'Active',
    placesSaved: 48,
    itineraries: 12,
    reviews: 18,
  });

  const users = [
    {
      id: 'u1',
      name: 'Harshvardhan Jadeja',
      gender: 'male',
      role: 'Local Explorer',
      email: 'harsh.jadeja@gmail.com',
      mobile: '+91 98251 44521',
      city: 'Rajkot',
      registered: 'Oct 24, 2026',
      status: 'Active',
    },
    {
      id: 'u2',
      name: 'Priyanshi Mehta',
      gender: 'female',
      role: 'Food & Heritage Curator',
      email: 'priyanshi.m@outlook.com',
      mobile: '+91 97123 88902',
      city: 'Rajkot',
      registered: 'Oct 19, 2026',
      status: 'Active',
    },
    {
      id: 'u3',
      name: 'Bhavik Somani',
      gender: 'male',
      role: 'New Sign-up',
      email: 'bhavik.somani@yahoo.com',
      mobile: '+91 98980 12345',
      city: 'Rajkot',
      registered: 'Oct 10, 2026',
      status: 'Active',
    },
    {
      id: 'u4',
      name: 'Maulik Dave',
      gender: 'male',
      role: 'Commuter Traveler',
      email: 'maulik.dave@gmail.com',
      mobile: '+91 94260 77819',
      city: 'Ahmedabad',
      registered: 'Sep 28, 2026',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Screen 02 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Users
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            View, inspect, and manage registered explorers and community curators across Gujarat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" icon={<FileDown size={14} />}>
            Export Users
          </Button>
          <Button size="sm" icon={<Plus size={14} />}>
            + Add New User
          </Button>
        </div>
      </div>

      {/* 4 Metric KPI Cards matching Screen 02 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Users</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">18,420</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 8.5% this month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Users</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">16,890</span>
          <span className="text-[10px] text-[#006765] font-semibold">91.7% of total directory</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">New Users (This Month)</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">1,240</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 14% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Suspended Users</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">290</span>
          <span className="text-[10px] text-[#555E74]">12 under review</span>
        </div>
      </div>

      {/* Main Grid: Data Table Left, User Profile Slide-Over Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input placeholder="Search by name, email or city..." icon={<Search size={14} />} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {['All Users', 'Active', 'Suspended'].map((f, idx) => (
                <button
                  key={f}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    idx === 0 ? 'bg-[#006765] text-white' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                  <th className="pb-2.5 pl-2">User</th>
                  <th className="pb-2.5">Email</th>
                  <th className="pb-2.5">Mobile</th>
                  <th className="pb-2.5">City</th>
                  <th className="pb-2.5">Registered</th>
                  <th className="pb-2.5 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className="hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                  >
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar gender={u.gender as any} size={28} />
                        <div>
                          <span className="font-bold text-[#151C27] block">{u.name}</span>
                          <span className="text-[10px] text-[#555E74]">{u.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[#555E74]">{u.email}</td>
                    <td className="py-3 text-[#555E74]">{u.mobile}</td>
                    <td className="py-3 text-[#555E74]">{u.city}</td>
                    <td className="py-3 text-[#555E74]">{u.registered}</td>
                    <td className="py-3 pr-2 text-right">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide-over Profile Drawer (4 Cols) matching Screen 02 */}
        {selectedUser && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                User Profile Details
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Avatar gender={selectedUser.gender || 'male'} size={48} name={selectedUser.name} />
              <div>
                <h3 className="font-bold text-sm text-[#151C27]">{selectedUser.name}</h3>
                <span className="text-[10px] text-[#006765] font-semibold">{selectedUser.role}</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">48</span>
                <span className="text-[9px] text-[#555E74]">Places Saved</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">12</span>
                <span className="text-[9px] text-[#555E74]">Itineraries</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">18</span>
                <span className="text-[9px] text-[#555E74]">Reviews</span>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-2 text-xs text-[#555E74] pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#006765]" />
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#006765]" />
                <span>{selectedUser.mobile || '+91 98251 44521'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#006765]" />
                <span>Rajkot, Gujarat (360005)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#006765]" />
                <span>Registered: Oct 24, 2026</span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
              <Button size="sm" variant="outline">
                Edit Details
              </Button>
              <Button size="sm" variant="danger">
                Suspend User
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

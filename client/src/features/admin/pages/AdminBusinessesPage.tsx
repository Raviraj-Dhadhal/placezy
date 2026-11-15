import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  Building2,
  Search,
  CheckCircle,
  XCircle,
  FileDown,
  Plus,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

export const AdminBusinessesPage: React.FC = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<any | null>({
    name: 'Rajkot Cafe & Bakery',
    category: 'Café & Gourmet Bakery',
    owner: 'Devang Dave',
    phone: '+91 281 246 7890',
    email: 'devang.dave@rajkotcafe.in',
    address: 'Opp. Imperial Palace, Yagnik Road, Rajkot 360001',
    timings: '08:00 AM - 11:30 PM (Mon - Sun)',
    gstin: '24AAACR1234F1Z5',
    status: 'Active',
    views: '14.8k',
    rating: 4.8,
    reviews: 284,
  });

  const businesses = [
    {
      id: 'b1',
      name: 'Rajkot Cafe & Bakery',
      owner: 'Devang Dave',
      category: 'Cafe & Bistro',
      location: 'Yagnik Road, Rajkot',
      status: 'Active',
      rating: 4.5,
      reviews: 128,
      views: 1240,
    },
    {
      id: 'b2',
      name: 'Kathiyawadi Thali Bhavan',
      owner: 'Pooja Trivedi',
      category: 'Authentic Dining',
      location: 'Kalawad Road, Rajkot',
      status: 'Active',
      rating: 4.8,
      reviews: 112,
      views: 1890,
    },
    {
      id: 'b3',
      name: 'Saurashtra Spice Bistro',
      owner: 'Harish Patel',
      category: 'Fine Dining',
      location: '150 Feet Ring Road, Rajkot',
      status: 'Pending Verification',
      rating: 0,
      reviews: 0,
      views: 45,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Screen 03 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Businesses
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Review, approve, and manage registered businesses and merchants across Gujarat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" icon={<FileDown size={14} />}>
            Export Businesses
          </Button>
          <Button size="sm" icon={<Plus size={14} />}>
            + Add New Business
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">3,420</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 6.8% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">3,180</span>
          <span className="text-[10px] text-[#006765] font-semibold">93.0% verified & live</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Pending Approvals</span>
          <span className="text-2xl font-bold font-serif text-amber-600 block mt-1">165</span>
          <span className="text-[10px] text-amber-700 font-semibold">18 urgent KYC reviews</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Suspended</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">75</span>
          <span className="text-[10px] text-[#555E74]">Under compliance review</span>
        </div>
      </div>

      {/* Main Grid: Data Table Left, Business Profile Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input placeholder="Search business or owner..." icon={<Search size={14} />} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {['All', 'Active', 'Pending', 'Suspended'].map((t, idx) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    idx === 0 ? 'bg-[#006765] text-white' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                  <th className="pb-2.5 pl-2">Business Name</th>
                  <th className="pb-2.5">Owner</th>
                  <th className="pb-2.5">Category</th>
                  <th className="pb-2.5">Location</th>
                  <th className="pb-2.5 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {businesses.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBusiness(b)}
                    className="hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                  >
                    <td className="py-3 pl-2 font-bold text-[#151C27]">{b.name}</td>
                    <td className="py-3 text-[#555E74]">{b.owner}</td>
                    <td className="py-3 text-[#555E74]">{b.category}</td>
                    <td className="py-3 text-[#555E74]">{b.location}</td>
                    <td className="py-3 pr-2 text-right">
                      {b.status === 'Active' ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Business Profile Slide-over Drawer matching Screen 03 */}
        {selectedBusiness && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Business Profile
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#151C27]">{selectedBusiness.name}</h3>
              <span className="text-[10px] text-[#555E74] block mt-0.5">
                {selectedBusiness.category || 'Café & Gourmet Bakery'}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">4.8 ★</span>
                <span className="text-[9px] text-[#555E74]">284 reviews</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">14.8k</span>
                <span className="text-[9px] text-[#555E74]">Total Views</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">940</span>
                <span className="text-[9px] text-[#555E74]">Wishlist Saves</span>
              </div>
            </div>

            {/* Merchant Details */}
            <div className="space-y-2 text-xs text-[#555E74] pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <span>Owner:</span>
                <span className="font-bold text-[#151C27]">{selectedBusiness.owner || 'Devang Dave'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Contact:</span>
                <span className="font-bold text-[#151C27]">+91 281 246 7890</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verification:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck size={13} />
                  <span>KYC & GSTIN Verified</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
              <Button size="sm">
                Edit Listing
              </Button>
              <Button size="sm" variant="danger">
                Suspend Listing
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

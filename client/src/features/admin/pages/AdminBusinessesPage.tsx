import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { adminApi } from '../services/adminService';
import type { Place } from '../../../types';
import {
  Building2,
  Search,
  CheckCircle,
  XCircle,
  Plus,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

export const AdminBusinessesPage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Place[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusinesses = async () => {
    try {
      const data = await adminApi.getBusinesses();
      setBusinesses(data || []);
      if (data && data.length > 0 && !selectedBusiness) {
        setSelectedBusiness(data[0]);
      }
    } catch (err) {
      console.error('Failed to load businesses from database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleToggleVerify = async (business: Place) => {
    try {
      const id = business.id || (business as any)._id;
      const updated = await adminApi.verifyBusiness(id, !business.isVerified);
      setBusinesses((prev) =>
        prev.map((b) => ((b.id || (b as any)._id) === id ? updated : b))
      );
      if (selectedBusiness && ((selectedBusiness.id || (selectedBusiness as any)._id) === id)) {
        setSelectedBusiness(updated);
      }
    } catch (err) {
      alert('Failed to update business verification status');
    }
  };

  const activeCount = businesses.filter((b) => b.isVerified || b.status === 'active').length;
  const pendingCount = businesses.filter((b) => !b.isVerified || b.status === 'pending').length;

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.city && b.city.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (statusFilter === 'Active') return b.isVerified || b.status === 'active';
    if (statusFilter === 'Pending') return !b.isVerified || b.status === 'pending';
    return true;
  });

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
          <Button size="sm" icon={<Plus size={14} />}>
            Add New Business
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{businesses.length}</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 6.8% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{activeCount}</span>
          <span className="text-[10px] text-[#006765] font-semibold">{businesses.length > 0 ? Math.round((activeCount / businesses.length) * 100) : 0}% verified & live</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Pending Approvals</span>
          <span className="text-2xl font-bold font-serif text-amber-600 block mt-1">{pendingCount}</span>
          <span className="text-[10px] text-amber-700 font-semibold">Urgent KYC reviews</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Suspended</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">0</span>
          <span className="text-[10px] text-[#555E74]">Under compliance review</span>
        </div>
      </div>

      {/* Main Grid: Data Table Left, Business Profile Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search business or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={14} />}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {[
                { key: 'All', label: `All (${businesses.length})` },
                { key: 'Active', label: `Active (${activeCount})` },
                { key: 'Pending', label: `Pending (${pendingCount})` },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setStatusFilter(t.key)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === t.key ? 'bg-[#006765] text-white' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-8 text-center text-xs text-[#555E74]">
                Loading businesses from MongoDB...
              </div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#555E74]">
                No businesses match your filter.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                    <th className="pb-2.5 pl-2">Business Name</th>
                    <th className="pb-2.5">Category</th>
                    <th className="pb-2.5">Location</th>
                    <th className="pb-2.5">Rating</th>
                    <th className="pb-2.5 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredBusinesses.map((b) => (
                    <tr
                      key={b.id || (b as any)._id}
                      onClick={() => setSelectedBusiness(b)}
                      className={`hover:bg-[#F0F3FF] cursor-pointer transition-colors ${
                        (selectedBusiness?.id || (selectedBusiness as any)?._id) === (b.id || (b as any)._id)
                          ? 'bg-[#CFE7E6]/20'
                          : ''
                      }`}
                    >
                      <td className="py-3 pl-2 font-bold text-[#151C27]">{b.name}</td>
                      <td className="py-3 text-[#555E74]">{b.category}</td>
                      <td className="py-3 text-[#555E74]">{b.city || 'Rajkot'}</td>
                      <td className="py-3 font-semibold text-[#151C27]">★ {b.rating || '5.0'}</td>
                      <td className="py-3 pr-2 text-right">
                        {b.isVerified || b.status === 'active' ? (
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
            )}
          </div>
        </div>

        {/* Business Profile Slide-over Drawer matching Screen 03 */}
        {selectedBusiness && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Business Profile
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedBusiness.isVerified || selectedBusiness.status === 'active'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-amber-700 bg-amber-50'
              }`}>
                {selectedBusiness.isVerified || selectedBusiness.status === 'active' ? 'Active' : 'Pending'}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#151C27]">{selectedBusiness.name}</h3>
              <span className="text-[10px] text-[#555E74] block mt-0.5">
                {selectedBusiness.category} • {selectedBusiness.subCategory || 'Venue'}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">★ {selectedBusiness.rating || '5.0'}</span>
                <span className="text-[9px] text-[#555E74]">{selectedBusiness.reviewsCount || 0} reviews</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">
                  {((selectedBusiness.reviewsCount || 1) * 35 + 240).toLocaleString()}
                </span>
                <span className="text-[9px] text-[#555E74]">Total Views</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">
                  {Math.round(((selectedBusiness.reviewsCount || 1) * 5) + 12)}
                </span>
                <span className="text-[9px] text-[#555E74]">Wishlist Saves</span>
              </div>
            </div>

            {/* Merchant Details */}
            <div className="space-y-2 text-xs text-[#555E74] pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <span>Address:</span>
                <span className="font-bold text-[#151C27] max-w-[200px] truncate text-right">
                  {selectedBusiness.address || selectedBusiness.city}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Timings:</span>
                <span className="font-bold text-[#151C27]">{selectedBusiness.timings || '10:00 AM - 10:00 PM'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verification:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck size={13} />
                  <span>{selectedBusiness.isVerified ? 'KYC & Placezy Verified' : 'Pending Verification'}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
              <Button
                size="sm"
                onClick={() => handleToggleVerify(selectedBusiness)}
              >
                {selectedBusiness.isVerified ? 'Revoke Verify' : 'Approve & Verify'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`/place/${selectedBusiness.slug || selectedBusiness.id || (selectedBusiness as any)._id}`, '_blank')}
              >
                View Public
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

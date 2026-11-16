import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminService';
import {
  FileBarChart2,
  TrendingUp,
  Building2,
  Users,
  MapPin,
  Star
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getMetrics(),
      adminApi.getBusinesses(),
      adminApi.getUsers(),
      adminApi.getAllReviews(),
    ])
      .then(([m, b, u, r]) => {
        setMetrics(m || null);
        setBusinesses(b || []);
        setUsers(u || []);
        setReviews(r || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalUsers = users.length;
  const totalBusinesses = businesses.length;
  const verifiedListings = businesses.filter((b) => b.isVerified).length;
  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r) => r.status === 'approved').length;
  const avgRating =
    approvedReviews > 0
      ? (
          reviews
            .filter((r) => r.status === 'approved')
            .reduce((acc, curr) => acc + (curr.rating || 0), 0) / approvedReviews
        ).toFixed(1)
      : '0.0';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Platform Reports & Analytics
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Territory-level performance reports across users, businesses, and reviews dynamically computed from MongoDB.
          </p>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Users</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : totalUsers}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">MongoDB accounts</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Places</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : totalBusinesses}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">{verifiedListings} Verified Live</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Total Reviews</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            {loading ? '...' : totalReviews}
          </span>
          <span className="text-[10px] text-[#006765] font-semibold">{approvedReviews} Approved</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Average Rating</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">
            ★ {loading ? '...' : avgRating}
          </span>
          <span className="text-[10px] text-amber-600 font-semibold">Platform aggregate</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-[11px] text-[#555E74]">Primary Hub</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">Rajkot</span>
          <span className="text-[10px] text-[#006765] font-semibold">Gujarat Territory</span>
        </div>
      </div>

      {/* Territory Regional Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#151C27] border-b border-[#F1F5F9] pb-3">
          Territory Performance: Rajkot City Hub
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#CFE7E6]/30 border border-[#006765]/30 rounded-xl space-y-1">
            <span className="font-bold text-[#006765] text-sm block">Active Venues</span>
            <span className="text-[#555E74] block">Verified Places: {verifiedListings}</span>
            <span className="text-[10px] text-[#006765] font-semibold">Live in public explore & search</span>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
            <span className="font-bold text-[#151C27] text-sm block">Community Explorers</span>
            <span className="text-[#555E74] block">Registered Users: {totalUsers}</span>
            <span className="text-[10px] text-[#555E74]">Actively contributing reviews & wishlists</span>
          </div>

          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
            <span className="font-bold text-[#151C27] text-sm block">Moderation Health</span>
            <span className="text-[#555E74] block">
              Pending Queue: {reviews.filter((r) => r.status === 'pending').length}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">Admin moderation active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

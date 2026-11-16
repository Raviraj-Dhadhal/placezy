import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { adminApi } from '../services/adminService';
import {
  Users,
  Building2,
  MapPin,
  MessageSquareCheck,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getMetrics(),
      adminApi.getBusinesses(),
      adminApi.getAllReviews(),
      adminApi.getUsers(),
    ])
      .then(([m, b, r, u]) => {
        setMetrics(m || null);
        setBusinesses(b || []);
        setReviews(r || []);
        setUsers(u || []);
      })
      .catch((err) => console.error('Error fetching admin dashboard data:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalUsers = metrics?.totalUsers ?? users.length;
  const totalBusinesses = metrics?.totalOwners ?? 1;
  const totalPlaces = metrics?.totalPlaces ?? businesses.length;
  const verifiedPlaces = metrics?.verifiedPlaces ?? businesses.filter((b) => b.isVerified).length;
  const totalReviews = metrics?.totalReviews ?? reviews.length;
  const pendingReviews = metrics?.pendingReviews ?? reviews.filter((r) => r.status === 'pending').length;

  const kpis = [
    { title: 'Total Users', value: totalUsers, change: 'MongoDB explorers', icon: <Users size={18} className="text-[#006765]" /> },
    { title: 'Registered Businesses', value: totalBusinesses, change: 'Verified owners', icon: <Building2 size={18} className="text-blue-600" /> },
    { title: 'Total Places', value: totalPlaces, change: `${verifiedPlaces} Verified Active`, icon: <MapPin size={18} className="text-purple-600" /> },
    { title: 'Total Reviews', value: totalReviews, change: 'Across all venues', icon: <MessageSquareCheck size={18} className="text-emerald-600" /> },
    {
      title: 'Pending Moderation',
      value: pendingReviews,
      change: pendingReviews > 0 ? 'Requires Action' : 'All Clear',
      alert: pendingReviews > 0,
      icon: <AlertCircle size={18} className="text-amber-500" />,
    },
  ];

  const handleApproveReview = async (reviewId: string) => {
    try {
      await adminApi.approveReview(reviewId);
      const updated = await adminApi.getAllReviews();
      setReviews(updated || []);
      const newMetrics = await adminApi.getMetrics();
      setMetrics(newMetrics);
    } catch (err) {
      console.error(err);
      alert('Error approving review');
    }
  };

  const handleRejectReview = async (reviewId: string) => {
    try {
      await adminApi.rejectReview(reviewId, 'Content guidelines violation');
      const updated = await adminApi.getAllReviews();
      setReviews(updated || []);
      const newMetrics = await adminApi.getMetrics();
      setMetrics(newMetrics);
    } catch (err) {
      console.error(err);
      alert('Error rejecting review');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Admin Console</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Gujarat Territory Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Admin Dashboard
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Manage and monitor the entire Placezy platform, ratings, and business verification directly from MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/admin/businesses')}
          >
            Manage Businesses
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/admin/categories')}
            icon={<Plus size={14} />}
          >
            Categories
          </Button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        {kpis.map((m) => (
          <div key={m.title} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#555E74]">{m.title}</span>
              <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                {m.icon}
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold font-serif text-[#151C27] block">
                {loading ? '...' : m.value}
              </span>
              <span className={`text-[10px] font-semibold ${m.alert ? 'text-amber-600' : 'text-emerald-700'}`}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Recent Real Business Registrations */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Live Listed Businesses</h3>
                <span className="text-[10px] text-[#555E74]">Real-time catalog from MongoDB</span>
              </div>
              <button
                onClick={() => navigate('/admin/businesses')}
                className="text-xs text-[#006765] font-semibold hover:underline"
              >
                View All ({businesses.length}) →
              </button>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="py-8 text-center text-xs text-[#555E74]">Loading businesses...</div>
              ) : businesses.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#555E74]">No businesses listed yet.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                      <th className="pb-2">Business Name</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Location</th>
                      <th className="pb-2">Rating</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {businesses.slice(0, 5).map((b) => (
                      <tr key={b.id || b._id} className="hover:bg-[#F8FAFC]">
                        <td className="py-3 font-bold text-[#151C27] flex items-center gap-2">
                          <img
                            src={b.imageUrl || b.coverImage || '/images/places/grand-courtyard.jpg'}
                            alt={b.name}
                            className="w-7 h-7 rounded object-cover"
                          />
                          <span>{b.name}</span>
                        </td>
                        <td className="py-3 text-[#555E74]">{b.category}</td>
                        <td className="py-3 text-[#555E74]">{b.city || 'Rajkot'}</td>
                        <td className="py-3 font-semibold text-[#151C27]">
                          ★ {Number(b.rating || 0).toFixed(1)} ({b.reviewsCount || 0})
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              b.isVerified
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                                : 'text-amber-700 bg-amber-50 border-amber-200'
                            }`}
                          >
                            {b.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Moderation & Real User Activity */}
        <div className="lg:col-span-4 space-y-4">
          {/* Moderation Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Reviews Moderation
              </h3>
              <button
                onClick={() => navigate('/admin/reviews')}
                className="text-xs text-[#006765] font-semibold hover:underline"
              >
                View All ({reviews.length})
              </button>
            </div>

            <div className="space-y-3">
              {reviews.slice(0, 3).map((r) => {
                const isPending = r.status === 'pending';
                const rId = r.id || r._id;
                return (
                  <div
                    key={rId}
                    className={`p-3 rounded-xl border space-y-2 ${
                      isPending ? 'bg-amber-50/60 border-amber-200' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#151C27]">
                        {r.userName} • ★ {r.rating}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isPending ? 'text-amber-800 bg-amber-100' : 'text-emerald-700 bg-emerald-50'
                        }`}
                      >
                        {isPending ? 'Pending Moderation' : 'Approved'}
                      </span>
                    </div>
                    <p className="text-xs text-[#555E74] leading-relaxed">
                      "{r.content}"
                    </p>
                    {isPending && (
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => handleRejectReview(rId)}
                          className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded text-[11px] font-semibold text-red-600 hover:bg-red-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveReview(rId)}
                          className="px-2.5 py-1 bg-[#006765] text-white rounded text-[11px] font-semibold hover:bg-[#005553]"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Registered Explorers */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Recent Registered Explorers
            </h4>
            <div className="space-y-2 text-xs divide-y divide-[#F1F5F9]">
              {users.slice(0, 4).map((u) => (
                <div key={u.id || u._id} className="pt-2 first:pt-0 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#151C27] block">{u.name}</span>
                    <span className="text-[10px] text-[#555E74]">{u.email}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded capitalize ${
                      u.status === 'suspended' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {u.status || 'active'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

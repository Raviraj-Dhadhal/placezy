import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
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
  XCircle
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    { title: 'Total Users', value: '24,850', change: '+12% this month', icon: <Users size={18} className="text-[#006765]" /> },
    { title: 'Total Businesses', value: '1,420', change: '+8% new in Rajkot', icon: <Building2 size={18} className="text-blue-600" /> },
    { title: 'Total Places', value: '3,890', change: 'Verified catalogue', icon: <MapPin size={18} className="text-purple-600" /> },
    { title: 'Total Reviews', value: '48,210', change: '4.8 avg platform score', icon: <MessageSquareCheck size={18} className="text-emerald-600" /> },
    { title: 'Pending Moderation', value: '18', change: 'Requires Action', alert: true, icon: <AlertCircle size={18} className="text-amber-500" /> },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header matching Screen 01 Module 03 */}
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
            Manage and monitor the entire Placezy platform, ratings, and business verification from one unified console.
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
            + Add New Place / Category
          </Button>
        </div>
      </div>

      {/* 5 KPI Metric Cards matching Screen 01 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        {metrics.map((m) => (
          <div key={m.title} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#555E74]">{m.title}</span>
              <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                {m.icon}
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold font-serif text-[#151C27] block">{m.value}</span>
              <span className={`text-[10px] font-semibold ${m.alert ? 'text-amber-600' : 'text-emerald-700'}`}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Grid: Territory Activity Chart Left, Moderation Stream Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Platform Activity Line Chart + Recent Registrations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Activity Line Chart Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Platform Activity</h3>
                <span className="text-[10px] text-[#555E74]">User registrations, business listings, and reviews over time in Rajkot</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {['Last 7 Days', 'Last 30 Days', 'Last 3 Months'].map((t, idx) => (
                  <button
                    key={t}
                    className={`px-3 py-1 rounded-lg font-medium ${
                      idx === 1 ? 'bg-[#006765] text-white' : 'text-[#555E74] hover:bg-[#F0F3FF]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-series Activity Chart */}
            <div className="h-60 w-full relative flex items-end pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                <path d="M 0 130 Q 120 70, 250 85 T 500 30" stroke="#006765" strokeWidth="3" fill="none" />
                <path d="M 0 150 Q 120 110, 250 120 T 500 70" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                <path d="M 0 155 Q 120 140, 250 145 T 500 110" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F1F5F9] text-center text-xs">
              <div>
                <span className="text-[10px] text-[#555E74] block">New Businesses</span>
                <span className="font-bold text-[#006765]">+142</span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E74] block">New Users</span>
                <span className="font-bold text-blue-600">+1,240</span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E74] block">Verified Reviews</span>
                <span className="font-bold text-emerald-700">+3,180</span>
              </div>
            </div>
          </div>

          {/* Recent Business Registrations */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="text-sm font-bold text-[#151C27]">Recent Business Registrations</h3>
              <button
                onClick={() => navigate('/admin/businesses')}
                className="text-xs text-[#006765] font-semibold hover:underline"
              >
                View All Businesses →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                    <th className="pb-2">Business Name</th>
                    <th className="pb-2">Owner</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  <tr>
                    <td className="py-2.5 font-bold text-[#151C27]">The Grand Heritage Cafe</td>
                    <td className="py-2.5 text-[#555E74]">Rajesh Mehta</td>
                    <td className="py-2.5 text-[#555E74]">Cafe & Restaurant</td>
                    <td className="py-2.5 text-[#555E74]">Kalawad Road, Rajkot</td>
                    <td className="py-2.5">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Approved
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#151C27]">Saurashtra Spice Kitchen</td>
                    <td className="py-2.5 text-[#555E74]">Harish Patel</td>
                    <td className="py-2.5 text-[#555E74]">Fine Dining</td>
                    <td className="py-2.5 text-[#555E74]">Yagnik Road, Rajkot</td>
                    <td className="py-2.5">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        Pending Review
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Pending Review Moderation + Realtime Activity */}
        <div className="lg:col-span-4 space-y-4">
          {/* Moderation Alert Card matching Screen 01 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Recent Reviews
              </h3>
              <button
                onClick={() => navigate('/admin/reviews')}
                className="text-xs text-[#006765] font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#151C27]">The Grand Heritage Cafe</span>
                  <span className="text-[10px] font-bold text-emerald-700">Published</span>
                </div>
                <p className="text-xs text-[#555E74]">
                  "Best cold brew and peaceful conservatory in Rajkot. Perfect place for weekend remote work."
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Pradhyuman Zoological Park</span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                    Flagged for Moderation
                  </span>
                </div>
                <p className="text-xs text-amber-900">
                  "Needs better weekend crowd management and additional drinking water facilities near safari gates."
                </p>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded text-[11px] font-semibold text-[#555E74] hover:bg-[#F0F3FF]">
                    Dismiss
                  </button>
                  <button className="px-2.5 py-1 bg-[#006765] text-white rounded text-[11px] font-semibold hover:bg-[#005553]">
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time User Activity */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Recent User Activity
            </h4>
            <div className="space-y-2 text-xs divide-y divide-[#F1F5F9]">
              <div className="pt-2 first:pt-0">
                <span className="font-semibold text-[#151C27] block">Kavita Joshi bookmarked 3 places</span>
                <span className="text-[10px] text-[#555E74]">Kalawad Road, Rajkot • 15m ago</span>
              </div>
              <div className="pt-2">
                <span className="font-semibold text-[#151C27] block">Mehul Trivedi registered as a new explorer</span>
                <span className="text-[10px] text-[#555E74]">Rajkot Hub • 42m ago</span>
              </div>
              <div className="pt-2">
                <span className="font-semibold text-[#151C27] block">Bhavin E. submitted verified photo</span>
                <span className="text-[10px] text-[#555E74]">Race Course Ground • 1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import {
  Store,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ShieldCheck,
  CheckCircle,
  Clock
} from 'lucide-react';

export const OwnerListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All (4)');
  const [searchQuery, setSearchQuery] = useState('');

  const listings = [
    {
      id: 'l1',
      name: 'Rajkot Cafe & Bakery',
      category: 'Café',
      location: 'Yagnik Road, Rajkot',
      status: 'Active',
      rating: 4.5,
      reviews: 128,
      views: 1240,
      lastUpdated: 'Oct 26, 2026',
      image: '/images/places/grand-courtyard.jpg',
    },
    {
      id: 'l2',
      name: 'Kathiyawadi Thali Bhavan',
      category: 'Restaurants',
      location: 'Kalawad Road, Rajkot',
      status: 'Active',
      rating: 4.8,
      reviews: 112,
      views: 1890,
      lastUpdated: 'Oct 22, 2026',
      image: '/images/places/kathiyawadi-rasoi.jpg',
    },
    {
      id: 'l3',
      name: 'Heritage Handicrafts & Textiles',
      category: 'Shopping',
      location: 'Dharmendra Road, Rajkot',
      status: 'Active',
      rating: 4.6,
      reviews: 44,
      views: 710,
      lastUpdated: 'Oct 18, 2026',
      image: '/images/places/watson-museum.jpg',
    },
    {
      id: 'l4',
      name: 'Saurashtra Spice Bistro',
      category: 'Fine Dining',
      location: '150 Feet Ring Road, Rajkot',
      status: 'Pending Verification',
      rating: 0,
      reviews: 0,
      views: 45,
      lastUpdated: 'Just now',
      image: '/images/places/secret-garden.jpg',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Header matching Screen 03 Module 02 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">My Listings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            My Business Listings
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Manage and update your business listings across Rajkot, Gujarat.
          </p>
        </div>

        <Button
          size="md"
          icon={<Plus size={16} />}
          onClick={() => navigate('/owner/register')}
        >
          + Add New Listing
        </Button>
      </div>

      {/* Top 4 KPI metric cards matching Screen 03 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74] font-medium">Total Listings</span>
          <span className="text-2xl font-bold text-[#151C27] block mt-1">4</span>
          <span className="text-[10px] text-[#006765] font-semibold">3 Active • 1 Pending</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74] font-medium">Total Views</span>
          <span className="text-2xl font-bold text-[#151C27] block mt-1">3,840</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 14% this month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74] font-medium">Total Reviews</span>
          <span className="text-2xl font-bold text-[#151C27] block mt-1">284</span>
          <span className="text-[10px] text-amber-600 font-semibold">★ 4.6 Average score</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74] font-medium">Merchant Status</span>
          <span className="text-xs font-bold text-[#151C27] flex items-center gap-1.5 mt-2">
            <ShieldCheck size={16} className="text-[#006765]" />
            <span>Verified Merchant</span>
          </span>
          <span className="text-[10px] text-[#555E74] block mt-0.5">Rajkot Municipal Area</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar matching Screen 03 */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5">
            {['All (4)', 'Active (3)', 'Pending (1)', 'Rejected (0)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab
                    ? 'bg-[#006765] text-white'
                    : 'text-[#555E74] hover:bg-[#F0F3FF]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={14} />}
            />
          </div>
        </div>

        {/* Listings Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-2">Business Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Reviews</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Last Updated</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {listings.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <span className="font-bold text-[#151C27] block">{item.name}</span>
                        <span className="text-[10px] text-[#555E74]">{item.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-[#555E74]">{item.category}</td>
                  <td className="py-3.5 text-[#555E74]">{item.location}</td>
                  <td className="py-3.5">
                    {item.status === 'Active' ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        • Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        • Pending Verification
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 font-bold text-[#151C27]">
                    {item.rating > 0 ? `★ ${item.rating}` : 'New'}
                  </td>
                  <td className="py-3.5 text-[#555E74]">{item.reviews}</td>
                  <td className="py-3.5 font-medium text-[#151C27]">{item.views}</td>
                  <td className="py-3.5 text-[#555E74]">{item.lastUpdated}</td>
                  <td className="py-3.5 pr-2 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-[#555E74]">
                      <button className="p-1.5 hover:text-[#006765] hover:bg-[#F0F3FF] rounded">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 hover:text-[#006765] hover:bg-[#F0F3FF] rounded">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

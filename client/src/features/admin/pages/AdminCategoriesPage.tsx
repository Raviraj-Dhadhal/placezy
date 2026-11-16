import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { placesApi } from '../../places/services/placesService';
import { adminApi } from '../services/adminService';
import {
  FolderTree,
  Plus,
  Search,
  Check,
  Edit,
  Power,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([placesApi.getCategories(), adminApi.getBusinesses()])
      .then(([cats, biz]) => {
        setCategories(cats || []);
        setPlaces(biz || []);
        if (cats && cats.length > 0) {
          setSelectedCategory(cats[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalCategories = categories.length;
  const totalPlaces = places.length;
  const verifiedPlaces = places.filter((p) => p.isVerified).length;

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const placesInSelectedCategory = selectedCategory
    ? places.filter((p) => p.category?.toLowerCase() === selectedCategory.name?.toLowerCase())
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Categories
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Organize and manage place categories and sub-taxonomies across Rajkot and Gujarat.
          </p>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Categories</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{totalCategories}</span>
          <span className="text-[10px] text-emerald-700 font-semibold">MongoDB taxonomies</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Categories</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{totalCategories}</span>
          <span className="text-[10px] text-[#006765] font-semibold">100% in public discovery</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Places</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{totalPlaces}</span>
          <span className="text-[10px] text-[#006765] font-semibold">{verifiedPlaces} Verified venues</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Primary District</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">Rajkot</span>
          <span className="text-[10px] text-[#006765] font-semibold">Gujarat Territory</span>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search categories..."
                icon={<Search size={14} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="text-xs text-[#555E74]">
              Showing {filteredCategories.length} categories
            </span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-12 text-center text-xs text-[#555E74]">Loading categories...</div>
            ) : filteredCategories.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#555E74]">No categories found.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                    <th className="pb-2.5 pl-2">Category Name</th>
                    <th className="pb-2.5">Slug</th>
                    <th className="pb-2.5">Listed Venues</th>
                    <th className="pb-2.5 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredCategories.map((c) => {
                    const venueCount = places.filter(
                      (p) => p.category?.toLowerCase() === c.name.toLowerCase()
                    ).length;
                    const isSelected = selectedCategory && selectedCategory.id === c.id;

                    return (
                      <tr
                        key={c.id || c.slug}
                        onClick={() => setSelectedCategory(c)}
                        className={`hover:bg-[#F0F3FF] cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F0F3FF]/70' : ''
                        }`}
                      >
                        <td className="py-3 pl-2 font-bold text-[#151C27] flex items-center gap-2">
                          <FolderTree size={15} className="text-[#006765]" />
                          <span>{c.name}</span>
                        </td>
                        <td className="py-3 text-[#555E74]">/{c.slug}</td>
                        <td className="py-3 font-semibold text-[#151C27]">{venueCount} places</td>
                        <td className="py-3 pr-2 text-right">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Selected Category Details (4 Cols) */}
        {selectedCategory && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Category Insights
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live in Search
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-[#151C27]">{selectedCategory.name}</h3>
              <p className="text-xs text-[#555E74]">Public Route: /explore?category={selectedCategory.slug}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <h4 className="text-xs font-bold text-[#151C27]">
                Venues in this Category ({placesInSelectedCategory.length})
              </h4>
              {placesInSelectedCategory.length === 0 ? (
                <p className="text-xs text-[#555E74]">No places registered under this category yet.</p>
              ) : (
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {placesInSelectedCategory.map((p) => (
                    <div
                      key={p.id || p._id}
                      className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs flex items-center justify-between"
                    >
                      <span className="font-medium text-[#151C27] truncate max-w-[170px]">{p.name}</span>
                      <span className="text-[10px] text-amber-600 font-bold shrink-0">★ {p.rating}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

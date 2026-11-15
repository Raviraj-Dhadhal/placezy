import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
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
  const [selectedCategory, setSelectedCategory] = useState<any | null>({
    name: 'Restaurants',
    subCategories: ['Kathiyawadi Thali (210)', 'Gujarati Snacks (185)', 'Cafe & Fast Food (160)', 'Multi-Cuisine (145)', 'Sweets & Farsan (142)'],
    topPlaces: ['Kathiyawadi Thali Bhavan (4.8 ★)', 'Rajkot Cafe & Bakery (4.6 ★)', 'Girnar Spice Garden (4.7 ★)'],
    placesCount: 842,
    verifiedCount: 620,
    matchRelevance: '94.2%',
  });

  const categories = [
    { name: 'Restaurants', description: 'Fine dining, authentic Kathiyawadi cuisine, family restaurants', count: 842 },
    { name: 'Cafés', description: 'Specialty coffee houses, bakeries, tea stalls, and quiet workspaces', count: 415 },
    { name: 'Shopping', description: 'Local Saurashtra bazaars, textile markets, shopping complexes', count: 620 },
    { name: 'Parks & Nature', description: 'Public urban parks, botanical gardens, lakes, and picnic reserves', count: 185 },
    { name: 'Attractions', description: 'Historical monuments, heritage sites, museums, and palaces', count: 290 },
    { name: 'Entertainment', description: 'Cinema multiplexes, gaming zones, and theaters', count: 120 },
    { name: 'Religious Places', description: 'Historic temples, ashrams, deris, and spiritual centers', count: 345 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Screen 04 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Categories
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Create, organize, and manage place categories and sub-taxonomies across Rajkot and Gujarat.
          </p>
        </div>

        <Button size="sm" icon={<Plus size={14} />}>
          + Add Category
        </Button>
      </div>

      {/* 4 KPI Metric Cards matching Screen 04 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Categories</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">48</span>
          <span className="text-[10px] text-emerald-700 font-semibold">+4 new this quarter</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Categories</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">42</span>
          <span className="text-[10px] text-[#006765] font-semibold">87.5% in public discovery</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Inactive Categories</span>
          <span className="text-2xl font-bold font-serif text-[#555E74] block mt-1">6</span>
          <span className="text-[10px] text-[#555E74]">Under curation review</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Places</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">3,420</span>
          <span className="text-[10px] text-[#006765] font-semibold">Across all Gujarat districts</span>
        </div>
      </div>

      {/* Split Grid: Category Taxonomy Table Left, Category Inspection Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input placeholder="Search categories..." icon={<Search size={14} />} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {['All (48)', 'Active (42)', 'Inactive (6)'].map((t, idx) => (
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
                  <th className="pb-2.5 pl-2">Category Name</th>
                  <th className="pb-2.5">Description</th>
                  <th className="pb-2.5 pr-2 text-right">Places</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {categories.map((c) => (
                  <tr
                    key={c.name}
                    onClick={() => setSelectedCategory(c)}
                    className="hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                  >
                    <td className="py-3 pl-2 font-bold text-[#151C27]">{c.name}</td>
                    <td className="py-3 text-[#555E74] line-clamp-1">{c.description}</td>
                    <td className="py-3 pr-2 text-right font-bold text-[#006765]">{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Category Inspector Drawer (4 Cols) matching Screen 04 */}
        {selectedCategory && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#151C27]">{selectedCategory.name}</h3>
                <span className="text-[10px] text-[#555E74]">Primary Food & Dining Taxonomy</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                • Active
              </span>
            </div>

            {/* Sub-categories breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
                Sub-Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Kathiyawadi Thali (210)',
                  'Gujarati Snacks (185)',
                  'Cafe & Fast Food (160)',
                  'Multi-Cuisine (145)',
                  'Sweets & Farsan (142)'
                ].map((sub) => (
                  <span
                    key={sub}
                    className="text-[10px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-1 rounded-lg text-[#151C27]"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Recommended Places */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
                Top Places in Category
              </span>
              <div className="space-y-1.5 text-xs text-[#555E74]">
                <div className="flex justify-between">
                  <span>Kathiyawadi Thali Bhavan</span>
                  <span className="font-bold text-[#151C27]">4.8 ★ (1.2k)</span>
                </div>
                <div className="flex justify-between">
                  <span>Rajkot Cafe & Bakery</span>
                  <span className="font-bold text-[#151C27]">4.6 ★ (850)</span>
                </div>
                <div className="flex justify-between">
                  <span>Girnar Spice Garden</span>
                  <span className="font-bold text-[#151C27]">4.7 ★ (640)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
              <Button size="sm" variant="outline">
                Edit Category
              </Button>
              <Button size="sm" variant="danger">
                Deactivate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

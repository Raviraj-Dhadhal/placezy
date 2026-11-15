import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PLACES } from '../../../utils/mockData';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Check, RotateCcw, ArrowRight } from 'lucide-react';

export const UserExploreFilterPage: React.FC = () => {
  const navigate = useNavigate();

  // Filter state
  const [locationType, setLocationType] = useState<'rajkot' | 'all'>('rajkot');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Cafés',
    'Attractions',
  ]);
  const [selectedPrice, setSelectedPrice] = useState('₹₹');
  const [selectedDistance, setSelectedDistance] = useState('15 km');
  const [minRating, setMinRating] = useState('4.5+');
  const [openNow, setOpenNow] = useState(true);
  const [openToday, setOpenToday] = useState(false);

  const categories = [
    'Restaurants',
    'Cafés',
    'Shopping',
    'Parks & Nature',
    'Attractions',
    'Entertainment',
    'Religious Places',
  ];

  const priceTiers = [
    { label: '₹', title: 'Budget' },
    { label: '₹₹', title: 'Moderate' },
    { label: '₹₹₹', title: 'Premium' },
  ];

  const distanceSteps = ['5 km', '15 km', '25 km', '50 km', '100+ km (All Gujarat)'];
  const ratingSteps = ['4.5+ ★', '4.0+ ★', '3.5+ ★', '3.0+ ★'];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleReset = () => {
    setLocationType('rajkot');
    setSelectedCategories(['Cafés']);
    setSelectedPrice('₹₹');
    setSelectedDistance('15 km');
    setMinRating('4.5+');
    setOpenNow(true);
  };

  // Preview places matching
  const matchingPlaces = MOCK_PLACES.slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-[#555E74]">
        <button
          onClick={() => navigate('/explore')}
          className="flex items-center gap-1.5 hover:text-[#151C27] font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <span>Explore</span>
          <span>/</span>
          <span>Gujarat</span>
          <span>/</span>
          <span>Rajkot City Hub</span>
          <span>/</span>
          <span className="font-semibold text-[#151C27]">Filters</span>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#151C27]">
            Filter Places in Gujarat
          </h1>
          <p className="text-xs text-[#555E74] mt-1">
            Refine your search to find the exact place for your mood and occasion.
          </p>
        </div>
        <span className="text-xs font-semibold bg-[#CFE7E6]/50 text-[#006765] px-3 py-1 rounded-full border border-[#006765]/20 self-start sm:self-auto">
          Refining 5 Active Parameters
        </span>
      </div>

      {/* Split Grid matching Screen 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Filter Controls */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
          {/* 1. Location Scope */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
              Location
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setLocationType('rajkot')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  locationType === 'rajkot'
                    ? 'border-[#006765] bg-[#CFE7E6]/30'
                    : 'border-[#E2E8F0] hover:bg-[#F0F3FF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#151C27]">Rajkot, Gujarat</h4>
                  {locationType === 'rajkot' && <Check size={14} className="text-[#006765]" />}
                </div>
                <span className="text-[10px] text-[#555E74] mt-0.5 block">Within 25 km of Rajkot center</span>
              </div>

              <div
                onClick={() => setLocationType('all')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  locationType === 'all'
                    ? 'border-[#006765] bg-[#CFE7E6]/30'
                    : 'border-[#E2E8F0] hover:bg-[#F0F3FF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#151C27]">Explore all Gujarat</h4>
                  {locationType === 'all' && <Check size={14} className="text-[#006765]" />}
                </div>
                <span className="text-[10px] text-[#555E74] mt-0.5 block">Ahmedabad, Surat, Vadodara, etc.</span>
              </div>
            </div>
          </div>

          {/* 2. Category Multi-select */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Category
              </label>
              <span className="text-[11px] text-[#555E74]">Multi-select enabled</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`
                      px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border
                      ${
                        isSelected
                          ? 'bg-[#006765] text-white border-[#006765]'
                          : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#CFE7E6]/20 hover:text-[#151C27]'
                      }
                    `}
                  >
                    {isSelected && <Check size={12} />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Price Range */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <label className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
              Price Range
            </label>
            <div className="grid grid-cols-3 gap-3">
              {priceTiers.map((tier) => (
                <button
                  key={tier.label}
                  type="button"
                  onClick={() => setSelectedPrice(tier.label)}
                  className={`
                    p-3 rounded-xl border text-center transition-all
                    ${
                      selectedPrice === tier.label
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
                    }
                  `}
                >
                  <span className="text-base font-bold block">{tier.label}</span>
                  <span className="text-[10px] mt-0.5 block">{tier.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Distance */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Distance
              </label>
              <span className="text-xs font-semibold text-[#006765]">Within {selectedDistance}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {distanceSteps.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDistance(d)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                    ${
                      selectedDistance === d
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Minimum Rating */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <label className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
              Minimum Rating
            </label>
            <div className="flex flex-wrap gap-2">
              {ratingSteps.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`
                    px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border
                    ${
                      minRating === r
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
                    }
                  `}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Opening Hours */}
          <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
            <label className="text-xs font-bold text-[#151C27] uppercase tracking-wider block">
              Opening Hours
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-[#151C27] cursor-pointer">
                <input
                  type="checkbox"
                  checked={openNow}
                  onChange={(e) => setOpenNow(e.target.checked)}
                  className="rounded text-[#006765] focus:ring-[#006765]"
                />
                <span>Open Now (Available right now)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#151C27] cursor-pointer">
                <input
                  type="checkbox"
                  checked={openToday}
                  onChange={(e) => setOpenToday(e.target.checked)}
                  className="rounded text-[#006765] focus:ring-[#006765]"
                />
                <span>Open Today (Operating later today)</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9]">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-[#555E74] hover:text-[#151C27] font-semibold"
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>

            <Button
              size="md"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              onClick={() => navigate('/explore')}
            >
              Apply Filters (18 Places Matching)
            </Button>
          </div>
        </div>

        {/* Right Column: Live Matching Preview matching Screen 10 */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-sm font-bold text-[#151C27]">Live Matching Preview</h3>
              </div>
              <span className="text-xs font-bold text-[#006765]">18 Places</span>
            </div>
            <p className="text-[11px] text-[#555E74]">
              18 curated places match in Rajkot & nearby
            </p>

            <div className="space-y-3">
              {matchingPlaces.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/place/${p.id}`)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                >
                  <img
                    src={p.coverImage}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-[#006765] uppercase block">
                      {p.subCategory}
                    </span>
                    <h4 className="text-xs font-bold text-[#151C27] truncate">{p.name}</h4>
                    <span className="text-[10px] text-[#555E74] block">{p.location}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{p.openingStatus}</span>
                  </div>
                  <span className="text-xs font-bold text-[#151C27]">★ {p.rating}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center">
              <span className="text-[11px] text-[#555E74]">
                ⚡ Filter adjustments update results instantly in your exploration feed.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

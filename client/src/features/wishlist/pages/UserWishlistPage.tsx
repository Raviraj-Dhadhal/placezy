import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PLACES } from '../../../utils/mockData';
import { PlaceCard } from '../../places/components/PlaceCard';
import { Button } from '../../../components/ui/Button';
import { Heart, Compass, ArrowRight } from 'lucide-react';

export const UserWishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { label: 'All', count: 6 },
    { label: 'Restaurants', count: 2 },
    { label: 'Cafés', count: 2 },
    { label: 'Attractions', count: 1 },
    { label: 'Shopping', count: 0 },
    { label: 'Nature', count: 1 },
  ];

  // Wishlisted items
  const wishlistedPlaces = MOCK_PLACES.filter((p) => {
    if (activeTab === 'All') return p.isWishlisted;
    if (activeTab === 'Restaurants') return p.category === 'Restaurants' && p.isWishlisted;
    if (activeTab === 'Cafés') return p.category === 'Cafés' && p.isWishlisted;
    if (activeTab === 'Attractions') return p.category === 'Attractions' && p.isWishlisted;
    if (activeTab === 'Nature') return p.category === 'Nature & Parks' && p.isWishlisted;
    return false;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header matching Screen 13 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
              My Wishlist
            </h1>
            <span className="text-xs font-semibold bg-[#CFE7E6]/50 text-[#006765] px-2.5 py-0.5 rounded-full border border-[#006765]/20">
              6 Saved Places in Rajkot
            </span>
          </div>
          <p className="text-xs text-[#555E74] mt-1">
            Save places you want to visit later. Curated specifically for your urban expeditions across Rajkot.
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs text-[#555E74] self-start sm:self-auto">
          <span>Sort by:</span>
          <select className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 font-semibold text-[#151C27] outline-none">
            <option>Recently Added</option>
            <option>Highest Rated</option>
            <option>Nearest to Me</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E2E8F0]">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === tab.label
                ? 'border-[#006765] text-[#006765] bg-[#F0F3FF]'
                : 'border-transparent text-[#555E74] hover:text-[#151C27]'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] bg-slate-100 text-[#555E74] px-1.5 py-0.2 rounded-full font-bold">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 6-Card Saved Grid matching Screen 13 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlistedPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {/* Bottom Discovery Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center shrink-0">
            <Compass size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#151C27]">
              Looking for new hidden gems in Rajkot?
            </h4>
            <p className="text-xs text-[#555E74] mt-0.5">
              Discover verified spots across Yagnik Road, Race Course, and Heritage Old City. Save places you love anytime by tapping the heart icon.
            </p>
          </div>
        </div>

        <Button
          size="md"
          icon={<ArrowRight size={15} />}
          iconPosition="right"
          onClick={() => navigate('/explore')}
        >
          Explore Places
        </Button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PLACES } from '../../../utils/mockData';
import { PlaceCard } from '../../places/components/PlaceCard';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Utensils,
  Coffee,
  ShoppingBag,
  Trees,
  Compass,
  Tv,
  Landmark
} from 'lucide-react';

export const UserExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Cafés');
  const [sortBy, setSortBy] = useState('Recommended');
  const [distanceFilter, setDistanceFilter] = useState('Any Distance');

  const categories = [
    { label: 'Restaurants', icon: <Utensils size={15} /> },
    { label: 'Cafés', icon: <Coffee size={15} /> },
    { label: 'Shopping', icon: <ShoppingBag size={15} /> },
    { label: 'Parks & Nature', icon: <Trees size={15} /> },
    { label: 'Attractions', icon: <Compass size={15} /> },
    { label: 'Entertainment', icon: <Tv size={15} /> },
    { label: 'Religious', icon: <Landmark size={15} /> },
  ];

  const filteredPlaces = MOCK_PLACES.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Territory Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#555E74] gap-2">
        <div className="flex items-center gap-2">
          <span>Explore</span>
          <span>/</span>
          <span>Gujarat</span>
          <span>/</span>
          <span className="font-semibold text-[#151C27]">Rajkot City Hub</span>
        </div>
      </div>

      {/* Explore Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          Explore Places in Gujarat
        </h1>
        <p className="text-xs text-[#555E74] mt-1">
          Find places that match your interests, curated specifically for discerning city explorers.
        </p>
      </div>

      {/* Main Search & Filter Control Bar matching Screen 07 */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search input */}
        <div className="flex-1 w-full">
          <Input
            placeholder="Search places, cafés, heritage spots in Rajkot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
            className="border-none bg-[#F8FAFC]"
          />
        </div>

        {/* Territory Dropdown */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-button text-xs font-semibold text-[#151C27] cursor-pointer shrink-0">
          <MapPin size={14} className="text-[#006765]" />
          <span>Rajkot, Gujarat</span>
          <ChevronDown size={14} className="text-[#555E74]" />
        </div>

        {/* Filter Drawer Trigger */}
        <button
          onClick={() => navigate('/explore/filter')}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F0F3FF] rounded-button text-xs font-medium text-[#555E74] shrink-0"
        >
          <SlidersHorizontal size={14} />
          <span>Filters (0 Applied)</span>
        </button>

        {/* Search Button */}
        <Button size="md" icon={<Search size={15} />}>
          Search Places
        </Button>
      </div>

      {/* Popular Categories Carousel */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
            Popular Categories
          </h3>
          <span className="text-xs text-[#006765] font-semibold cursor-pointer hover:underline">
            View All Types
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border
                  ${
                    isSelected
                      ? 'bg-[#006765] text-white border-[#006765] shadow-sm'
                      : 'bg-white text-[#555E74] border-[#E2E8F0] hover:border-[#006765]/30 hover:bg-[#CFE7E6]/20 hover:text-[#151C27]'
                  }
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Header & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base font-bold text-[#151C27]">Places in Gujarat</h2>
          <p className="text-xs text-[#555E74] mt-0.5">
            Showing {filteredPlaces.length} places matching your vibe in Rajkot & Gujarat
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#151C27] outline-none"
            >
              <option value="Recommended">Recommended</option>
              <option value="Rating">Highest Rated</option>
              <option value="Distance">Nearest First</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
            <span>Distance:</span>
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#151C27] outline-none"
            >
              <option value="Any Distance">Any Distance</option>
              <option value="Within 5km">Within 5 km</option>
              <option value="Within 15km">Within 15 km</option>
            </select>
          </div>

          <button
            onClick={() => navigate('/explore/filter')}
            className="flex items-center gap-1.5 bg-[#006765] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#005553]"
          >
            <SlidersHorizontal size={12} />
            <span>Filter Places</span>
          </button>
        </div>
      </div>

      {/* 8-Card Grid matching Screen 07 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {/* Bottom Discover More Accordion Button */}
      <div className="text-center pt-4">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] hover:bg-[#F0F3FF] rounded-xl text-xs font-semibold text-[#151C27] shadow-sm">
          <span>Discover More Gujarat Landmarks</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { placesApi } from '../services/placesService';
import type { Place } from '../../../types';
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
  Landmark,
  X,
} from 'lucide-react';

export const UserExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search query state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Selected category (defaults to 'All' or from query param)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  
  // Sort and Distance filter states
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'Recommended');
  const [distanceFilter, setDistanceFilter] = useState<string>(
    searchParams.get('distance') || 'Any Distance'
  );

  // Quick Price and Rating filter toggles
  const [selectedPrice, setSelectedPrice] = useState<string>(searchParams.get('price') || 'All');
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get('rating')) || 0);

  // Dynamic MongoDB Places State
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    placesApi
      .getAll()
      .then((data) => {
        if (isMounted) {
          setPlaces(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load places:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { label: 'All', icon: <Compass size={15} /> },
    { label: 'Cafés', icon: <Coffee size={15} /> },
    { label: 'Restaurants', icon: <Utensils size={15} /> },
    { label: 'Shopping', icon: <ShoppingBag size={15} /> },
    { label: 'Nature & Parks', icon: <Trees size={15} /> },
    { label: 'Attractions', icon: <Compass size={15} /> },
    { label: 'Entertainment', icon: <Tv size={15} /> },
    { label: 'Religious Places', icon: <Landmark size={15} /> },
  ];

  // Active filters count calculation
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (distanceFilter !== 'Any Distance') count++;
    if (selectedPrice !== 'All') count++;
    if (minRating > 0) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [selectedCategory, distanceFilter, selectedPrice, minRating, searchQuery]);

  // Filter and Sort Engine
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      // 1. Text Search Filter (name, subcategory, location, cuisines)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesLoc = (p.address || p.city || '').toLowerCase().includes(q);
        const matchesSub = p.subCategory?.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesSub && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory && selectedCategory !== 'All') {
        const catMap: Record<string, string> = {
          'Parks & Nature': 'Nature & Parks',
          'Religious': 'Religious Places',
          'Culture & Heritage': 'Culture',
          'Cafes': 'Cafés',
        };
        const targetCategory = (catMap[selectedCategory] || selectedCategory).toLowerCase();
        const placeCategory = (p.category || '').toLowerCase();
        if (!placeCategory.includes(targetCategory) && !targetCategory.includes(placeCategory)) {
          return false;
        }
      }

      // 3. Distance Filter
      if (distanceFilter === 'Within 5km' && p.distanceKm !== undefined && (p.distanceKm || 0) > 5) {
        return false;
      }
      if (distanceFilter === 'Within 15km' && p.distanceKm !== undefined && (p.distanceKm || 0) > 15) {
        return false;
      }
      if (distanceFilter === 'Within 25km' && p.distanceKm !== undefined && (p.distanceKm || 0) > 25) {
        return false;
      }

      // 4. Price Tier Filter
      if (selectedPrice && selectedPrice !== 'All' && p.priceLevel !== selectedPrice) {
        return false;
      }

      // 5. Rating Filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'Distance') {
        return (a.distanceKm || 0) - (b.distanceKm || 0);
      }
      // 'Recommended' default sort (match percentage or popularity)
      return (b.matchPercentage || 90) - (a.matchPercentage || 90);
    });
  }, [places, searchQuery, selectedCategory, distanceFilter, selectedPrice, minRating, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('Recommended');
    setDistanceFilter('Any Distance');
    setSelectedPrice('All');
    setMinRating(0);
    setSearchParams({});
  };

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
        <div className="flex-1 w-full relative">
          <Input
            placeholder="Search places, cafés, heritage spots in Rajkot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
            className="border-none bg-[#F8FAFC]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={15} />
            </button>
          )}
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
          className={`flex items-center gap-2 px-3.5 py-2 border rounded-button text-xs font-medium shrink-0 transition-colors ${
            activeFiltersCount > 0
              ? 'bg-[#CFE7E6]/40 border-[#006765] text-[#006765] font-semibold'
              : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-[#F0F3FF] text-[#555E74]'
          }`}
        >
          <SlidersHorizontal size={14} />
          <span>Filters ({activeFiltersCount} Applied)</span>
        </button>

        {/* Reset / Search Actions */}
        {activeFiltersCount > 0 ? (
          <Button
            size="md"
            variant="outline"
            onClick={handleResetFilters}
            className="text-xs shrink-0"
          >
            Clear Filters
          </Button>
        ) : (
          <Button size="md" icon={<Search size={15} />} className="shrink-0">
            Search Places
          </Button>
        )}
      </div>

      {/* Popular Categories Carousel */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
            Popular Categories
          </h3>
          <span
            onClick={() => setSelectedCategory('All')}
            className="text-xs text-[#006765] font-semibold cursor-pointer hover:underline"
          >
            View All ({places.length})
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                      ? 'bg-[#006765] text-white border-[#006765] shadow-sm font-semibold'
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
          <h2 className="text-base font-bold text-[#151C27]">
            {selectedCategory === 'All' ? 'Places in Gujarat' : `${selectedCategory} in Gujarat`}
          </h2>
          <p className="text-xs text-[#555E74] mt-0.5">
            Showing {filteredPlaces.length} places matching your vibe in Rajkot & Gujarat
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Price Filter */}
          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-lg p-0.5 text-xs">
            {['All', '₹', '₹₹', '₹₹₹', 'Free Entry'].map((price) => (
              <button
                key={price}
                onClick={() => setSelectedPrice(price)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  selectedPrice === price
                    ? 'bg-[#006765] text-white'
                    : 'text-[#555E74] hover:text-[#151C27]'
                }`}
              >
                {price}
              </button>
            ))}
          </div>

          {/* Quick Rating Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
            <span>Rating:</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-xs font-semibold text-[#151C27] outline-none"
            >
              <option value={0}>Any Rating</option>
              <option value={4.8}>4.8+ ★</option>
              <option value={4.5}>4.5+ ★</option>
              <option value={4.0}>4.0+ ★</option>
            </select>
          </div>

          {/* Distance Filter */}
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
              <option value="Within 25km">Within 25 km</option>
            </select>
          </div>

          {/* Sort By */}
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
        </div>
      </div>

      {/* Filtered Place Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#006765] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <span className="text-xs text-[#555E74] font-medium block">
            Discovering curated places across Gujarat...
          </span>
        </div>
      ) : filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id || (place as any)._id} place={place} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search size={22} />
          </div>
          <h3 className="font-bold text-base text-[#151C27]">No venues found</h3>
          <p className="text-xs text-[#555E74] max-w-md mx-auto">
            We couldn't find any places matching your current search and filter combination in Rajkot.
          </p>
          <Button size="sm" variant="outline" onClick={handleResetFilters} className="mt-2">
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Bottom Discover More Action */}
      {filteredPlaces.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setSelectedCategory('All')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] hover:bg-[#F0F3FF] rounded-xl text-xs font-semibold text-[#151C27] shadow-sm transition-all"
          >
            <span>Showing All {filteredPlaces.length} Curated Venues</span>
            <ChevronDown size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

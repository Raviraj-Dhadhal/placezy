import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { placesApi } from '../services/placesService';
import type { Place } from '../../../types';
import {
  MapPin,
  Star,
  ExternalLink,
  Navigation,
  Compass,
  Search
} from 'lucide-react';

export const UserMapViewPage: React.FC = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    placesApi.getAll().then((data) => {
      setPlaces(data || []);
      if (data && data.length > 0) {
        setSelectedPlace(data[0]);
      }
    });
  }, []);

  const categories = ['All', 'Cafés', 'Restaurants', 'Culture', 'Attractions', 'Nature & Parks'];

  const filteredPlaces = places.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.address && p.address.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (selectedCategory !== 'All') {
      return (p.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
    }
    return true;
  });

  const getGoogleMapsSearchUrl = (place: Place) => {
    const query = `${place.name} ${place.address || place.city || 'Rajkot Gujarat'}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const mapQuery = selectedPlace
    ? `${selectedPlace.name} ${selectedPlace.address || selectedPlace.city || 'Rajkot Gujarat'}`
    : 'Rajkot Gujarat India';

  return (
    <div className="relative h-[calc(100vh-8rem)] w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row">
      {/* Left Sidebar: Place Selector & Search */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-[#E2E8F0] flex flex-col h-full z-10 shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-[#F1F5F9] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Compass size={18} className="text-[#006765]" />
              <h2 className="text-sm font-bold text-[#151C27]">Explore Venues on Map</h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {filteredPlaces.length} Venues
            </span>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs">
            <Search size={14} className="text-[#8E98B0]" />
            <input
              type="text"
              placeholder="Search places in Rajkot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-[#151C27] font-medium placeholder:text-[#8E98B0]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === c
                    ? 'bg-[#006765] text-white shadow-sm'
                    : 'bg-[#F8FAFC] text-[#555E74] hover:bg-[#CFE7E6]/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Venue List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9] p-2 space-y-1">
          {filteredPlaces.map((p) => {
            const isSelected = (selectedPlace?.id || (selectedPlace as any)?._id) === (p.id || (p as any)?._id);
            const pId = p.slug || p.id || (p as any)._id;
            return (
              <div
                key={p.id || (p as any)._id}
                onClick={() => setSelectedPlace(p)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-[#CFE7E6]/30 border border-[#006765]/30 shadow-xs'
                    : 'hover:bg-[#F8FAFC] border border-transparent'
                }`}
              >
                <img
                  src={p.coverImage || p.imageUrl || '/images/places/grand-courtyard.jpg'}
                  alt={p.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#006765] uppercase">
                      {p.subCategory || p.category}
                    </span>
                    <span className="text-xs font-bold text-[#151C27] flex items-center gap-0.5">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      {p.rating}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#151C27] truncate mt-0.5">{p.name}</h4>
                  <p className="text-[11px] text-[#555E74] truncate mt-0.5">{p.address || p.city}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Map Viewport with Google Maps Embed */}
      <div className="flex-1 w-full h-full relative bg-[#E5F2F0]">
        <iframe
          title="Placezy Gujarat Interactive Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&ie=UTF8&iwloc=&output=embed`}
          className="absolute inset-0 w-full h-full"
        ></iframe>

        {/* Selected Venue Floating Action Bar */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-[#E2E8F0] p-4 shadow-float flex items-center justify-between gap-3 animate-in fade-in duration-200 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedPlace.coverImage || selectedPlace.imageUrl || '/images/places/grand-courtyard.jpg'}
                alt={selectedPlace.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#151C27] truncate">{selectedPlace.name}</h4>
                <p className="text-[11px] text-[#555E74] truncate">{selectedPlace.address || selectedPlace.city}</p>
                <span className="text-[10px] text-[#006765] font-semibold">
                  ★ {selectedPlace.rating} • {selectedPlace.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={getGoogleMapsSearchUrl(selectedPlace)}
                target="_blank"
                rel="noopener noreferrer"
                title="Get Directions in Google Maps"
                className="px-3 py-1.5 bg-[#006765] hover:bg-[#005553] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Navigation size={13} />
                <span>Route</span>
              </a>
              <button
                onClick={() => navigate(`/place/${selectedPlace.slug || selectedPlace.id || (selectedPlace as any)._id}`)}
                title="View Full Place Page"
                className="p-2 border border-[#E2E8F0] hover:bg-[#F0F3FF] text-[#151C27] rounded-lg text-xs font-semibold transition-colors"
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

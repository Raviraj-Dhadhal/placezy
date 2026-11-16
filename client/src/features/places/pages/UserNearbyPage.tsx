import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { placesApi } from '../services/placesService';
import type { Place } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  MapPin,
  Compass,
  Star,
  Clock,
  ArrowRight,
  Route,
  ChevronDown
} from 'lucide-react';

export const UserNearbyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRadius, setSelectedRadius] = useState('5 km');
  const [sortBy, setSortBy] = useState('Distance (Nearest)');
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const radiusOptions = ['1 km', '3 km', '5 km', '10 km'];
  const filteredNearby = nearbyPlaces.filter((p) => {
    const numRadius = parseInt(selectedRadius, 10) || 5;
    const placeDist = p.distanceKm || (parseFloat(p.distance || '2') || 2);
    return placeDist <= numRadius;
  });

  useEffect(() => {
    placesApi
      .getAll({ city: 'Rajkot' })
      .then((data) => {
        setNearbyPlaces(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#555E74]">
        <span>Explore</span>
        <span>/</span>
        <span>Gujarat</span>
        <span>/</span>
        <span>Rajkot City Hub</span>
        <span>/</span>
        <span className="font-semibold text-[#151C27]">Nearby Places</span>
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-serif text-[#151C27]">
              Places Near You
            </h1>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-0.5 rounded-full border border-[#006765]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006765] animate-pulse"></span>
              Live Geofence
            </span>
          </div>
          <p className="text-xs text-[#555E74] mt-1">
            Discover curated local gems & heritage sanctuaries around Rajkot, Gujarat.
          </p>
        </div>

        {/* Radius selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#555E74] font-medium">Radius:</span>
          {radiusOptions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRadius(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                selectedRadius === r
                  ? 'bg-[#006765] text-white border-[#006765]'
                  : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
              }`}
            >
              {r}
            </button>
          ))}
          <span className="text-xs font-bold text-[#151C27] ml-2">
            {nearbyPlaces.length} places found
          </span>
        </div>
      </div>

      {/* Split Grid matching Screen 11: Places List Left, Geofence Map Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side (7 Cols): Place Cards List */}
        <div className="lg:col-span-7 space-y-4">
          {filteredNearby.map((place, idx) => (
            <div
              key={place.id || (place as any)._id}
              onClick={() => navigate(`/place/${place.slug || place.id || (place as any)._id}`)}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-4 hover:border-[#006765]/40 hover:shadow-card transition-all cursor-pointer flex flex-col sm:flex-row gap-4 relative group"
            >
              {/* Image with # Rank Badge */}
              <div className="relative w-full sm:w-44 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={place.coverImage}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#006765] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  #{idx + 1} Nearest
                </div>
              </div>

              {/* Place details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="white" size="sm">
                      {place.subCategory}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs font-bold text-[#151C27]">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {place.rating} ({place.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#151C27] mt-1 group-hover:text-[#006765] transition-colors">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#555E74] mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#006765]" />
                      {typeof place.location === 'string' ? place.location : (place.address || place.city)}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-[#006765]">{place.distance || (place.distanceKm ? `${place.distanceKm} km` : 'Near you')} away</span>
                    <span>•</span>
                    <span>{place.priceLevel || '₹₹'}</span>
                  </div>
                  <p className="text-xs text-[#555E74] line-clamp-1 mt-1">
                    "{place.tagline || place.description}"
                  </p>
                </div>

                {/* Card actions */}
                <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <Clock size={12} />
                    <span>{place.openingStatus} (Closes 11:30 PM)</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const queryTarget = encodeURIComponent(`${place.name} ${place.address || 'Rajkot Gujarat'}`);
                        window.open(`https://www.google.com/maps/search/?api=1&query=${queryTarget}`, '_blank');
                      }}
                      className="p-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F0F3FF] text-[#555E74] text-xs flex items-center gap-1 font-medium"
                    >
                      <Route size={13} className="text-[#006765]" />
                      <span>Route</span>
                    </button>
                    <Button size="sm">View Place</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side (5 Cols): Interactive Radius Geofence Map */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm space-y-3 sticky top-20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Jubilee Garden Center, Rajkot</h3>
                <span className="text-[10px] text-[#555E74]">GPS Accuracy: ± 8 meters • Refreshed just now</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Live Signal
              </span>
            </div>

            {/* Radar Geofence Graphic matching Figma Screen 11 */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#E6F4F1] border border-[#CFE7E6] flex items-center justify-center p-4">
              {/* Concentric distance circles */}
              <div className="absolute w-[90%] h-[90%] rounded-full border-2 border-dashed border-[#006765]/20"></div>
              <div className="absolute w-[65%] h-[65%] rounded-full border-2 border-[#006765]/30 bg-[#006765]/5"></div>
              <div className="absolute w-[40%] h-[40%] rounded-full border-2 border-[#006765]/40 bg-[#006765]/10"></div>

              {/* Pulsing User Center Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#006765] text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                  <Compass size={20} />
                </div>
                <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                  You are here (Jubilee Garden)
                </span>
              </div>

              {/* Pin 1: Grand Courtyard */}
              <div className="absolute top-[28%] left-[22%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-6 h-6 rounded-full bg-[#151C27] text-white text-[10px] font-bold flex items-center justify-center shadow-md border border-white">
                  1
                </div>
                <span className="text-[9px] font-bold text-[#151C27] bg-white/90 px-1 rounded shadow-xs mt-0.5">
                  Grand Courtyard
                </span>
              </div>

              {/* Pin 2: Kavita Tea */}
              <div className="absolute top-[20%] right-[30%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-6 h-6 rounded-full bg-[#151C27] text-white text-[10px] font-bold flex items-center justify-center shadow-md border border-white">
                  2
                </div>
                <span className="text-[9px] font-bold text-[#151C27] bg-white/90 px-1 rounded shadow-xs mt-0.5">
                  Kavita Tea
                </span>
              </div>

              {/* Pin 3: Watson Museum */}
              <div className="absolute bottom-[25%] left-[26%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-6 h-6 rounded-full bg-[#151C27] text-white text-[10px] font-bold flex items-center justify-center shadow-md border border-white">
                  3
                </div>
                <span className="text-[9px] font-bold text-[#151C27] bg-white/90 px-1 rounded shadow-xs mt-0.5">
                  Watson Museum
                </span>
              </div>
            </div>

            {/* Bottom active venue preview chip */}
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#151C27]">The Grand Courtyard Roastery</h4>
                <span className="text-[10px] text-[#555E74]">Kalawad Road • 1.4 km • Open Now</span>
              </div>
              <Button size="sm" icon={<Route size={13} />}>
                Direction
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

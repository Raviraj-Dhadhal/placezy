import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PLACES } from '../../../utils/mockData';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Search,
  SlidersHorizontal,
  Compass,
  MapPin,
  Star,
  Layers,
  Plus,
  Minus,
  RotateCw,
  Eye,
  Bookmark
} from 'lucide-react';

export const UserMapViewPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRadius, setSelectedRadius] = useState('5 km');
  const [mapLayer, setMapLayer] = useState<'Roads' | 'Satellite' | 'Heatmap'>('Roads');
  const [searchAsMove, setSearchAsMove] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(MOCK_PLACES[0]);

  const categories = ['All (18)', 'Cafés', 'Heritage & Culture', 'Fine Dining', 'Nature & Parks'];
  const radiusList = ['3 km', '5 km', '10 km', 'All Rajkot'];

  return (
    <div className="relative h-[calc(100vh-8rem)] w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm flex">
      {/* Floating Left Control Panel matching Screen 12 */}
      <div className="absolute top-4 left-4 z-20 w-80 max-h-[calc(100%-2rem)] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl border border-[#E2E8F0] p-4 shadow-float space-y-4">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-[#151C27]">Explore Rajkot on Map</h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-[#555E74] mt-0.5">Discover curated places around Rajkot, Gujarat.</p>
          </div>
          <button className="p-1 rounded hover:bg-[#F0F3FF] text-[#555E74]">
            <RotateCw size={13} />
          </button>
        </div>

        {/* Location Search Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#555E74] uppercase tracking-wider">
            Location Search
          </label>
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs">
            <MapPin size={13} className="text-[#006765]" />
            <input
              type="text"
              defaultValue="Yagnik Road, Jubilee Garden"
              className="bg-transparent border-none outline-none text-xs w-full text-[#151C27] font-medium"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-[#555E74] uppercase tracking-wider">
              Categories
            </label>
            <span className="text-[10px] text-[#006765] cursor-pointer hover:underline">Reset</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
                  selectedCategory === c
                    ? 'bg-[#006765] text-white'
                    : 'bg-[#F8FAFC] text-[#555E74] hover:bg-[#CFE7E6]/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Radius Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-[#555E74] uppercase tracking-wider">
            Radius Filter
          </label>
          <div className="grid grid-cols-4 gap-1">
            {radiusList.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRadius(r)}
                className={`text-[10px] py-1 text-center rounded font-semibold border ${
                  selectedRadius === r
                    ? 'bg-[#006765] text-white border-[#006765]'
                    : 'bg-white text-[#555E74] border-[#E2E8F0]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Search As I Move Map toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9]">
          <span className="text-xs text-[#151C27] font-medium">Search as I move map</span>
          <button
            onClick={() => setSearchAsMove(!searchAsMove)}
            className={`w-9 h-5 rounded-full transition-colors relative ${
              searchAsMove ? 'bg-[#006765]' : 'bg-[#CBD5E1]'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                searchAsMove ? 'right-1' : 'left-1'
              }`}
            ></span>
          </button>
        </div>

        {/* Featured Hubs In View */}
        <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
          <span className="text-[10px] font-bold text-[#555E74] uppercase tracking-wider block">
            Featured Hubs In View
          </span>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between p-1.5 rounded hover:bg-[#F0F3FF] cursor-pointer">
              <span className="font-medium text-[#151C27]">Race Course Grounds</span>
              <span className="text-[10px] text-[#555E74]">6 Curated Places</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded hover:bg-[#F0F3FF] cursor-pointer">
              <span className="font-medium text-[#151C27]">Jubilee Garden Quarter</span>
              <span className="text-[10px] text-[#555E74]">5 Curated Places</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Canvas (Full View) */}
      <div className="flex-1 w-full h-full bg-[#E5F2F0] relative overflow-hidden flex items-center justify-center">
        {/* Map grid lines representation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#006765_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Stylized River & Roads matching Rajkot (Aji River representation) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path d="M 800 0 Q 750 300 900 800" stroke="#006765" strokeWidth="8" fill="none" />
          <path d="M 0 350 Q 400 320 1000 400" stroke="#CBD5E1" strokeWidth="4" fill="none" />
          <path d="M 400 0 Q 420 500 450 1000" stroke="#CBD5E1" strokeWidth="4" fill="none" />
        </svg>

        {/* Interactive Place Markers matching Screen 12 */}
        {/* Pin 1: Grand Courtyard */}
        <div
          onClick={() => setSelectedPlace(MOCK_PLACES[0])}
          className="absolute top-[42%] left-[48%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="px-2 py-0.5 bg-[#151C27] text-white text-[11px] font-bold rounded shadow-md border border-white flex items-center gap-1">
            <span>The Grand Courtyard</span>
            <span className="text-amber-400">★ 4.8</span>
          </div>
          <div className="w-2.5 h-2.5 bg-[#151C27] rotate-45 -mt-1"></div>
        </div>

        {/* Pin 2: Watson Museum */}
        <div
          onClick={() => setSelectedPlace(MOCK_PLACES[1])}
          className="absolute top-[32%] left-[62%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="px-2 py-0.5 bg-white text-[#151C27] text-[10px] font-bold rounded shadow border border-[#E2E8F0] flex items-center gap-1">
            <span>Watson Museum</span>
            <span className="text-[#006765]">4.5★</span>
          </div>
        </div>

        {/* Pin 3: Kavita Tea */}
        <div
          onClick={() => setSelectedPlace(MOCK_PLACES[2])}
          className="absolute bottom-[38%] left-[58%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="px-2 py-0.5 bg-white text-[#151C27] text-[10px] font-bold rounded shadow border border-[#E2E8F0] flex items-center gap-1">
            <span>Kavita Artisan Tea House</span>
            <span className="text-[#006765]">4.9★</span>
          </div>
        </div>

        {/* Pin 4: Kathiyawadi Rasoi */}
        <div
          onClick={() => setSelectedPlace(MOCK_PLACES[3])}
          className="absolute bottom-[28%] left-[44%] z-10 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="px-2 py-0.5 bg-white text-[#151C27] text-[10px] font-bold rounded shadow border border-[#E2E8F0] flex items-center gap-1">
            <span>Kathiyawadi Rasoi Heritage</span>
            <span className="text-[#006765]">4.8★</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Center Detail Card matching Screen 12 */}
      {selectedPlace && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-[460px] bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-float flex items-center gap-4 animate-in fade-in duration-200">
          <img
            src={selectedPlace.coverImage}
            alt={selectedPlace.name}
            className="w-24 h-24 rounded-xl object-cover shrink-0"
          />

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <Badge variant="white" size="sm">
                {selectedPlace.subCategory}
              </Badge>
              <span className="text-[10px] font-bold text-[#006765]">
                {selectedPlace.matchPercentage}% Vibe Match
              </span>
            </div>

            <h3 className="font-bold text-sm text-[#151C27] truncate">
              {selectedPlace.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-[#555E74]">
              <span className="font-bold text-[#151C27]">★ {selectedPlace.rating}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">{selectedPlace.openingStatus}</span>
              <span>•</span>
              <span>{selectedPlace.distance}</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                size="sm"
                fullWidth
                icon={<Eye size={13} />}
                onClick={() => navigate(`/place/${selectedPlace.id}`)}
              >
                View Details
              </Button>
              <button className="p-2 rounded-button border border-[#E2E8F0] hover:bg-[#F0F3FF] text-[#555E74]">
                <Bookmark size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Right Map Layers Toggle & Zoom */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E2E8F0] shadow-md text-xs font-semibold">
          {(['Roads', 'Satellite', 'Heatmap'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setMapLayer(layer)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                mapLayer === layer ? 'bg-[#006765] text-white' : 'text-[#555E74] hover:bg-[#F0F3FF]'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>

        <div className="flex flex-col bg-white rounded-xl border border-[#E2E8F0] shadow-md overflow-hidden">
          <button className="p-2 text-[#555E74] hover:bg-[#F0F3FF] border-b border-[#F1F5F9]">
            <Plus size={16} />
          </button>
          <button className="p-2 text-[#555E74] hover:bg-[#F0F3FF]">
            <Minus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

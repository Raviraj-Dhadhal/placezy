import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Sliders,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const UserPlanNewTripPage: React.FC = () => {
  const navigate = useNavigate();

  const [tripName, setTripName] = useState('Gujarat Cultural & Heritage Tour');
  const [destination] = useState('Rajkot, Gujarat');
  const [dates, setDates] = useState('Nov 14 - Nov 20, 2026');
  const [travelers, setTravelers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Cafés',
    'Attractions',
  ]);
  const [selectedPace, setSelectedPace] = useState('Balanced (4/day)');

  const interestsList = ['Restaurants', 'Cafés', 'Shopping', 'Parks & Nature', 'Attractions', 'Entertainment', 'Religious Places'];
  const paceOptions = ['Relaxed (2/day)', 'Balanced (4/day)', 'Packed (6+/day)'];

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleCreate = () => {
    navigate('/trip-planner');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
        <button
          onClick={() => navigate('/trip-planner')}
          className="flex items-center gap-1 hover:text-[#151C27] font-medium"
        >
          <ArrowLeft size={15} />
          <span>Back to Trip Planner</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Plan New Trip
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Create your itinerary and save the places you want to visit across Gujarat.
          </p>
        </div>
        <span className="text-xs font-semibold bg-[#CFE7E6]/40 text-[#006765] px-3 py-1 rounded-full border border-[#006765]/20 self-start sm:self-auto flex items-center gap-1">
          <Clock size={13} />
          <span>Trip Duration: 7 Days</span>
        </span>
      </div>

      {/* Split Grid matching Screen 17 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Trip Details
            </span>
            <span className="text-xs text-[#555E74]">Step 1 of 4</span>
          </div>

          <div className="space-y-4">
            <Input
              label="Trip Name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              required
            />

            {/* Destination territory */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#151C27]">Destination</label>
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#006765] bg-[#CFE7E6]/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#006765]"></div>
                  <div>
                    <h4 className="text-xs font-bold text-[#151C27]">{destination}</h4>
                    <span className="text-[10px] text-[#555E74]">Within 25 km of Rajkot center</span>
                  </div>
                </div>
                <span className="text-xs text-[#006765] font-semibold cursor-pointer">Change ▾</span>
              </div>
            </div>

            {/* Dates & Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Travel Dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                icon={<Calendar size={15} />}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#151C27]">Travelers</label>
                <div className="flex items-center justify-between border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs">
                  <span className="font-semibold text-[#151C27]">{travelers} Travelers</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-6 h-6 rounded bg-[#F1F5F9] text-[#151C27] font-bold"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-6 h-6 rounded bg-[#006765] text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Interests */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#151C27]">Category Interests</label>
                <span className="text-[11px] text-[#555E74]">Multi-select enabled</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {interestsList.map((item) => {
                  const isSel = selectedInterests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSel
                          ? 'bg-[#006765] text-white border-[#006765]'
                          : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trip Pace */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <label className="text-xs font-bold text-[#151C27]">Trip Pace</label>
              <div className="grid grid-cols-3 gap-3">
                {paceOptions.map((pace) => (
                  <button
                    key={pace}
                    type="button"
                    onClick={() => setSelectedPace(pace)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedPace === pace
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
                    }`}
                  >
                    {pace}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Bottom CTAs */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
            <button
              onClick={() => navigate('/trip-planner')}
              className="text-xs text-[#555E74] font-semibold hover:text-[#151C27]"
            >
              Reset Details
            </button>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="md" onClick={() => navigate('/trip-planner')}>
                Cancel
              </Button>
              <Button size="md" icon={<ArrowRight size={15} />} iconPosition="right" onClick={handleCreate}>
                Create Trip Planner (7 Days)
              </Button>
            </div>
          </div>
        </div>

        {/* Right Live Itinerary Preview (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006765] animate-pulse"></span>
                <h3 className="text-xs font-bold text-[#151C27]">Live Itinerary Preview</h3>
              </div>
              <span className="text-[10px] text-[#006765] font-bold">2 Places Added</span>
            </div>

            <p className="text-[11px] text-[#555E74]">
              Places matched to your Gujarat Cultural & Heritage trip filters:
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-3">
                <img
                  src="/images/places/grand-courtyard.jpg"
                  alt="Cafe"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-[#006765] uppercase">Specialty Café</span>
                  <h4 className="text-xs font-bold text-[#151C27] truncate">The Grand Courtyard Roastery</h4>
                  <span className="text-[10px] text-[#555E74]">1.4 km • ₹₹ • Open Now</span>
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-3">
                <img
                  src="/images/places/watson-museum.jpg"
                  alt="Museum"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-[#006765] uppercase">Heritage Attraction</span>
                  <h4 className="text-xs font-bold text-[#151C27] truncate">Watson Museum & Jubilee Gardens</h4>
                  <span className="text-[10px] text-[#555E74]">2.8 km • Free Entry • Open Now</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#CFE7E6]/30 rounded-xl border border-[#006765]/20 text-[11px] text-[#006765] flex items-start gap-2">
              <Sparkles size={14} className="shrink-0 mt-0.5" />
              <span>Places added to your trip automatically optimize your daily travel route and commute times.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

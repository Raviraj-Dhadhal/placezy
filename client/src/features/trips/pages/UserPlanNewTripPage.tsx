import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { placesApi } from '../../places/services/placesService';
import { tripsApi } from '../services/tripsService';
import type { Place } from '../../../types';
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Clock,
  Sparkles,
  ArrowLeft,
  Check,
  Plus
} from 'lucide-react';

export const UserPlanNewTripPage: React.FC = () => {
  const navigate = useNavigate();

  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('Rajkot, Gujarat');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Cafés']);
  const [selectedPace, setSelectedPace] = useState('Balanced (4/day)');
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    placesApi.getAll().then((data) => {
      // Filter for Listed Properties in Rajkot when destination is Rajkot
      const listedRajkot = (data || []).filter((p) => {
        const c = (p.city || p.address || '').toLowerCase();
        return c.includes('rajkot') || !p.city;
      });
      setAllPlaces(listedRajkot);
    });
  }, [destination]);

  const interestsList = ['Cafés', 'Restaurants', 'Culture', 'Attractions', 'Nature & Parks', 'Shopping'];
  const paceOptions = ['Relaxed (2/day)', 'Balanced (4/day)', 'Packed (6+/day)'];

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const togglePlaceSelect = (placeId: string) => {
    if (selectedPlaceIds.includes(placeId)) {
      setSelectedPlaceIds(selectedPlaceIds.filter((id) => id !== placeId));
    } else {
      setSelectedPlaceIds([...selectedPlaceIds, placeId]);
    }
  };

  const handleCreate = async () => {
    if (!tripName.trim()) {
      setErrorMsg('Please enter a trip name');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const chosenPlaces = allPlaces.filter((p) =>
        selectedPlaceIds.includes(p.slug || p.id || (p as any)._id)
      );

      // Assign places across days
      const placesPayload = chosenPlaces.map((p, idx) => ({
        placeId: (p as any)._id || p.id,
        name: p.name,
        category: p.category,
        dayNumber: (idx % durationDays) + 1,
        time: idx % 2 === 0 ? '10:00 AM' : '03:00 PM',
        imageUrl: p.coverImage || p.imageUrl || '',
        address: p.address || p.city || 'Rajkot',
      }));

      const newTrip = await tripsApi.create({
        title: tripName,
        destination,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date(Date.now() + durationDays * 86400000).toISOString().split('T')[0],
        durationDays,
        travelersCount: travelers,
        pace: selectedPace,
        interests: selectedInterests,
        places: placesPayload,
        coverImage: chosenPlaces[0]?.coverImage || '/images/places/heritage-khambhalida.png',
      });

      if (newTrip) {
        navigate('/trip-planner');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to create trip');
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewPlaces = allPlaces.filter((p) =>
    selectedPlaceIds.includes(p.slug || p.id || (p as any)._id)
  );

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
            Create your custom multi-day itinerary with listed venues across Rajkot, Gujarat.
          </p>
        </div>
        <span className="text-xs font-semibold bg-[#CFE7E6]/40 text-[#006765] px-3 py-1 rounded-full border border-[#006765]/20 self-start sm:self-auto flex items-center gap-1">
          <Clock size={13} />
          <span>Duration: {durationDays} {durationDays === 1 ? 'Day' : 'Days'}</span>
        </span>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Trip Details
            </span>
            <span className="text-xs text-[#555E74]">Step 1 of 2</span>
          </div>

          <div className="space-y-4">
            <Input
              label="Trip Name"
              placeholder="e.g. My Rajkot Heritage & Food Weekend"
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
                    <span className="text-[10px] text-[#555E74]">Only verified properties in {destination}</span>
                  </div>
                </div>
                <span className="text-xs text-[#006765] font-semibold">Active Territory</span>
              </div>
            </div>

            {/* Duration Days Selector (up to 6 days) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#151C27]">Number of Days (1 to 6 Days)</label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDurationDays(d)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      durationDays === d
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
                    }`}
                  >
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dates & Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#151C27]">Travelers</label>
                <div className="flex items-center justify-between border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs">
                  <span className="font-semibold text-[#151C27]">{travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}</span>
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

            {/* Listed Properties in Rajkot to Add */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-[#151C27]">Select Places to Visit (Rajkot Properties)</label>
                  <p className="text-[11px] text-[#555E74]">Choose places from our verified Rajkot catalog</p>
                </div>
                <span className="text-xs font-semibold text-[#006765]">
                  {selectedPlaceIds.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1 border border-[#E2E8F0] rounded-xl">
                {allPlaces.map((p) => {
                  const pId = p.slug || p.id || (p as any)._id;
                  const isSelected = selectedPlaceIds.includes(pId);
                  return (
                    <div
                      key={pId}
                      onClick={() => togglePlaceSelect(pId)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#006765] bg-[#CFE7E6]/30'
                          : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <img
                        src={p.coverImage || p.imageUrl || '/images/places/grand-courtyard.jpg'}
                        alt={p.name}
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-[#006765] uppercase block truncate">
                          {p.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#151C27] truncate">{p.name}</h4>
                        <span className="text-[10px] text-[#555E74] block truncate">{p.address || p.city}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected ? 'bg-[#006765] border-[#006765] text-white' : 'border-[#CBD5E1]'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Interests */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <label className="text-xs font-bold text-[#151C27]">Interests</label>
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
          </div>

          {/* Form Bottom CTAs */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
            <button
              onClick={() => {
                setTripName('');
                setSelectedPlaceIds([]);
              }}
              className="text-xs text-[#555E74] font-semibold hover:text-[#151C27]"
            >
              Reset Details
            </button>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="md" onClick={() => navigate('/trip-planner')}>
                Cancel
              </Button>
              <Button
                size="md"
                disabled={isSubmitting || !tripName.trim()}
                icon={<ArrowRight size={15} />}
                iconPosition="right"
                onClick={handleCreate}
              >
                {isSubmitting ? 'Creating...' : `Create ${durationDays}-Day Trip`}
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
                <h3 className="text-xs font-bold text-[#151C27]">Selected Places</h3>
              </div>
              <span className="text-[10px] text-[#006765] font-bold">
                {previewPlaces.length} Places Added
              </span>
            </div>

            {previewPlaces.length === 0 ? (
              <p className="text-xs text-[#555E74] text-center py-6">
                No places selected yet. Tap any listed Rajkot venue on the left to include it in your itinerary.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto">
                {previewPlaces.map((p, idx) => (
                  <div key={p.slug || p.id || (p as any)._id} className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-3">
                    <img
                      src={p.coverImage || p.imageUrl || '/images/places/grand-courtyard.jpg'}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-[#006765] uppercase block truncate">
                        Day {(idx % durationDays) + 1}
                      </span>
                      <h4 className="text-xs font-bold text-[#151C27] truncate">{p.name}</h4>
                      <span className="text-[10px] text-[#555E74] block truncate">{p.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 bg-[#CFE7E6]/30 rounded-xl border border-[#006765]/20 text-[11px] text-[#006765] flex items-start gap-2">
              <Sparkles size={14} className="shrink-0 mt-0.5" />
              <span>Places will be distributed across your {durationDays}-day schedule in Rajkot.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

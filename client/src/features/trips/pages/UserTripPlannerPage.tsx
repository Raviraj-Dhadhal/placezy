import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { tripsApi } from '../services/tripsService';
import { placesApi } from '../../places/services/placesService';
import type { Trip, Place } from '../../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Sparkles,
  Compass,
  X,
  Edit2,
  Check,
  ChevronDown
} from 'lucide-react';

// Helper to convert "10:00 AM" into minutes from midnight for interval checks
function parseTimeToMinutes(t?: string): number {
  if (!t) return 600; // default 10:00 AM
  const match = t.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return 600;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const ampm = match[3] ? match[3].toUpperCase() : 'AM';
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

// Convert 24-hr "14:30" string to display format "02:30 PM"
function format24ToDisplay(val: string): string {
  if (!val) return '10:00 AM';
  const parts = val.split(':');
  let h = parseInt(parts[0], 10);
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
}

// Convert display format "02:30 PM" to "14:30" for <input type="time" />
function formatDisplayTo24(val?: string): string {
  if (!val) return '10:00';
  const match = val.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return '10:00';
  let h = parseInt(match[1], 10);
  const m = match[2];
  const ampm = match[3] ? match[3].toUpperCase() : 'AM';
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${m}`;
}

export const UserTripPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [addingToDay, setAddingToDay] = useState<number | null>(null);

  // Time editing state: global index of stop being edited, and the new 24h time string
  const [editingStopIndex, setEditingStopIndex] = useState<number | null>(null);
  const [editTimeValue, setEditTimeValue] = useState<string>('10:00');

  const fetchTrips = async () => {
    try {
      const data = await tripsApi.getAll();
      setTrips(data || []);
      if (data && data.length > 0) {
        // Keep active trip if already selected, or pick the first one
        setActiveTrip((prev) => {
          if (prev) {
            const found = data.find((t: any) => (t._id || t.id) === (prev._id || prev.id));
            if (found) return found;
          }
          return data[0];
        });
      } else {
        setActiveTrip(null);
      }
    } catch (err) {
      console.error('Failed to load trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
    placesApi.getAll().then((data) => {
      // Listed venues in Rajkot
      const rajkotVenues = (data || []).filter((p) => {
        const c = (p.city || p.address || '').toLowerCase();
        return c.includes('rajkot') || !p.city;
      });
      setAvailablePlaces(rajkotVenues);
    });
  }, []);

  const handleSelectTrip = (tripId: string) => {
    const selected = trips.find((t: any) => (t._id || t.id) === tripId);
    if (selected) {
      setActiveTrip(selected);
      setEditingStopIndex(null);
      setAddingToDay(null);
    }
  };

  const handleAddPlaceToDay = async (place: Place, dayNumber: number) => {
    if (!activeTrip) return;

    // Suggest intelligent time: calculate 3 hours after last stop on this day, or start at 10:00 AM
    const existingDayPlaces = (activeTrip.places || []).filter((p) => p.dayNumber === dayNumber);
    let defaultTime = '10:00 AM';
    if (existingDayPlaces.length > 0) {
      const lastStop = existingDayPlaces[existingDayPlaces.length - 1];
      const lastMin = parseTimeToMinutes(lastStop.time);
      const nextMin = Math.min(lastMin + 180, 22 * 60); // +3 hours, up to 10:00 PM
      const h24 = Math.floor(nextMin / 60);
      const m = nextMin % 60;
      defaultTime = format24ToDisplay(`${h24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }

    const newStop = {
      placeId: (place as any)._id || place.id,
      name: place.name,
      category: place.category,
      dayNumber,
      time: defaultTime,
      imageUrl: place.coverImage || place.imageUrl || '',
      address: place.address || place.city || 'Rajkot',
    };

    const newPlaces = [...(activeTrip.places || []), newStop];
    try {
      const res = await tripsApi.updateStops(activeTrip.id || (activeTrip as any)._id, newPlaces);
      setActiveTrip(res || { ...activeTrip, places: newPlaces });
      setTrips((prev) => prev.map((t: any) => (t._id || t.id) === (activeTrip._id || activeTrip.id) ? (res || { ...activeTrip, places: newPlaces }) : t));
      setAddingToDay(null);
    } catch (err) {
      console.error('Failed to add stop:', err);
    }
  };

  const handleSaveEditedTime = async (globalIdx: number) => {
    if (!activeTrip) return;
    const formatted = format24ToDisplay(editTimeValue);
    const updatedPlaces = [...(activeTrip.places || [])];
    if (updatedPlaces[globalIdx]) {
      updatedPlaces[globalIdx] = {
        ...updatedPlaces[globalIdx],
        time: formatted,
      };
    }
    try {
      const res = await tripsApi.updateStops(activeTrip.id || (activeTrip as any)._id, updatedPlaces);
      setActiveTrip(res || { ...activeTrip, places: updatedPlaces });
      setTrips((prev) => prev.map((t: any) => (t._id || t.id) === (activeTrip._id || activeTrip.id) ? (res || { ...activeTrip, places: updatedPlaces }) : t));
      setEditingStopIndex(null);
    } catch (err) {
      console.error('Failed to update stop time:', err);
    }
  };

  const handleRemoveStop = async (stopIndex: number) => {
    if (!activeTrip) return;
    const newPlaces = (activeTrip.places || []).filter((_, idx) => idx !== stopIndex);
    try {
      const res = await tripsApi.updateStops(activeTrip.id || (activeTrip as any)._id, newPlaces);
      setActiveTrip(res || { ...activeTrip, places: newPlaces });
      setTrips((prev) => prev.map((t: any) => (t._id || t.id) === (activeTrip._id || activeTrip.id) ? (res || { ...activeTrip, places: newPlaces }) : t));
    } catch (err) {
      console.error('Failed to remove stop:', err);
    }
  };

  const handleDeleteTrip = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trip itinerary?')) {
      await tripsApi.delete(id);
      fetchTrips();
    }
  };

  // Add an extra day to the trip
  const handleAddDay = async () => {
    if (!activeTrip) return;
    const currentDays = Math.max(activeTrip.durationDays || 1, 1);
    const newDays = currentDays + 1;
    try {
      const tripId = activeTrip.id || (activeTrip as any)._id;
      const res = await tripsApi.update(tripId, { durationDays: newDays });
      setActiveTrip(res || { ...activeTrip, durationDays: newDays });
      setTrips((prev) =>
        prev.map((t: any) =>
          (t._id || t.id) === tripId ? (res || { ...activeTrip, durationDays: newDays }) : t
        )
      );
    } catch (err) {
      console.error('Failed to add day:', err);
    }
  };

  // Remove a day from the trip and reassign any orphan places to the least loaded remaining day (or last remaining day)
  const handleRemoveDay = async (targetDay: number) => {
    if (!activeTrip) return;
    const currentDays = Math.max(activeTrip.durationDays || 1, 1);
    if (currentDays <= 1) {
      alert('A trip must have at least 1 day.');
      return;
    }

    const remainingDaysCount = currentDays - 1;
    const remainingDayNumbers = Array.from({ length: remainingDaysCount }, (_, i) => i + 1);

    // Calculate count of places already on each remaining day (excluding targetDay)
    const existingPlaces = activeTrip.places || [];
    const remainingDayCounts: Record<number, number> = {};
    for (const d of remainingDayNumbers) {
      remainingDayCounts[d] = existingPlaces.filter((p) => {
        // If a place is before targetDay, its dayNumber stays same
        // If a place is after targetDay, its dayNumber decrements by 1
        if (p.dayNumber === targetDay) return false;
        const mappedDay = p.dayNumber > targetDay ? p.dayNumber - 1 : p.dayNumber;
        return mappedDay === d;
      }).length;
    }

    // Find the remaining day that has the least places to visit (tie-break: latest day)
    let bestDay = remainingDaysCount; // default fallback: last remaining day
    let minPlaces = Infinity;
    for (const d of remainingDayNumbers) {
      const count = remainingDayCounts[d] ?? 0;
      if (count <= minPlaces) {
        minPlaces = count;
        bestDay = d;
      }
    }

    // Reassign places:
    // 1. Places on targetDay get moved to bestDay
    // 2. Places on days after targetDay shift down by 1 (e.g., Day 4 -> Day 3)
    const updatedPlaces = existingPlaces.map((p) => {
      if (p.dayNumber === targetDay) {
        return { ...p, dayNumber: bestDay };
      }
      if (p.dayNumber > targetDay) {
        return { ...p, dayNumber: p.dayNumber - 1 };
      }
      return p;
    });

    const targetDayStopsCount = existingPlaces.filter((p) => p.dayNumber === targetDay).length;

    try {
      const tripId = activeTrip.id || (activeTrip as any)._id;
      const res = await tripsApi.update(tripId, {
        durationDays: remainingDaysCount,
        places: updatedPlaces,
      });

      const updatedTrip = res || {
        ...activeTrip,
        durationDays: remainingDaysCount,
        places: updatedPlaces,
      };

      setActiveTrip(updatedTrip);
      setTrips((prev) =>
        prev.map((t: any) => ((t._id || t.id) === tripId ? updatedTrip : t))
      );

      if (targetDayStopsCount > 0) {
        alert(
          `Day ${targetDay} removed. ${targetDayStopsCount} place(s) were automatically reassigned to Day ${bestDay} (day with least places).`
        );
      }
    } catch (err) {
      console.error('Failed to remove day:', err);
      alert('Could not remove day. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 max-w-7xl mx-auto">
        <div className="w-8 h-8 border-3 border-[#006765] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <span className="text-xs text-[#555E74] font-medium block">
          Loading your planned trips...
        </span>
      </div>
    );
  }

  if (!activeTrip || trips.length === 0) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto">
            <Compass size={28} />
          </div>
          <h2 className="text-xl font-bold font-serif text-[#151C27]">No Trips Planned Yet</h2>
          <p className="text-xs text-[#555E74] leading-relaxed">
            Create your custom multi-day itinerary across Rajkot and organize places to visit day by day.
          </p>
          <Button size="md" icon={<Plus size={15} />} onClick={() => navigate('/plan-trip')}>
            Plan Your First Trip
          </Button>
        </div>
      </div>
    );
  }

  const durationDays = Math.max(activeTrip.durationDays || 1, 1);
  const dayBuckets = Array.from({ length: durationDays }, (_, i) => i + 1);

  // Filter available places for modal: allow repeat visits ONLY if 3+ hours have passed since prior visit
  const getEligiblePlacesForDay = (dayNum: number) => {
    const dayStops = (activeTrip?.places || []).filter((p) => p.dayNumber === dayNum);
    return availablePlaces.map((p) => {
      const pName = p.name.trim().toLowerCase();
      const existingVisits = dayStops.filter((s) => s.name.trim().toLowerCase() === pName);
      
      let isAllowed = true;
      let reason = '';

      if (existingVisits.length > 0) {
        // Check time of latest visit
        const lastVisit = existingVisits[existingVisits.length - 1];
        const lastMinutes = parseTimeToMinutes(lastVisit.time);
        // Estimate next visit time (+3 hours)
        const nextEstimated = lastMinutes + 180;
        if (nextEstimated >= 24 * 60) {
          isAllowed = false;
          reason = `Already visited at ${lastVisit.time || 'earlier'}. Day limit reached.`;
        } else {
          isAllowed = true;
          reason = `Repeat visit allowed (3+ hrs after ${lastVisit.time}).`;
        }
      }

      return {
        place: p,
        isAllowed,
        reason,
        visitCount: existingVisits.length,
      };
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Multi-Trip Switcher Bar (Ensures all created trips are always visible and switchable) */}
      {trips.length > 1 && (
        <div className="bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[#555E74] shrink-0 pl-2">Your Saved Trips:</span>
          {trips.map((t: any) => {
            const tId = t._id || t.id;
            const isCurrent = tId === (activeTrip._id || activeTrip.id);
            return (
              <button
                key={tId}
                onClick={() => handleSelectTrip(tId)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#006765] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#555E74] hover:bg-[#F0F3FF] hover:text-[#151C27] border border-[#E2E8F0]'
                }`}
              >
                <span>{t.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isCurrent ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {t.durationDays || 1}d
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Top Header matching Screen 14 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
              • Custom Itinerary • {durationDays} {durationDays === 1 ? 'Day' : 'Days'} Planned
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            {activeTrip.title}
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Organize your favorite places into a simple, seamless trip plan tailored for Rajkot.
          </p>

          <div className="flex items-center gap-3 text-xs text-[#555E74] mt-2">
            <span className="font-bold text-[#151C27]">{activeTrip.destination || 'Rajkot, Gujarat'}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-[#006765]" />
              {activeTrip.startDate || 'Upcoming'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-[#006765]" />
              {activeTrip.destination || 'Rajkot, Gujarat'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="md"
            variant="outline"
            icon={<Trash2 size={15} />}
            onClick={() => handleDeleteTrip(activeTrip.id || (activeTrip as any)._id)}
          >
            Delete Trip
          </Button>

          <Button
            size="md"
            icon={<Plus size={15} />}
            onClick={() => navigate('/plan-trip')}
          >
            Plan Another Trip
          </Button>
        </div>
      </div>

      {/* Main Split Layout: Day Itineraries Left, Trip Summary Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Dynamic Multi-Day Itinerary */}
        <div className="lg:col-span-8 space-y-6">
          {dayBuckets.map((dayNum) => {
            const dayPlaces = (activeTrip.places || []).filter((p) => p.dayNumber === dayNum);
            return (
              <div key={dayNum} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#006765] text-white flex items-center justify-center font-bold text-xs">
                      {dayNum}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#151C27]">Day {dayNum} Itinerary</h3>
                      <span className="text-[11px] text-[#555E74]">
                        {dayPlaces.length} {dayPlaces.length === 1 ? 'Place' : 'Places'} scheduled
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-1 rounded-full">
                      Day {dayNum}
                    </span>
                    {durationDays > 1 && (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to remove Day ${dayNum}? Any places planned on Day ${dayNum} will be automatically moved to the day with the fewest stops.`
                            )
                          ) {
                            handleRemoveDay(dayNum);
                          }
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg border border-red-200 transition-colors"
                        title={`Remove Day ${dayNum}`}
                      >
                        <Trash2 size={12} />
                        <span>Remove Day</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Day Stops */}
                {dayPlaces.length === 0 ? (
                  <p className="text-xs text-[#555E74] py-3 text-center">
                    No places added to Day {dayNum} yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {dayPlaces.map((p, idx) => {
                      // Find actual global index in activeTrip.places
                      const globalIdx = (activeTrip.places || []).findIndex((x) => x === p);
                      const isEditing = editingStopIndex === globalIdx;

                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] group hover:border-[#006765]/30 transition-all"
                        >
                          <img
                            src={p.imageUrl || '/images/places/grand-courtyard.jpg'}
                            alt={p.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <Badge variant="white" size="sm">{p.category}</Badge>
                              
                              {/* Editable Time Badge */}
                              {isEditing ? (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="time"
                                    value={editTimeValue}
                                    onChange={(e) => setEditTimeValue(e.target.value)}
                                    className="text-xs bg-white border border-[#006765] rounded-md px-2 py-0.5 font-bold text-[#151C27] outline-none"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleSaveEditedTime(globalIdx)}
                                    className="p-1 rounded bg-[#006765] text-white hover:bg-[#00514f]"
                                    title="Save Time"
                                  >
                                    <Check size={13} />
                                  </button>
                                  <button
                                    onClick={() => setEditingStopIndex(null)}
                                    className="p-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    title="Cancel"
                                  >
                                    <X size={13} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingStopIndex(globalIdx);
                                    setEditTimeValue(formatDisplayTo24(p.time));
                                  }}
                                  className="flex items-center gap-1 text-[11px] font-bold text-[#006765] bg-[#CFE7E6]/40 hover:bg-[#CFE7E6] px-2 py-0.5 rounded-md transition-colors"
                                  title="Click to change schedule time"
                                >
                                  <Clock size={12} />
                                  <span>{p.time || '10:00 AM'}</span>
                                  <Edit2 size={11} className="opacity-60 group-hover:opacity-100" />
                                </button>
                              )}
                            </div>

                            <h4 className="text-xs font-bold text-[#151C27] mt-1">{p.name}</h4>
                            <p className="text-[11px] text-[#555E74] mt-0.5">{p.address || 'Rajkot, Gujarat'}</p>
                          </div>

                          <button
                            onClick={() => {
                              if (globalIdx !== -1) handleRemoveStop(globalIdx);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                            title="Remove stop"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={() => setAddingToDay(dayNum)}
                  className="w-full py-2.5 rounded-xl border border-dashed border-[#CBD5E1] text-xs font-semibold text-[#006765] hover:bg-[#F0F3FF] transition-colors"
                >
                  + Add Place to Day {dayNum}
                </button>
              </div>
            );
          })}

          {/* Add Day Button at bottom of itinerary */}
          <button
            onClick={handleAddDay}
            className="w-full py-3.5 rounded-2xl bg-white border border-[#006765] border-dashed text-xs font-bold text-[#006765] hover:bg-[#CFE7E6]/20 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Plus size={16} />
            <span>Add Day {durationDays + 1} to Itinerary</span>
          </button>
        </div>

        {/* Right Column (4 Cols): Trip Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4 sticky top-20">
            <h3 className="text-sm font-bold text-[#151C27] border-b border-[#F1F5F9] pb-3">
              Trip Summary
            </h3>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#151C27] block">
                  {activeTrip.places?.length || 0} Places
                </span>
                <span className="text-[10px] text-[#555E74]">Total Places</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#151C27] block">{durationDays} Days</span>
                <span className="text-[10px] text-[#555E74]">Total Duration</span>
              </div>
            </div>

            {/* Itinerary progress breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9] text-xs">
              <div className="flex justify-between font-semibold text-[#151C27]">
                <span>Itinerary Stops by Day</span>
                <span className="text-[#006765]">Active</span>
              </div>
              <div className="space-y-1 text-[11px] text-[#555E74] pt-1">
                {dayBuckets.map((d) => {
                  const count = (activeTrip.places || []).filter((p) => p.dayNumber === d).length;
                  return (
                    <div key={d} className="flex justify-between">
                      <span>Day {d}</span>
                      <span>{count} stops</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insider Tip Box */}
            <div className="p-3 bg-[#CFE7E6]/30 border border-[#006765]/20 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#006765]">
                <Sparkles size={14} />
                <span>Smart Scheduling Tip</span>
              </div>
              <p className="text-[11px] text-[#555E74] leading-relaxed">
                Click any time badge to edit the schedule. If you want to return to a favorite café or bistro in the evening, Placezy allows you to add it back 3–4 hours after your morning visit!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Place to Day (Enforces 3-4 hour comeback rule) */}
      {addingToDay !== null && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#151C27]">
                  Add Place to Day {addingToDay}
                </h3>
                <p className="text-[11px] text-[#555E74]">
                  Choose from verified places in Rajkot. Re-visiting a spot is allowed after 3+ hours.
                </p>
              </div>
              <button
                onClick={() => setAddingToDay(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {getEligiblePlacesForDay(addingToDay).map(({ place: p, isAllowed, reason, visitCount }) => {
                const pId = p.slug || p.id || (p as any)._id;
                return (
                  <div
                    key={pId}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      isAllowed
                        ? 'border-[#E2E8F0] hover:border-[#006765] hover:bg-[#F8FAFC] cursor-pointer'
                        : 'border-[#F1F5F9] bg-gray-50/70 opacity-60'
                    }`}
                    onClick={() => {
                      if (isAllowed) handleAddPlaceToDay(p, addingToDay);
                    }}
                  >
                    <img
                      src={p.coverImage || p.imageUrl || '/images/places/grand-courtyard.jpg'}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-[#006765] uppercase block truncate">
                          {p.category}
                        </span>
                        {visitCount > 0 && (
                          <span className="text-[9px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                            Visited {visitCount}x
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-[#151C27] truncate">{p.name}</h4>
                      <p className="text-[11px] text-[#555E74] truncate">
                        {reason ? (
                          <span className={isAllowed ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                            {reason}
                          </span>
                        ) : (
                          p.address || p.city
                        )}
                      </p>
                    </div>

                    {isAllowed ? (
                      <Button size="sm" variant="outline">
                        {visitCount > 0 ? '+ Re-visit' : '+ Add'}
                      </Button>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        Scheduled
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Share2,
  CheckCircle,
  FileDown,
  Navigation,
  Sparkles
} from 'lucide-react';

export const UserTripPlannerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Trip Action Buttons matching Screen 14 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
              • Custom Itinerary • 3 Days Planned
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Plan Your Trip
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Organize your favorite places into a simple, seamless trip plan tailored for Rajkot.
          </p>

          <div className="flex items-center gap-3 text-xs text-[#555E74] mt-2">
            <span className="font-bold text-[#151C27]">My Rajkot Trip</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-[#006765]" />
              Oct 24 - Oct 26, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-[#006765]" />
              Rajkot, Gujarat
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="md"
            icon={<Share2 size={15} />}
          >
            Share Trip
          </Button>

          <Button
            size="md"
            icon={<Plus size={15} />}
            onClick={() => navigate('/plan-trip')}
          >
            + Add Day
          </Button>
        </div>
      </div>

      {/* Main Split Layout: Day Itineraries Left, Trip Summary Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Multi-Day Itinerary */}
        <div className="lg:col-span-8 space-y-6">
          {/* DAY 1 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006765] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#151C27]">Day 1: Heritage & Historic Old City</h3>
                  <span className="text-[11px] text-[#555E74]">3 Places • Morning to Mid-afternoon • 2.8 km coverage</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-1 rounded-full">
                5h 30m total
              </span>
            </div>

            {/* Stop 1 */}
            <div className="flex items-start gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <img
                src="/images/places/watson-museum.jpg"
                alt="Watson Museum"
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <Badge variant="white" size="sm">Heritage Museum</Badge>
                  <span className="text-[11px] font-bold text-[#006765]">09:30 AM - 11:30 AM (2 hrs)</span>
                </div>
                <h4 className="text-xs font-bold text-[#151C27] mt-1">Watson Museum & Jubilee Gardens</h4>
                <p className="text-[11px] text-[#555E74] mt-0.5">Colonial-era exhibits, stone sculptures, garden stroll</p>
              </div>
            </div>

            {/* Travel indicator */}
            <div className="pl-6 text-[11px] text-[#555E74] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006765]"></span>
              <span>12 mins transit (1.4 km) via Kalawad Palace Road</span>
            </div>

            {/* Stop 2 */}
            <div className="flex items-start gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <img
                src="/images/places/kavita-tea.jpg"
                alt="Kavita Tea"
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <Badge variant="white" size="sm">Heritage Tea & Café</Badge>
                  <span className="text-[11px] font-bold text-[#006765]">12:00 PM - 01:30 PM (1.5 hrs)</span>
                </div>
                <h4 className="text-xs font-bold text-[#151C27] mt-1">Kavita Artisan Tea & Coffee</h4>
                <p className="text-[11px] text-[#555E74] mt-0.5">Single-estate Darjeeling pour-overs, courtyard quiet</p>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-dashed border-[#CBD5E1] text-xs font-semibold text-[#006765] hover:bg-[#F0F3FF] transition-colors">
              + Add Place to Day 1
            </button>
          </div>

          {/* DAY 2 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006765] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#151C27]">Day 2: Artisan Cafés & Courtyard Ambiance</h3>
                  <span className="text-[11px] text-[#555E74]">2 Places • Mid-morning & Sunset Pavilions • 4.2 km coverage</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-1 rounded-full">
                4h 00m total
              </span>
            </div>

            <div className="flex items-start gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <img
                src="/images/places/grand-courtyard.jpg"
                alt="Grand Courtyard"
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <Badge variant="white" size="sm">Specialty Roastery</Badge>
                  <span className="text-[11px] font-bold text-[#006765]">10:00 AM - 12:00 PM</span>
                </div>
                <h4 className="text-xs font-bold text-[#151C27] mt-1">The Grand Courtyard Roastery & Bistro</h4>
                <p className="text-[11px] text-[#555E74] mt-0.5">Artisanal brunch, stone courtyard, single-origin roasts</p>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-dashed border-[#CBD5E1] text-xs font-semibold text-[#006765] hover:bg-[#F0F3FF] transition-colors">
              + Add Place to Day 2
            </button>
          </div>
        </div>

        {/* Right Column (4 Cols): Trip Summary Sidebar matching Screen 14 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4 sticky top-20">
            <h3 className="text-sm font-bold text-[#151C27] border-b border-[#F1F5F9] pb-3">
              Trip Summary
            </h3>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#151C27] block">6 Places</span>
                <span className="text-[10px] text-[#555E74]">Total Places</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#151C27] block">3 Days</span>
                <span className="text-[10px] text-[#555E74]">Total Duration</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#006765] block">18.4 km</span>
                <span className="text-[10px] text-[#555E74]">Est. Total Transit</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#006765] block">11h 15m</span>
                <span className="text-[10px] text-[#555E74]">Est. Experience</span>
              </div>
            </div>

            {/* Itinerary progress breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9] text-xs">
              <div className="flex justify-between font-semibold text-[#151C27]">
                <span>Itinerary Stops by Day</span>
                <span className="text-[#006765]">100% Planned</span>
              </div>
              <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="w-full h-full bg-[#006765] rounded-full"></div>
              </div>
              <div className="space-y-1 text-[11px] text-[#555E74] pt-1">
                <div className="flex justify-between">
                  <span>Day 1: Old City Heritage</span>
                  <span>3 stops (50%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Day 2: Artisan Courtyards</span>
                  <span>2 stops (33%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Day 3: Contemporary Dining</span>
                  <span>1 stop (17%)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <Button fullWidth size="md">
                Save Trip
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="md"
                icon={<FileDown size={14} />}
              >
                Export as PDF
              </Button>
            </div>

            {/* Insider Tip Box */}
            <div className="p-3 bg-[#CFE7E6]/30 border border-[#006765]/20 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#006765]">
                <Sparkles size={14} />
                <span>Insider Rajkot Tip</span>
              </div>
              <p className="text-[11px] text-[#555E74] leading-relaxed">
                Most heritage locations around Jubilee Garden are quietest between 9:30 AM and 11:00 AM before afternoon traffic build-up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

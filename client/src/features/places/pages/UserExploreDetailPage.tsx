import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PLACES, MOCK_REVIEWS } from '../../../utils/mockData';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Share2,
  Bookmark,
  Calendar,
  Navigation,
  CheckCircle2,
  Plus
} from 'lucide-react';

export const UserExploreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(true);

  // Find place or fallback to p1 (The Grand Courtyard Roastery)
  const place = MOCK_PLACES.find((p) => p.id === id) || MOCK_PLACES[0];

  const similarPlaces = MOCK_PLACES.filter((p) => p.id !== place.id).slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex items-center justify-between text-xs text-[#555E74]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-[#151C27] font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <span>Explore</span>
          <span>/</span>
          <span>Rajkot</span>
          <span>/</span>
          <span>Cafés & Dining</span>
          <span>/</span>
          <span className="font-semibold text-[#151C27]">{place.name}</span>
        </div>
      </div>

      {/* 5-Photo Mosaic Gallery matching Screen 08 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
        {/* Main large photo (col span 2) */}
        <div className="lg:col-span-2 relative aspect-[16/10] bg-slate-100 overflow-hidden group">
          <img
            src={place.coverImage}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="teal" size="md">
              {place.subCategory}
            </Badge>
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {place.matchPercentage}% Vibe Match
            </span>
          </div>
          <button className="absolute bottom-4 left-4 bg-black/70 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
            <span>View All 12 Photos</span>
          </button>
        </div>

        {/* 4 smaller thumbnail photos */}
        <div className="grid grid-cols-2 gap-3">
          {place.galleryImages.concat(place.galleryImages).slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden group">
              <img
                src={img}
                alt={`${place.name} thumbnail`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Title, Quick Stats & Action Buttons Row */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#006765] font-semibold">{place.subCategory}</span>
            <span className="text-xs text-[#555E74]">•</span>
            <span className="text-xs text-[#555E74]">{place.priceRange || place.priceLevel}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            {place.name}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#555E74] mt-2">
            <span className="flex items-center gap-1 font-bold text-[#151C27]">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {place.rating} ({place.reviewsCount} reviews)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-[#006765]" />
              {place.location}
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{place.openingStatus} (Closes 11:30 PM)</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="md"
            icon={<Navigation size={16} />}
            onClick={() => window.open(`https://maps.google.com/?q=${place.address}`, '_blank')}
          >
            Get Directions
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<Bookmark size={16} className={isWishlisted ? 'fill-[#006765] text-[#006765]' : ''} />}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            {isWishlisted ? 'Saved' : 'Add to Wishlist'}
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<Calendar size={16} />}
            onClick={() => navigate('/plan-trip')}
          >
            Add to Trip
          </Button>

          <button className="p-2.5 rounded-button border border-[#E2E8F0] text-[#555E74] hover:bg-[#F0F3FF]">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* 2-Column Split: Detailed Info Left, Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): About, Facilities, Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* About The Space */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h2 className="text-base font-bold text-[#151C27]">About the Space</h2>
            <p className="text-xs md:text-sm text-[#555E74] leading-relaxed">
              {place.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs bg-[#CFE7E6]/40 text-[#006765] font-semibold px-3 py-1 rounded-full">
                Atmosphere: Quiet Heritage Courtyard
              </span>
              <span className="text-xs bg-[#CFE7E6]/40 text-[#006765] font-semibold px-3 py-1 rounded-full">
                Work-Friendly
              </span>
              <span className="text-xs bg-[#CFE7E6]/40 text-[#006765] font-semibold px-3 py-1 rounded-full">
                Sunset Acoustic
              </span>
            </div>
          </div>

          {/* Facilities & Amenities */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#151C27]">Facilities & Amenities</h2>
              <span className="text-xs text-[#006765] font-semibold cursor-pointer">
                Verified by Urban Curators
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {place.facilities.map((fac) => (
                <div
                  key={fac}
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center space-y-1"
                >
                  <CheckCircle2 size={16} className="text-[#006765] mx-auto" />
                  <span className="text-xs font-semibold text-[#151C27] block leading-tight">
                    {fac}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews & Community Insights */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#151C27]">Reviews & Insider Insights</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-3xl font-bold font-serif text-[#151C27]">
                    {place.rating}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={14} className="fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-[#555E74]">Based on {place.reviewsCount} verified reviews</span>
                  </div>
                </div>
              </div>

              <Button
                size="md"
                icon={<Plus size={16} />}
                onClick={() => navigate(`/place/${place.id}/review`)}
              >
                Write a Review
              </Button>
            </div>

            {/* Review Cards list */}
            <div className="space-y-4 divide-y divide-[#F1F5F9]">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="pt-4 first:pt-0 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar gender={review.userGender || 'female'} size={36} name={review.userName} />
                      <div>
                        <h4 className="text-xs font-bold text-[#151C27] flex items-center gap-1.5">
                          <span>{review.userName}</span>
                          {review.verified && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">
                              Verified
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] text-[#555E74]">{review.userRole} • {review.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star size={13} className="fill-amber-400" />
                      <span>{review.rating}.0</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#555E74] leading-relaxed pl-12">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Location, Timings, Similar Places */}
        <div className="space-y-6">
          {/* Location & Contact Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151C27]">Location & Contact</h3>

            {/* Static map preview container */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E8F0]">
              <img
                src="/images/places/grand-courtyard.jpg"
                alt="Map view"
                className="w-full h-full object-cover filter blur-[1px] brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#006765] text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                  <MapPin size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#555E74]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#006765] shrink-0 mt-0.5" />
                <span>{place.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#006765] shrink-0" />
                <span>Today: {place.timings}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#006765] shrink-0" />
                <span>{place.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#006765] shrink-0" />
                <span>{place.email}</span>
              </div>
            </div>
          </div>

          {/* Similar Places in Rajkot */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#151C27]">Similar Places in Rajkot</h3>
            <div className="space-y-3">
              {similarPlaces.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => navigate(`/place/${sim.id}`)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                >
                  <img
                    src={sim.coverImage}
                    alt={sim.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#151C27] truncate">{sim.name}</h4>
                    <span className="text-[10px] text-[#555E74] block">{sim.subCategory}</span>
                    <span className="text-[10px] text-[#006765] font-semibold">{sim.priceLevel} • {sim.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

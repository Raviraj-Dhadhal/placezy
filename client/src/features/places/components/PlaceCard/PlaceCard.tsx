import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Place } from '../../../utils/mockData';
import { Badge } from '../common/Badge';
import { Star, Heart } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  showMatch?: boolean;
  showRatingTag?: boolean;
  onWishlistToggle?: (id: string) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  showMatch = true,
  onWishlistToggle,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/place/${place.id}`)}
      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#006765]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all group flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* 16:10 Aspect Ratio Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={place.coverImage}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Left: SubCategory Badge with clean WHITE background matching Figma */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="white" size="sm" className="font-semibold text-[#151C27]">
              {place.subCategory}
            </Badge>
          </div>

          {/* Top Right: Wishlist Heart & Match Percentage */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {showMatch && (
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                {place.matchPercentage}% Match
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWishlistToggle?.(place.id);
              }}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#555E74] hover:text-red-500 transition-colors shadow-sm"
            >
              <Heart
                size={14}
                className={place.isWishlisted ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
          </div>

          {/* Bottom Left: Opening Status Tag on Image (matching Screen 06 & 07) */}
          <div className="absolute bottom-2.5 left-3">
            <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {place.openingStatus}
            </span>
          </div>
        </div>

        {/* Content Block */}
        <div className="p-3.5 space-y-2">
          {/* Title & Reviews */}
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-[#151C27] line-clamp-1 group-hover:text-[#006765] transition-colors">
              {place.name}
            </h3>
            <p className="text-[11px] text-[#555E74] line-clamp-1">{place.location}</p>
          </div>

          <p className="text-xs text-[#555E74] line-clamp-2 leading-relaxed">
            {place.tagline}
          </p>
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="px-3.5 pb-3.5 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#555E74]">
        <span className="flex items-center gap-1 font-bold text-[#151C27]">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {place.rating} ({place.reviewsCount})
        </span>

        <span className="font-medium text-[#151C27]">{place.priceLevel}</span>

        <span className="text-[11px] font-medium text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
          {place.distance}
        </span>
      </div>
    </div>
  );
};

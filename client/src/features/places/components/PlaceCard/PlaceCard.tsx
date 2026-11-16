import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Place } from '../../../../types';
import { Badge } from '../../../../components/ui/Badge';
import { Star, Heart } from 'lucide-react';
import api from '../../../../services/api';
import { useAuth } from '../../../../context/AuthContext';

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
  const { isAuthenticated } = useAuth();
  const targetId = (place.id || place._id || place.slug || '') as string;
  const [isSaved, setIsSaved] = useState(!!place.isWishlisted);
  const [toastMessage, setToastMessage] = useState('');

  // Sync state if place prop updates
  React.useEffect(() => {
    setIsSaved(!!place.isWishlisted);
  }, [place.isWishlisted]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please log in first to save places to your wishlist.');
      navigate('/login');
      return;
    }

    try {
      const res = await api.post(`/wishlist/toggle/${targetId}`);
      const newStatus = res.data?.data?.saved ?? !isSaved;
      setIsSaved(newStatus);
      const msg = newStatus
        ? `Added "${place.name}" to your wishlist!`
        : `Removed "${place.name}" from your wishlist.`;
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 3000);
      onWishlistToggle?.(targetId);
    } catch (err) {
      console.error('Wishlist toggle error:', err);
      const fallback = !isSaved;
      setIsSaved(fallback);
      setToastMessage(fallback ? `Added "${place.name}" to wishlist!` : `Removed from wishlist.`);
      setTimeout(() => setToastMessage(''), 3000);
      onWishlistToggle?.(targetId);
    }
  };

  return (
    <div
      onClick={() => navigate(`/place/${place.slug || place.id || place._id}`)}
      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#006765]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all group flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* 16:10 Aspect Ratio Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={place.coverImage || place.imageUrl || (place.images && place.images[0]) || '/logo.svg'}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Left: SubCategory Badge with clean WHITE background matching Figma */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="white" size="sm" className="font-semibold text-[#151C27]">
              {place.subCategory || place.category}
            </Badge>
          </div>

          {/* Top Right: Wishlist Heart & Match Percentage */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {showMatch && (
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                {place.matchPercentage || 92}% Match
              </span>
            )}
            <button
              onClick={handleToggleWishlist}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#555E74] hover:text-red-500 transition-colors shadow-sm"
            >
              <Heart
                size={14}
                className={isSaved ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
          </div>

          {toastMessage && (
            <div className="absolute top-12 right-3 z-30 bg-[#151C27] text-white text-[10px] font-medium px-2.5 py-1 rounded-lg shadow-lg animate-in fade-in">
              {toastMessage}
            </div>
          )}

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
            <p className="text-[11px] text-[#555E74] line-clamp-1">{typeof place.location === 'string' ? place.location : (place.address || place.city)}</p>
          </div>

          <p className="text-xs text-[#555E74] line-clamp-2 leading-relaxed">
            {place.tagline || place.description}
          </p>
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="px-3.5 pb-3.5 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#555E74]">
        <span className="flex items-center gap-1 font-bold text-[#151C27]">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {place.rating} ({place.reviewsCount || place.reviewCount || 0})
        </span>

        <span className="font-medium text-[#151C27]">{place.priceLevel || place.priceRange || '₹₹'}</span>

        <span className="text-[11px] font-medium text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
          {place.distance || (place.distanceKm ? `${place.distanceKm} km` : 'Near you')}
        </span>
      </div>
    </div>
  );
};

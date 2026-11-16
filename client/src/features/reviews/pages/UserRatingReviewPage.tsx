import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { placesApi } from '../../places/services/placesService';
import type { Place } from '../../../types';
import api from '../../../services/api';
import { Button } from '../../../components/ui/Button';
import { Avatar } from '../../../components/ui/Avatar';
import {
  ArrowLeft,
  Star,
  Camera,
  CheckCircle
} from 'lucide-react';

export const UserRatingReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);

  const [rating, setRating] = useState(5);
  const [foodRating] = useState(5);
  const [ambienceRating] = useState(5);
  const [serviceRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      placesApi.getById(id).then((data) => {
        if (data) setPlace(data);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await api.post('/reviews/submit', {
        placeId: id,
        rating,
        content: reviewText,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!place) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#006765] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-[#555E74]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-[#151C27] font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Place Details</span>
        </button>

        <div className="flex items-center gap-2">
          <span>Explore</span>
          <span>/</span>
          <span>Rajkot</span>
          <span>/</span>
          <span>{place.name}</span>
          <span>/</span>
          <span className="font-semibold text-[#151C27]">Write a Review</span>
        </div>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#151C27]">
          Rate & Review
        </h1>
        <p className="text-xs text-[#555E74] mt-1">
          Share your experience to help others discover great places across Rajkot's bespoke urban scene.
        </p>
      </div>

      {/* Main Split Grid matching Screen 09 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Review Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
          {/* Place Summary Header */}
          <div className="flex items-center gap-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <img
              src={place.coverImage}
              alt={place.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <span className="text-[10px] text-[#006765] font-semibold bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
                {place.subCategory}
              </span>
              <h3 className="text-sm font-bold text-[#151C27] mt-1">{place.name}</h3>
              <p className="text-xs text-[#555E74]">★ {place.rating} ({place.reviewsCount} reviews) • Visited recently</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
              <CheckCircle size={40} className="text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">Review Submitted Successfully!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you for your contribution. Your review is now published to help the Rajkot community discover authentic local spots.
              </p>
              <div className="pt-2">
                <Button size="md" onClick={() => navigate(`/place/${place.id}`)}>
                  Return to Venue
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Overall Star Rating */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#151C27]">
                    How would you rate this place?
                  </label>
                  <span className="text-xs font-semibold text-[#006765] bg-[#CFE7E6]/50 px-2 py-0.5 rounded-full">
                    Excellent ({rating}.0)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={28}
                        className={
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-[#CBD5E1]'
                        }
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#555E74] ml-2">Tap to adjust rating</span>
                </div>
              </div>

              {/* Sub-Criteria Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs text-[#555E74] font-medium">Food & Coffee</span>
                  <span className="text-xs font-bold text-[#006765]">{foodRating}/5 ★</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs text-[#555E74] font-medium">Ambience</span>
                  <span className="text-xs font-bold text-[#006765]">{ambienceRating}/5 ★</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                  <span className="text-xs text-[#555E74] font-medium">Service</span>
                  <span className="text-xs font-bold text-[#006765]">{serviceRating}/5 ★</span>
                </div>
              </div>

              {/* Written Review */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#151C27]">
                    Write your review
                  </label>
                  <span className="text-xs text-[#8E98B0]">{reviewText.length}/1000 characters</span>
                </div>
                <textarea
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#151C27] focus:outline-none focus:border-[#006765] leading-relaxed resize-none"
                  placeholder="Share details about the courtyard, dishes recommended, music, and service..."
                  required
                />
              </div>

              {/* Add Photos Dropzone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#151C27]">
                  Add photos to your review (Optional)
                </label>
                <div className="border-2 border-dashed border-[#CFE7E6] hover:border-[#006765] bg-[#F8FAFC] rounded-2xl p-6 text-center cursor-pointer transition-colors space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#CFE7E6]/50 text-[#006765] flex items-center justify-center mx-auto">
                    <Camera size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#151C27]">
                      Drop your photos here, or <span className="text-[#006765] underline">browse files</span>
                    </span>
                    <p className="text-[10px] text-[#8E98B0] mt-0.5">PNG, JPG up to 10MB (Optional)</p>
                  </div>
                </div>

                {/* Attached Photo Thumbnails */}
                <div className="flex items-center gap-2 pt-1">
                  <img
                    src="/images/places/kavita-tea.jpg"
                    alt="Photo 1"
                    className="w-14 h-14 rounded-lg object-cover border border-[#E2E8F0]"
                  />
                  <img
                    src="/images/places/grand-courtyard.jpg"
                    alt="Photo 2"
                    className="w-14 h-14 rounded-lg object-cover border border-[#E2E8F0]"
                  />
                  <div className="w-14 h-14 rounded-lg border border-dashed border-[#CBD5E1] flex flex-col items-center justify-center text-[#555E74] hover:bg-[#F0F3FF] cursor-pointer">
                    <span className="text-lg leading-none">+</span>
                    <span className="text-[9px]">Add more</span>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-3">
                  <Button type="submit" size="md">
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </div>
                <span className="text-[11px] text-[#8E98B0]">
                  Your review will be shared publicly to help the Rajkot explorer community.
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Rating Overview & Recent Community Feedback */}
        <div className="space-y-6">
          {/* Rating Breakdown card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151C27]">Rating Overview</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-serif text-[#151C27]">4.8</span>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-[#555E74]">840 total ratings</span>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-1.5 text-xs text-[#555E74]">
              {[
                { stars: 5, pct: '82%' },
                { stars: 4, pct: '14%' },
                { stars: 3, pct: '3%' },
                { stars: 2, pct: '1%' },
                { stars: 1, pct: '0%' },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="w-3">{row.stars}</span>
                  <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      style={{ width: row.pct }}
                      className="h-full bg-[#006765] rounded-full"
                    ></div>
                  </div>
                  <span className="w-8 text-right text-[10px]">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews Preview */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#151C27]">Recent Reviews</h3>
              <span className="text-xs text-[#006765] font-semibold cursor-pointer">Most Helpful</span>
            </div>

            <div className="space-y-4 divide-y divide-[#F1F5F9]">
              {(place.description ? [
                {
                  id: 'r1',
                  userName: 'Ananya S.',
                  userGender: 'female',
                  date: 'Recently verified',
                  comment: 'Impeccable atmosphere and wonderful hospitality in Rajkot.'
                }
              ] : []).map((rev: any) => (
                <div key={rev.id} className="pt-3 first:pt-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Avatar gender={rev.userGender} size={28} />
                    <div>
                      <h4 className="text-xs font-bold text-[#151C27]">{rev.userName}</h4>
                      <span className="text-[10px] text-[#555E74]">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#555E74] line-clamp-2 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

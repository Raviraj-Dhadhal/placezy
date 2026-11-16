import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { placesApi } from '../../places/services/placesService';
import type { Place, Review } from '../../../types';
import api from '../../../services/api';
import { Button } from '../../../components/ui/Button';
import { Avatar } from '../../../components/ui/Avatar';
import {
  ArrowLeft,
  Star,
  Camera,
  CheckCircle,
  X,
  UploadCloud,
  Loader2
} from 'lucide-react';

export const UserRatingReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [rating, setRating] = useState(5);
  const [foodRating] = useState(5);
  const [ambienceRating] = useState(5);
  const [serviceRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      placesApi.getById(id).then((data) => {
        if (data) setPlace(data);
      });
    }
    if (!id) return;
    const cleanId = decodeURIComponent(id.trim());

    placesApi.getById(cleanId).then((data) => {
      if (data) setPlace(data);
    });

    api.get(`/reviews/place/${cleanId}`)
      .then((res) => {
        if (res.data?.data) {
          setReviews(res.data.data);
        }
      })
      .catch((err) => console.warn('Could not load reviews:', err));
  }, [id]);

  // Dynamic Rating Breakdown & Stats calculated from database
  const { totalRatingsCount, averageRating, ratingDistribution } = useMemo(() => {
    const totalCount = place?.reviewsCount !== undefined && place?.reviewsCount > 0
      ? place.reviewsCount
      : reviews.length;

    let avg = '0.0';
    if (place?.rating) {
      avg = Number(place.rating).toFixed(1);
    } else if (reviews.length > 0) {
      avg = (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1);
    }

    const dist = [5, 4, 3, 2, 1].map((stars) => {
      const matchCount = reviews.filter((r) => Math.round(r.rating) === stars).length;
      let pct = 0;
      if (reviews.length > 0) {
        pct = Math.round((matchCount / reviews.length) * 100);
      } else if (place?.rating) {
        // If place has an overall rating seeded but individual reviews haven't been approved yet
        const r = Math.round(place.rating);
        if (stars === r) pct = 80;
        else if (stars === r - 1) pct = 20;
      }
      return {
        stars,
        count: matchCount,
        pct: `${pct}%`,
      };
    });

    return { totalRatingsCount: totalCount, averageRating: avg, ratingDistribution: dist };
  }, [place, reviews]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const res = await api.post('/reviews/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data?.data?.urls) {
        setUploadedImages((prev) => [...prev, ...res.data.data.urls]);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to upload images.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await api.post('/reviews/submit', {
        placeId: id,
        rating,
        foodRating,
        ambienceRating,
        serviceRating,
        content: reviewText,
        images: uploadedImages,
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
                Thank you for your contribution! Your review and photos have been stored in the database. Once approved by the admin, it will appear publicly on the venue's live page.
              </p>
              <div className="pt-2">
                <Button size="md" onClick={() => navigate(`/place/${place.slug || place.id}`)}>
                  Return to Venue
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {errorMessage}
                </div>
              )}
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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#151C27]">
                    Add photos to your review (Optional)
                  </label>
                  <span className="text-xs text-[#8E98B0]">{uploadedImages.length}/5 photos</span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  multiple
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#CFE7E6] hover:border-[#006765] bg-[#F8FAFC] rounded-2xl p-6 text-center cursor-pointer transition-colors space-y-2"
                >
                  <div className="w-10 h-10 rounded-full bg-[#CFE7E6]/50 text-[#006765] flex items-center justify-center mx-auto">
                    {uploading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Camera size={20} />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#151C27]">
                      {uploading
                        ? 'Uploading photos to server...'
                        : <>Drop your photos here, or <span className="text-[#006765] underline">browse files</span></>}
                    </span>
                    <p className="text-[10px] text-[#8E98B0] mt-0.5">PNG, JPG, WEBP up to 5MB each</p>
                  </div>
                </div>

                {/* Uploaded Photo Thumbnails */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    {uploadedImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative group w-16 h-16 rounded-xl overflow-hidden border border-[#CBD5E1] bg-white shadow-xs"
                      >
                        <img
                          src={imgUrl}
                          alt={`Review photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove photo"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {uploadedImages.length < 5 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-16 h-16 rounded-xl border-2 border-dashed border-[#CBD5E1] hover:border-[#006765] flex flex-col items-center justify-center text-[#555E74] hover:bg-[#F0F3FF] cursor-pointer transition-colors"
                      >
                        <span className="text-lg leading-none">+</span>
                        <span className="text-[9px]">Add more</span>
                      </button>
                    )}
                  </div>
                )}
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
              <span className="text-3xl font-bold font-serif text-[#151C27]">{averageRating}</span>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i <= Math.round(Number(averageRating))
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#CBD5E1]'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-[#555E74]">{totalRatingsCount} total ratings</span>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-1.5 text-xs text-[#555E74]">
              {ratingDistribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="w-3">{row.stars}</span>
                  <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      style={{ width: row.pct }}
                      className="h-full bg-[#006765] rounded-full transition-all duration-300"
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
              {reviews.length > 0 && (
                <span className="text-xs text-[#006765] font-semibold">Verified Feedback</span>
              )}
            </div>

            <div className="space-y-4 divide-y divide-[#F1F5F9]">
              {reviews.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#555E74] space-y-1">
                  <Star size={22} className="mx-auto text-amber-400 fill-amber-400/20 mb-1" />
                  <p className="font-semibold text-[#151C27]">No reviews yet for this venue</p>
                  <p className="text-[11px] text-[#8E98B0]">Be the very first explorer to rate and review it!</p>
                </div>
              ) : (
                reviews.slice(0, 3).map((rev: Review) => (
                  <div key={rev.id || (rev as any)._id} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar gender={rev.userGender || 'female'} size={28} name={rev.userName} />
                        <div>
                          <h4 className="text-xs font-bold text-[#151C27]">{rev.userName}</h4>
                          <span className="text-[10px] text-[#555E74]">
                            {rev.date || (rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified Diner')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star size={12} className="fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#555E74] line-clamp-2 leading-relaxed">
                      "{rev.content || rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

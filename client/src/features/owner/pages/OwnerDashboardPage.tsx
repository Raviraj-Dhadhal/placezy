import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import { ownerApi } from '../services/ownerService';
import type { Place, Review } from '../../../types';
import {
  TrendingUp,
  Eye,
  Bookmark,
  MessageSquare,
  Star,
  Plus,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Store
} from 'lucide-react';

export const OwnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [listings, setListings] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load: listings & reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, reviewsData] = await Promise.all([
          ownerApi.getListings(),
          ownerApi.getReviews(),
        ]);
        setListings(listingsData || []);
        setReviews(reviewsData || []);
      } catch (err) {
        console.error('Error fetching owner dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch / sync analytics whenever timeRange changes (matching OwnerAnalyticsPage exactly)
  useEffect(() => {
    ownerApi.getAnalytics(timeRange)
      .then((data) => {
        setAnalytics(data);
      })
      .catch((err) => {
        console.error('Error fetching dashboard analytics:', err);
      });
  }, [timeRange]);

  const primaryListing = listings[0];
  const totalReviewsCount = analytics?.totalReviews ?? listings.reduce((acc, curr) => acc + (curr.reviewsCount || 0), 0);
  const avgRating = analytics?.averageRating ? Number(analytics.averageRating).toFixed(1) : (listings.length > 0 ? (listings.reduce((acc, curr) => acc + (curr.rating || 0), 0) / listings.length).toFixed(1) : '4.8');
  const totalViews = analytics?.totalViews ?? (listings.length > 0 ? listings.length * 1420 + 250 : 14820);
  const totalVisits = analytics?.profileVisits ?? Math.round(totalViews * 0.435);
  const totalSaves = analytics?.wishlistSaves ?? Math.round(totalViews * 0.063);
  const label = analytics?.label || 'vs last month';
  const peakDay = analytics?.peakDay || 'Oct 22';

  const metrics = [
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      change: `+18% ${label}`,
      positive: true,
      icon: <Eye size={18} className="text-[#006765]" />,
    },
    {
      title: 'Listing Visits',
      value: totalVisits.toLocaleString(),
      change: `+12% ${label}`,
      positive: true,
      icon: <TrendingUp size={18} className="text-blue-600" />,
    },
    {
      title: 'Wishlist Saves',
      value: totalSaves.toLocaleString(),
      change: `+24% ${label}`,
      positive: true,
      icon: <Bookmark size={18} className="text-purple-600" />,
    },
    {
      title: 'Average Rating',
      value: `${avgRating} ★`,
      change: `Based on ${totalReviewsCount} reviews`,
      positive: true,
      icon: <Star size={18} className="text-amber-500 fill-amber-500" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner matching Screen 02 Module 02 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-serif text-[#151C27]">
              Welcome back, {user?.name || 'Partner'}!
            </h1>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Verified Merchant • {listings.length} {listings.length === 1 ? 'Venue' : 'Venues'} Active
            </span>
          </div>
          <p className="text-xs text-[#555E74] mt-1">
            Here's how your business is performing across the {user?.city || 'Rajkot'}, Gujarat territory.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            size="sm"
            variant="outline"
            icon={<Camera size={14} />}
            onClick={() => navigate('/owner/photos')}
          >
            Add Photos
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/owner/listings')}
          >
            Edit Listing
          </Button>

          <Button
            size="sm"
            onClick={() => navigate('/owner/reviews')}
          >
            View Reviews
          </Button>
        </div>
      </div>

      {/* 4 Metric KPI Cards matching Screen 02 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.title} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#555E74]">{m.title}</span>
              <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                {m.icon}
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#151C27] block font-serif">{m.value}</span>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                <ArrowUpRight size={12} />
                <span>{m.change}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Grid: Charts & Reviews Left, Listing Snippet Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Performance Chart + Recent Reviews */}
        <div className="lg:col-span-8 space-y-6">
          {/* Performance Trend Chart Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Business Performance</h3>
                <span className="text-[10px] text-[#555E74]">Views and customer visit inquiries over time</span>
              </div>

              <div className="flex items-center gap-1 text-xs">
                {['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'This Year'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      timeRange === t
                        ? 'bg-[#006765] text-white shadow-xs'
                        : 'text-[#555E74] hover:bg-[#F0F3FF]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Stylized SVG Area Chart representation */}
            <div className="h-56 w-full relative flex items-end pt-6 pb-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                <defs>
                  <linearGradient id="ownerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#006765" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#006765" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <path
                  d="M 0 120 Q 80 80, 160 100 T 320 40 T 500 60 L 500 160 L 0 160 Z"
                  fill="url(#ownerGrad)"
                />
                {/* Line */}
                <path
                  d="M 0 120 Q 80 80, 160 100 T 320 40 T 500 60"
                  stroke="#006765"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Active marker dot at peak */}
                <circle cx="320" cy="40" r="5" fill="#006765" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* Tooltip bubble at peak matching selected range */}
              <div className="absolute top-2 left-[58%] bg-[#151C27] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md pointer-events-none flex items-center gap-1.5">
                <span>Peak: {peakDay}</span>
                <span className="text-[#CFE7E6]">({Math.round(totalViews * 0.12).toLocaleString()} views)</span>
              </div>
            </div>

            {/* Chart Summary Metrics matching Analytics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F1F5F9] text-center">
              <div>
                <span className="text-[10px] text-[#555E74] block">Peak Activity</span>
                <span className="text-xs font-bold text-[#151C27]">{peakDay}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E74] block">Avg. Daily Views</span>
                <span className="text-xs font-bold text-[#151C27]">
                  {Math.round(
                    timeRange === 'Last 7 Days'
                      ? totalViews / 7
                      : timeRange === 'Last 3 Months'
                      ? totalViews / 90
                      : timeRange === 'This Year'
                      ? totalViews / 365
                      : totalViews / 30
                  ).toLocaleString()} / day
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E74] block">Inquiry Conversion</span>
                <span className="text-xs font-bold text-[#006765]">
                  {totalViews > 0 ? ((totalVisits / totalViews) * 100).toFixed(1) : '30.7'}% CTR
                </span>
              </div>
            </div>
          </div>

          {/* Recent Reviews Snippet */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#151C27]">Recent Customer Reviews</h3>
                <span className="text-[10px] text-[#555E74]">Verified feedback from diners and remote workers in {user?.city || 'Rajkot'}</span>
              </div>
              <button
                onClick={() => navigate('/owner/reviews')}
                className="text-xs text-[#006765] font-semibold hover:underline"
              >
                View All Reviews ({reviews.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {reviews.length > 0 ? (
                reviews.slice(0, 2).map((r) => (
                  <div key={r.id || (r as any)._id} className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#006765] text-white text-xs font-bold flex items-center justify-center">
                          {r.userName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#151C27]">{r.userName}</h4>
                          <span className="text-[10px] text-[#555E74]">
                            ★ {r.rating} • {typeof r.placeId === 'object' ? (r.placeId as any).name : 'Venue'}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate('/owner/reviews')}>
                        Reply
                      </Button>
                    </div>
                    <p className="text-xs text-[#555E74] leading-relaxed">
                      "{r.content}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#555E74]">
                  No reviews posted for your venues yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Business Card + Inquiries + Action Checklist */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Listing Card matching Screen 02 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            {primaryListing ? (
              <>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                  <img
                    src={primaryListing.imageUrl || primaryListing.coverImage || '/images/places/grand-courtyard.jpg'}
                    alt={primaryListing.name}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-2.5 right-2.5 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    primaryListing.isVerified ? 'bg-emerald-700' : 'bg-amber-600'
                  }`}>
                    {primaryListing.isVerified ? '• Verified' : '• Pending Approval'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#151C27]">{primaryListing.name}</h3>
                  <p className="text-xs text-[#555E74] mt-0.5">{primaryListing.category} • {primaryListing.address || primaryListing.city}</p>
                  <div className="flex items-center gap-2 text-xs text-[#555E74] mt-1.5">
                    <span className="font-bold text-[#151C27]">★ {primaryListing.rating || '5.0'} ({primaryListing.reviewsCount || 0} reviews)</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{primaryListing.openingStatus || 'Open Now'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
                  <Button size="sm" variant="outline" onClick={() => navigate('/owner/listings')}>
                    Edit Listing
                  </Button>
                  <Button size="sm" onClick={() => navigate(`/place/${primaryListing.slug || primaryListing.id || (primaryListing as any)._id}`)}>
                    View Public Page
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-2">
                <Store size={28} className="mx-auto text-[#006765]" />
                <h4 className="text-xs font-bold text-[#151C27]">No active business listing yet</h4>
                <p className="text-[11px] text-[#555E74]">Register your first venue to view real-time customer insights.</p>
                <Button size="sm" onClick={() => navigate('/owner/register')}>
                  Register Venue
                </Button>
              </div>
            )}
          </div>

          {/* Top Customer Inquiries */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Top Customer Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Free High-Speed Wi-Fi</span>
                <span className="font-bold text-[#151C27]">88%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Valet Parking</span>
                <span className="font-bold text-[#151C27]">76%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Outdoor Seating</span>
                <span className="font-bold text-[#151C27]">64%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#555E74]">Quiet Workspaces</span>
                <span className="font-bold text-[#151C27]">59%</span>
              </div>
            </div>
          </div>

          {/* Action Items Checklist */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
              Action Items
            </h4>
            <div className="space-y-1.5 text-xs">
              <div
                onClick={() => navigate('/owner/photos')}
                className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F0F3FF] cursor-pointer flex items-center justify-between"
              >
                <span>Upload New Photos (6/20 used)</span>
                <ChevronRight size={14} className="text-[#8E98B0]" />
              </div>
              <div
                onClick={() => navigate('/owner/reviews')}
                className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F0F3FF] cursor-pointer flex items-center justify-between"
              >
                <span>Respond to Unread Reviews (2)</span>
                <ChevronRight size={14} className="text-[#8E98B0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

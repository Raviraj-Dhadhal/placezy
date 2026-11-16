import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { ownerApi } from '../services/ownerService';
import {
  Star,
  MessageSquare,
  Search,
  Filter,
  Check,
  Flag
} from 'lucide-react';

export const OwnerReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<{ [id: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    ownerApi.getReviews().then((data) => {
      setReviews(data || []);
    }).finally(() => setLoading(false));
  }, []);

  const handlePostReply = async (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text || !text.trim()) return;
    try {
      await ownerApi.replyReview(reviewId, text);
      alert('Your official response has been published!');
      const updated = await ownerApi.getReviews();
      setReviews(updated || []);
      setActiveReplyId(null);
    } catch (err) {
      console.error('Failed to post reply:', err);
      alert('Failed to save reply.');
    }
  };

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / totalReviews).toFixed(1)
    : '0.0';
  const pendingReplies = reviews.filter((r) => !r.ownerReply).length;
  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;
  const satisfactionRate = totalReviews > 0 ? Math.round((positiveReviews / totalReviews) * 100) : 100;

  const filteredReviews = reviews.filter((r) => {
    if (filterRating !== 'all' && Math.floor(r.rating) !== Number(filterRating)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const placeName = typeof r.placeId === 'object' ? r.placeId.name?.toLowerCase() : '';
      return (
        r.userName?.toLowerCase().includes(q) ||
        r.content?.toLowerCase().includes(q) ||
        placeName.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Customer Reviews</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Customer Reviews
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Monitor, analyze, and respond to customer feedback across your listed Rajkot locations.
          </p>
        </div>
      </div>

      {/* Review Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">AVERAGE RATING</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-bold font-serif text-[#151C27]">{avgRating}</span>
            <span className="text-xs text-[#555E74]">/ 5.0</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={13} className={i <= Math.round(Number(avgRating)) ? 'fill-amber-400' : 'text-gray-300'} />
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">TOTAL REVIEWS</span>
          <span className="text-3xl font-bold font-serif text-[#151C27] block mt-1">{totalReviews}</span>
          <span className="text-xs text-emerald-700 font-semibold">Live feedback from explorers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">PENDING REPLIES</span>
          <span className="text-3xl font-bold font-serif text-[#006765] block mt-1">{pendingReplies}</span>
          <span className="text-xs text-[#555E74]">Direct merchant engagement</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">CUSTOMER SATISFACTION</span>
          <span className="text-3xl font-bold font-serif text-[#151C27] block mt-1">{satisfactionRate}%</span>
          <span className="text-xs text-[#006765] font-semibold">Positive sentiment (&gt;= 4★)</span>
        </div>
      </div>

      {/* Search & Rating Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E2E8F0]">
        <div className="flex items-center gap-2 w-full sm:w-80 border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs">
          <Search size={14} className="text-[#8E98B0]" />
          <input
            type="text"
            placeholder="Search by customer name, keyword or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-[#151C27]"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto">
          <span className="text-[#555E74] font-medium mr-1">Filter Stars:</span>
          {['all', '5', '4', '3', '2', '1'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRating(r)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterRating === r ? 'bg-[#006765] text-white' : 'text-[#555E74] hover:bg-[#F0F3FF]'
              }`}
            >
              {r === 'all' ? 'All' : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Interactive List with Direct Database Driven Rendering */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#555E74]">
            Loading customer reviews from database...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <MessageSquare size={32} className="mx-auto text-[#006765]" />
            <h3 className="text-sm font-bold text-[#151C27]">No customer reviews found</h3>
            <p className="text-xs text-[#555E74]">
              {reviews.length === 0
                ? 'No customer reviews have been submitted for your listed venues yet.'
                : 'No reviews match your search or rating filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((r) => {
              const reviewId = r.id || r._id;
              const placeName = typeof r.placeId === 'object' ? r.placeId.name : 'Your Venue';
              const isReplying = activeReplyId === reviewId;

              return (
                <div key={reviewId} className="p-5 rounded-xl border border-[#E2E8F0] space-y-3 bg-white hover:border-[#CFE7E6] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#151C27] flex items-center gap-2">
                        <span>{r.userName || 'Verified Explorer'}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
                          Verified Explorer
                        </span>
                      </h4>
                      <span className="text-[10px] text-[#555E74]">
                        {placeName} • {new Date(r.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star size={13} className="fill-amber-400" />
                      <span>{Number(r.rating).toFixed(1)}</span>
                    </div>
                  </div>

                  {r.title && <h5 className="text-xs font-bold text-[#151C27]">{r.title}</h5>}

                  <p className="text-xs text-[#555E74] leading-relaxed">
                    "{r.content}"
                  </p>

                  {/* Existing Owner Reply */}
                  {r.ownerReply ? (
                    <div className="p-3 bg-[#F8FAFC] rounded-lg border-l-2 border-[#006765] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#151C27] text-[11px]">Official Response from Owner</span>
                        <span className="text-[10px] text-[#8E98B0]">
                          {new Date(r.ownerReply.date || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555E74]">
                        "{r.ownerReply.content}"
                      </p>
                    </div>
                  ) : isReplying ? (
                    <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#CFE7E6] space-y-2.5">
                      <span className="text-[11px] font-bold text-[#006765]">
                        Respond as {placeName} Management:
                      </span>
                      <textarea
                        rows={2}
                        placeholder={`Write an official response to ${r.userName}...`}
                        value={replyText[reviewId] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [reviewId]: e.target.value })}
                        className="w-full p-2.5 text-xs bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#006765] resize-none"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#8E98B0]">Replies are public and saved to database.</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setActiveReplyId(null)}>Cancel</Button>
                          <Button size="sm" onClick={() => handlePostReply(reviewId)}>Post Reply</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <Button size="sm" variant="outline" onClick={() => setActiveReplyId(reviewId)}>
                        Write Official Reply
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

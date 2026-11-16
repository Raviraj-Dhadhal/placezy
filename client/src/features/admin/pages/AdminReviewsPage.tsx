import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { adminApi } from '../services/adminService';
import {
  MessageSquareCheck,
  Star,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Trash2
} from 'lucide-react';
import type { Review } from '../../../types';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);
    adminApi
      .getAllReviews()
      .then((data) => {
        setReviews(data || []);
        if (data && data.length > 0) {
          setSelectedReview((prev) => {
            if (!prev) return data[0];
            const found = data.find((r) => (r.id || (r as any)._id) === (prev.id || (prev as any)._id));
            return found || data[0];
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId: string) => {
    try {
      await adminApi.approveReview(reviewId);
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert('Error approving review');
    }
  };

  const handleReject = async (reviewId: string) => {
    try {
      await adminApi.rejectReview(reviewId, 'Content does not meet platform guidelines');
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert('Error rejecting review');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      await adminApi.deleteReview(reviewId);
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert('Error deleting review');
    }
  };

  const totalReviews = reviews.length;
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const avgScore =
    approvedCount > 0
      ? (
          reviews.filter((r) => r.status === 'approved').reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          approvedCount
        ).toFixed(1)
      : '0.0';

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const placeName = typeof r.placeId === 'object' ? (r.placeId as any).name?.toLowerCase() : '';
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
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Reviews
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Review, moderate, and manage user feedback across MongoDB venues.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Reviews</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{totalReviews}</span>
          <span className="text-[10px] text-emerald-700 font-semibold">MongoDB verified feedback</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Pending Moderation</span>
          <span className="text-2xl font-bold font-serif text-amber-600 block mt-1">{pendingCount}</span>
          <span className="text-[10px] text-amber-700 font-semibold">Awaiting admin review</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Approved & Live</span>
          <span className="text-2xl font-bold font-serif text-[#006765] block mt-1">{approvedCount}</span>
          <span className="text-[10px] text-[#006765] font-semibold">Live on place detail pages</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Average Rating</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">★ {avgScore}</span>
          <span className="text-[10px] text-amber-600 font-semibold">Calculated from approved</span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search by author, place, or comment..."
                icon={<Search size={14} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-lg font-semibold capitalize transition-colors ${
                    statusFilter === s ? 'bg-[#006765] text-white shadow-sm' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-12 text-center text-xs text-[#555E74]">Loading reviews from MongoDB...</div>
            ) : filteredReviews.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#555E74]">No reviews found matching filter.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                    <th className="pb-2.5 pl-2">Explorer</th>
                    <th className="pb-2.5">Venue</th>
                    <th className="pb-2.5">Rating</th>
                    <th className="pb-2.5">Review Snippet</th>
                    <th className="pb-2.5 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredReviews.map((r) => {
                    const rId = r.id || (r as any)._id;
                    const placeName = typeof r.placeId === 'object' ? (r.placeId as any).name : 'Rajkot Venue';
                    const isSelected = selectedReview && (selectedReview.id || (selectedReview as any)._id) === rId;
                    return (
                      <tr
                        key={rId}
                        onClick={() => setSelectedReview(r)}
                        className={`hover:bg-[#F0F3FF] cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F0F3FF]/70' : ''
                        }`}
                      >
                        <td className="py-3 pl-2 font-bold text-[#151C27]">{r.userName}</td>
                        <td className="py-3 text-[#555E74] truncate max-w-[120px]">{placeName}</td>
                        <td className="py-3 font-semibold text-amber-500">★ {r.rating}</td>
                        <td className="py-3 text-[#555E74] truncate max-w-[200px]">"{r.content}"</td>
                        <td className="py-3 pr-2 text-right">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              r.status === 'approved'
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                                : r.status === 'pending'
                                ? 'text-amber-700 bg-amber-50 border-amber-200'
                                : 'text-red-700 bg-red-50 border-red-200'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Selected Review Drawer (4 Cols) */}
        {selectedReview && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Review Moderation Detail
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  selectedReview.status === 'approved'
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : selectedReview.status === 'pending'
                    ? 'text-amber-700 bg-amber-50 border-amber-200'
                    : 'text-red-700 bg-red-50 border-red-200'
                }`}
              >
                {selectedReview.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#151C27]">{selectedReview.userName}</h3>
              <p className="text-xs text-[#555E74]">
                Venue: {typeof selectedReview.placeId === 'object' ? (selectedReview.placeId as any).name : 'Rajkot Venue'}
              </p>
              <div className="flex items-center gap-1 text-amber-400 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i <= Math.round(selectedReview.rating) ? 'fill-amber-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-xs font-bold text-[#151C27] ml-1">{selectedReview.rating} / 5.0</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#151C27] leading-relaxed">
              "{selectedReview.content}"
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#F1F5F9] space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(selectedReview.id || (selectedReview as any)._id)}
                >
                  Reject Review
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleApprove(selectedReview.id || (selectedReview as any)._id)}
                >
                  Approve Review
                </Button>
              </div>
              <Button
                size="sm"
                variant="danger"
                fullWidth
                icon={<Trash2 size={13} />}
                onClick={() => handleDelete(selectedReview.id || (selectedReview as any)._id)}
              >
                Delete Permanently
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

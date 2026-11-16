import api from '../../../services/api';
import type { Review } from '../../../types';

export const reviewsApi = {
  // Public approved reviews for a venue
  getByPlace: async (placeId: string): Promise<Review[]> => {
    const res = await api.get(`/reviews/place/${placeId}`);
    return res.data?.data || [];
  },

  // Submit a review (initial status: pending)
  create: async (data: {
    placeId: string;
    rating: number;
    foodRating?: number;
    ambienceRating?: number;
    serviceRating?: number;
    title?: string;
    content: string;
    images?: string[];
    tags?: string[];
  }): Promise<Review> => {
    const res = await api.post('/reviews', data);
    return res.data?.data;
  },

  // Upload review images to disk
  uploadImages: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    const res = await api.post('/reviews/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data?.data?.urls || [];
  },

  // Toggle like on a review
  toggleLike: async (reviewId: string): Promise<Review> => {
    const res = await api.post(`/reviews/${reviewId}/like`);
    return res.data?.data;
  },

  // Current user's reviews (including pending / rejected status)
  getMyReviews: async (): Promise<Review[]> => {
    const res = await api.get('/reviews/my-reviews');
    return res.data?.data || [];
  },
};

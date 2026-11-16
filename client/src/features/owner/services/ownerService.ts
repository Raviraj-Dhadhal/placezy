import api from '../../../services/api';
import type { Place, Review } from '../../../types';

export const ownerApi = {
  getListings: async (): Promise<Place[]> => {
    const res = await api.get('/owner/listings');
    return res.data?.data || [];
  },

  registerBusiness: async (data: Partial<Place>): Promise<Place> => {
    const res = await api.post('/owner/register', data);
    return res.data?.data;
  },

  getReviews: async (): Promise<Review[]> => {
    const res = await api.get('/owner/reviews');
    return res.data?.data || [];
  },

  addPhotos: async (placeId: string, imageUrls: string[]): Promise<Place> => {
    const res = await api.post(`/owner/listings/${placeId}/photos`, { imageUrls });
    return res.data?.data;
  },

  setCoverPhoto: async (placeId: string, imageUrl: string): Promise<Place> => {
    const res = await api.put(`/owner/listings/${placeId}/cover`, { imageUrl });
    return res.data?.data;
  },

  deletePhoto: async (placeId: string, imageUrl: string): Promise<Place> => {
    const res = await api.delete(`/owner/listings/${placeId}/photos`, { data: { imageUrl } });
    return res.data?.data;
  },

  replyReview: async (reviewId: string, content: string): Promise<Review> => {
    const res = await api.post(`/owner/reviews/${reviewId}/reply`, { content });
    return res.data?.data;
  },

  getAnalytics: async (timeRange: string = 'Last 30 Days') => {
    const res = await api.get(`/owner/analytics?timeRange=${encodeURIComponent(timeRange)}`);
    return res.data?.data;
  },
};

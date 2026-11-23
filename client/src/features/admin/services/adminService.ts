import api from '../../../services/api';
import type { Place, User, Review } from '../../../types';

export const adminApi = {
  getMetrics: async () => {
    const res = await api.get('/admin/metrics');
    return res.data?.data;
  },

  getUsers: async (): Promise<User[]> => {
    const res = await api.get('/admin/users');
    return res.data?.data || [];
  },

  createUser: async (userData: any): Promise<User> => {
    const res = await api.post('/admin/users', userData);
    return res.data?.data;
  },

  updateUserStatus: async (userId: string, status: 'active' | 'suspended'): Promise<User> => {
    const res = await api.put(`/admin/users/${userId}/status`, { status });
    return res.data?.data;
  },

  getBusinesses: async (): Promise<Place[]> => {
    const res = await api.get('/admin/businesses');
    return res.data?.data || [];
  },

  createBusiness: async (businessData: any): Promise<Place> => {
    const res = await api.post('/admin/businesses', businessData);
    return res.data?.data;
  },

  verifyBusiness: async (placeId: string, isVerified: boolean): Promise<Place> => {
    const res = await api.put(`/admin/businesses/${placeId}/verify`, { isVerified });
    return res.data?.data;
  },

  getAllReviews: async (status?: string): Promise<Review[]> => {
    const res = await api.get('/admin/reviews', { params: { status } });
    return res.data?.data || [];
  },

  approveReview: async (reviewId: string): Promise<Review> => {
    const res = await api.patch(`/admin/reviews/${reviewId}/approve`);
    return res.data?.data;
  },

  rejectReview: async (reviewId: string, reason: string): Promise<Review> => {
    const res = await api.patch(`/admin/reviews/${reviewId}/reject`, { reason });
    return res.data?.data;
  },

  deleteReview: async (reviewId: string): Promise<{ success: boolean }> => {
    const res = await api.delete(`/admin/reviews/${reviewId}`);
    return res.data?.data;
  },

  getSettings: async () => {
    const res = await api.get('/admin/settings');
    return res.data?.data;
  },

  updateSettings: async (settings: any) => {
    const res = await api.put('/admin/settings', settings);
    return res.data?.data;
  },
};

import api from '../../../services/api';
import type { Place } from '../../../types';

export const wishlistApi = {
  getAll: async (): Promise<Array<{ _id: string; placeId: Place }>> => {
    const res = await api.get('/wishlist');
    return res.data?.data || [];
  },

  toggle: async (placeId: string): Promise<{ saved: boolean }> => {
    const res = await api.post(`/wishlist/toggle/${placeId}`);
    return res.data?.data;
  },
};

import api from '../../../services/api';
import type { Trip } from '../../../types';

export const tripsApi = {
  getAll: async (): Promise<Trip[]> => {
    const res = await api.get('/trips');
    return res.data?.data || [];
  },

  getById: async (id: string): Promise<Trip | null> => {
    const res = await api.get(`/trips/${id}`);
    return res.data?.data || null;
  },

  create: async (data: Partial<Trip>): Promise<Trip> => {
    const res = await api.post('/trips', data);
    return res.data?.data;
  },

  update: async (id: string, data: Partial<Trip>): Promise<Trip> => {
    const res = await api.put(`/trips/${id}`, data);
    return res.data?.data;
  },

  updateStops: async (id: string, places: any[]): Promise<Trip> => {
    const res = await api.put(`/trips/${id}/stops`, { places });
    return res.data?.data;
  },

  delete: async (id: string): Promise<{ deleted: boolean }> => {
    const res = await api.delete(`/trips/${id}`);
    return res.data?.data;
  },
};

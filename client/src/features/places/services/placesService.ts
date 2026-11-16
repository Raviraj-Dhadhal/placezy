import api from '../../../services/api';
import type { Place } from '../../../types';

export const placesApi = {
  // Fetch places with dynamic MongoDB query filters
  getAll: async (params?: {
    category?: string;
    search?: string;
    city?: string;
    priceLevel?: string;
    minRating?: number;
    sort?: string;
  }): Promise<Place[]> => {
    const res = await api.get('/places', { params });
    return res.data?.data || [];
  },

  // Fetch single venue detail by ID
  getById: async (id: string): Promise<Place | null> => {
    const res = await api.get(`/places/${id}`);
    return res.data?.data || null;
  },

  // Geospatial proximity query
  getNearby: async (lat: number, lng: number, radiusKm: number = 30): Promise<Place[]> => {
    const res = await api.get('/places/nearby', {
      params: { lat, lng, radius: radiusKm },
    });
    return res.data?.data || [];
  },

  // Autocomplete search suggestions
  getSuggestions: async (query: string): Promise<Array<{ id: string; name: string; category: string }>> => {
    const res = await api.get('/places/search', { params: { q: query } });
    return res.data?.data || [];
  },

  // Categories taxonomy with aggregated venue counts
  getCategories: async (): Promise<Array<{ id: string; name: string; slug: string; iconName: string; count: number }>> => {
    const res = await api.get('/places/categories');
    return res.data?.data || [];
  },
};

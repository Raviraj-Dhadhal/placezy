import { PlaceModel, IPlace } from './place.model';

export interface PlaceFilters {
  category?: string;
  search?: string;
  city?: string;
  cuisine?: string;
  minRating?: number;
}

export class PlaceService {
  static async getAll(filters: PlaceFilters): Promise<IPlace[]> {
    const query: any = {};
    if (filters.category && filters.category !== 'All') {
      query.category = { $regex: new RegExp(filters.category, 'i') };
    }
    if (filters.search) {
      query.$or = [
        { name: { $regex: new RegExp(filters.search, 'i') } },
        { address: { $regex: new RegExp(filters.search, 'i') } },
      ];
    }
    if (filters.minRating) {
      query.rating = { $gte: filters.minRating };
    }
    return PlaceModel.find(query).sort({ rating: -1 });
  }

  static async getById(id: string): Promise<IPlace | null> {
    return PlaceModel.findById(id);
  }

  static async create(data: Partial<IPlace>): Promise<IPlace> {
    return PlaceModel.create(data);
  }
}

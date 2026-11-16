import { PlaceModel, IPlace } from './place.model';
import { CategoryModel, ICategory } from '../categories/category.model';
import { WishlistModel } from '../wishlist/wishlist.model';
import '../users/user.model';
import mongoose from 'mongoose';

export interface PlaceFilters {
  category?: string;
  search?: string;
  city?: string;
  cuisine?: string;
  minRating?: number;
  priceLevel?: string;
  userId?: string;
}

export class PlaceService {
  static async getAll(filters: PlaceFilters): Promise<any[]> {
    const query: any = {};
    if (filters.category && filters.category !== 'All') {
      query.category = { $regex: new RegExp(`^${filters.category}$`, 'i') };
    }
    if (filters.search) {
      query.$or = [
        { name: { $regex: new RegExp(filters.search, 'i') } },
        { address: { $regex: new RegExp(filters.search, 'i') } },
        { cuisines: { $in: [new RegExp(filters.search, 'i')] } },
      ];
    }
    if (filters.minRating) {
      query.rating = { $gte: Number(filters.minRating) };
    }
    if (filters.priceLevel) {
      query.priceLevel = filters.priceLevel;
    }
    // Only return approved/active venues for public discovery unless explicitly queried
    query.status = 'active';
    const places = await PlaceModel.find(query).sort({ rating: -1 });

    let wishlistedSet = new Set<string>();
    if (filters.userId) {
      const wishlisted = await WishlistModel.find({ userId: filters.userId });
      wishlistedSet = new Set(wishlisted.map((w) => w.placeId.toString()));
    }

    return places.map((p) => {
      const obj: any = p.toObject();
      const pId = p._id.toString();
      const pSlug = p.slug;
      obj.id = pSlug || pId;
      obj._id = pId;
      obj.isWishlisted = filters.userId
        ? wishlistedSet.has(pId) || (pSlug ? wishlistedSet.has(pSlug) : false)
        : false;
      return obj;
    });
  }

  static async getById(id: string, userId?: string): Promise<any | null> {
    if (!id || id === 'undefined' || id === 'null') return null;
    let place: any = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        place = await PlaceModel.findById(id).populate('ownerId', 'name email avatar');
      } catch (e) {
        place = null;
      }
    }
    if (!place) {
      place = await PlaceModel.findOne({
        $or: [
          { slug: id },
          { slug: id.toLowerCase() },
          { name: new RegExp(`^${id}$`, 'i') }
        ]
      }).populate('ownerId', 'name email avatar');
    }
    if (!place) return null;

    const obj: any = place.toObject();
    const pId = place._id.toString();
    const pSlug = place.slug;
    obj.id = pSlug || pId;
    obj._id = pId;

    if (userId) {
      const isWishlisted = await WishlistModel.exists({
        userId,
        placeId: { $in: [place._id, place.slug].filter(Boolean) },
      });
      obj.isWishlisted = !!isWishlisted;
    }
    return obj;
  }

  static async getNearby(lat: number, lng: number, radiusKm: number = 25): Promise<IPlace[]> {
    // Distance approximation using spherical law / Pythagorean bounding for Rajkot region
    const all = await PlaceModel.find({});
    return all
      .map((p) => {
        if (!p.latitude || !p.longitude) return null;
        const dLat = ((p.latitude - lat) * Math.PI) / 180;
        const dLng = ((p.longitude - lng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat * Math.PI) / 180) *
            Math.cos((p.latitude * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = Math.round(6371 * c * 10) / 10;
        const plain = p.toObject();
        plain.distanceKm = distanceKm;
        return plain;
      })
      .filter((p): p is any => p !== null && typeof p.distanceKm === 'number' && p.distanceKm <= radiusKm)
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }

  static async searchSuggestions(q: string): Promise<Array<{ id: string; name: string; category: string }>> {
    if (!q || q.trim() === '') return [];
    const results = await PlaceModel.find({
      name: { $regex: new RegExp(q, 'i') },
    })
      .select('name category')
      .limit(6);
    return results.map((r) => ({ id: r._id.toString(), name: r.name, category: r.category }));
  }

  static async getCategories(): Promise<Array<{ id: string; name: string; slug: string; iconName: string; count: number }>> {
    const categories = await CategoryModel.find({}).sort({ count: -1 });
    if (categories.length > 0) {
      return categories.map((c) => ({
        id: c._id.toString(),
        name: c.name,
        slug: c.slug,
        iconName: c.iconName,
        count: c.count,
      }));
    }

    // Dynamic aggregation if categories collection is empty
    const counts = await PlaceModel.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    return counts.map((item) => ({
      id: item._id,
      name: item._id,
      slug: item._id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      iconName: 'Compass',
      count: item.count,
    }));
  }
}

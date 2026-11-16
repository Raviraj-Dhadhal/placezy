import { PlaceModel } from '../places/place.model';
import { UserModel } from '../users/user.model';
import { ReviewModel } from '../reviews/review.model';
import { SocialService } from '../reviews/social.service';
import { SettingModel } from '../settings/setting.model';

export class OwnerService {
  static async getMyListings(ownerId: string) {
    return PlaceModel.find({ ownerId }).sort({ createdAt: -1 });
  }

  static async registerBusiness(ownerId: string, data: any) {
    // Generate a unique clean slug from the business name
    const rawSlug = (data.name || 'business')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const uniqueSlug = `${rawSlug}-${Date.now().toString().slice(-5)}`;

    const newPlace = await PlaceModel.create({
      ...data,
      slug: data.slug || uniqueSlug,
      ownerId,
      isVerified: false,
      status: 'pending',
      openingStatus: data.openingStatus || 'Open Now',
      rating: data.rating || 4.8,
      reviewsCount: 0,
      matchPercentage: 92,
      city: data.city || 'Rajkot',
    });

    // Also update the registering user's role to 'owner' if they are a regular 'user'
    await UserModel.findByIdAndUpdate(ownerId, { $set: { role: 'owner' } });

    return newPlace;
  }

  static async updateListing(ownerId: string, placeId: string, data: any) {
    return PlaceModel.findOneAndUpdate({ _id: placeId, ownerId }, { $set: data }, { new: true });
  }

  static async addPhotosToListing(ownerId: string, placeId: string, imageUrls: string[]) {
    const place = await PlaceModel.findOne({ _id: placeId, ownerId });
    if (!place) throw new Error('Listing not found or unauthorized');

    const updatedGallery = [...(place.galleryImages || []), ...imageUrls];
    // If venue currently has no cover image or default, use the first uploaded image
    const updatePayload: any = { galleryImages: updatedGallery };
    if (!place.coverImage || place.coverImage.includes('logo.svg')) {
      updatePayload.coverImage = imageUrls[0];
      updatePayload.imageUrl = imageUrls[0];
    }

    return PlaceModel.findByIdAndUpdate(placeId, { $set: updatePayload }, { new: true });
  }

  static async setCoverPhoto(ownerId: string, placeId: string, imageUrl: string) {
    return PlaceModel.findOneAndUpdate(
      { _id: placeId, ownerId },
      { $set: { coverImage: imageUrl, imageUrl } },
      { new: true }
    );
  }

  static async deletePhotoFromListing(ownerId: string, placeId: string, imageUrl: string) {
    const place = await PlaceModel.findOne({ _id: placeId, ownerId });
    if (!place) throw new Error('Listing not found or unauthorized');

    const filtered = (place.galleryImages || []).filter((img) => img !== imageUrl);
    const updatePayload: any = { galleryImages: filtered };
    if (place.coverImage === imageUrl) {
      updatePayload.coverImage = filtered[0] || '/images/places/grand-courtyard.jpg';
      updatePayload.imageUrl = filtered[0] || '/images/places/grand-courtyard.jpg';
    }

    return PlaceModel.findByIdAndUpdate(placeId, { $set: updatePayload }, { new: true });
  }

  static async getOwnerReviews(ownerId: string) {
    const places = await PlaceModel.find({ ownerId }).select('_id');
    const placeIds = places.map((p) => p._id);
    return ReviewModel.find({ placeId: { $in: placeIds }, status: 'approved' }).populate('placeId').sort({ createdAt: -1 });
  }

  static async replyToReview(ownerId: string, reviewId: string, content: string) {
    const review = await ReviewModel.findById(reviewId).populate('placeId');
    if (!review) throw new Error('Review not found');

    const place: any = review.placeId;
    if (!place || place.ownerId?.toString() !== ownerId) {
      throw new Error('Unauthorized to reply to this venue review');
    }

    review.ownerReply = {
      date: new Date(),
      content,
    };
    await review.save();
    return review;
  }

  static async getAnalytics(ownerId: string, timeRange: string = 'Last 30 Days') {
    const listings = await PlaceModel.find({ ownerId });
    const totalListings = listings.length;

    // Fetch approved customer reviews for owner's venues to ensure 100% exact match with Reviews page
    const placeIds = listings.map((p) => p._id);
    const approvedReviews = await ReviewModel.find({ placeId: { $in: placeIds }, status: 'approved' });
    const totalReviews = approvedReviews.length;

    let avgRating = 0;
    if (totalReviews > 0) {
      const sum = approvedReviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
      avgRating = Math.round((sum / totalReviews) * 10) / 10;
    } else {
      // Fallback to average of rated listings
      const ratedListings = listings.filter((p) => p.rating && p.rating > 0);
      if (ratedListings.length > 0) {
        const sum = ratedListings.reduce((acc, curr) => acc + (curr.rating || 0), 0);
        avgRating = Math.round((sum / ratedListings.length) * 10) / 10;
      }
    }

    // Time multiplier based on range
    let multiplier = 1;
    let label = 'vs last month';
    let peakDay = 'Oct 22';
    if (timeRange === 'Last 7 Days') {
      multiplier = 0.25;
      label = 'vs previous 7 days';
      peakDay = 'Sunday';
    } else if (timeRange === 'Last 3 Months') {
      multiplier = 2.8;
      label = 'vs previous quarter';
      peakDay = 'Sep 18';
    } else if (timeRange === 'This Year') {
      multiplier = 10.5;
      label = 'vs previous year';
      peakDay = 'Diwali Week';
    }

    const baseViews = totalListings > 0 ? totalListings * 1140 + 250 : 14820;
    const totalViews = Math.round(baseViews * multiplier);
    const profileVisits = Math.round(totalViews * 0.435);
    const wishlistSaves = Math.max(12, Math.round(totalViews * 0.063));
    const directionRequests = Math.max(8, Math.round(totalViews * 0.122));

    return {
      totalListings,
      totalReviews,
      averageRating: avgRating > 0 ? avgRating : 4.8,
      totalViews,
      profileVisits,
      wishlistSaves,
      directionRequests,
      label,
      peakDay,
      timeRange,
    };
  }
}

export class AdminService {
  static async getDashboardMetrics() {
    const totalUsers = await UserModel.countDocuments({ role: 'user' });
    const totalOwners = await UserModel.countDocuments({ role: 'owner' });
    const totalPlaces = await PlaceModel.countDocuments();
    const verifiedPlaces = await PlaceModel.countDocuments({ isVerified: true });
    const totalReviews = await ReviewModel.countDocuments();
    const pendingReviews = await ReviewModel.countDocuments({ status: 'pending' });

    return {
      totalUsers,
      totalOwners,
      totalPlaces,
      verifiedPlaces,
      pendingVerifications: totalPlaces - verifiedPlaces,
      totalReviews,
      pendingReviews,
    };
  }

  static async getAllUsers() {
    return UserModel.find({}).select('-passwordHash').sort({ createdAt: -1 });
  }

  static async updateUserStatus(userId: string, status: 'active' | 'suspended') {
    return UserModel.findByIdAndUpdate(userId, { status }, { new: true }).select('-passwordHash');
  }

  static async getAllBusinesses() {
    return PlaceModel.find({}).populate('ownerId', 'name email').sort({ createdAt: -1 });
  }

  static async verifyBusiness(placeId: string, isVerified: boolean) {
    return PlaceModel.findByIdAndUpdate(
      placeId,
      { isVerified, status: isVerified ? 'active' : 'pending' },
      { new: true }
    );
  }

  // ─── ADMIN REVIEW MODERATION WORKFLOW ──────────────────────────────────

  static async getAllReviews(status?: string) {
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    return ReviewModel.find(query).populate('placeId').populate('userId', 'name email').sort({ createdAt: -1 });
  }

  static async approveReview(reviewId: string, adminId: string) {
    return SocialService.approveReview(reviewId, adminId);
  }

  static async rejectReview(reviewId: string, adminId: string, rejectionReason: string) {
    return SocialService.rejectReview(reviewId, adminId, rejectionReason);
  }

  static async deleteReview(reviewId: string) {
    const review = await ReviewModel.findById(reviewId);
    if (review) {
      const placeId = review.placeId.toString();
      await ReviewModel.findByIdAndDelete(reviewId);
      await SocialService.recalculatePlaceRating(placeId);
      return { success: true };
    }
    return { success: false, message: 'Review not found' };
  }

  // ─── ADMIN SYSTEM SETTINGS ─────────────────────────────────────────────

  static async getSystemSettings() {
    const doc = await SettingModel.findOne({ key: 'system_settings' });
    if (doc) return doc.value;
    return {
      territoryName: 'Rajkot City & Saurashtra',
      country: 'India',
      currency: 'INR (₹)',
      language: 'English (with Gujarati locality support)',
      autoApproval: false,
      profanityFilter: true,
      maintenanceMode: false,
    };
  }

  static async updateSystemSettings(settings: any) {
    const doc = await SettingModel.findOneAndUpdate(
      { key: 'system_settings' },
      { $set: { value: settings } },
      { upsert: true, new: true }
    );
    return doc.value;
  }
}

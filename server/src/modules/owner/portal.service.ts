import { PlaceModel } from '../places/place.model';
import { UserModel } from '../users/user.model';
import { ReviewModel } from '../reviews/review.model';

export class OwnerService {
  static async getMyListings(ownerId: string) {
    return PlaceModel.find({ ownerId });
  }

  static async registerBusiness(ownerId: string, data: any) {
    return PlaceModel.create({
      ...data,
      ownerId,
      isVerified: false,
    });
  }

  static async updateListing(ownerId: string, placeId: string, data: any) {
    return PlaceModel.findOneAndUpdate({ _id: placeId, ownerId }, { $set: data }, { new: true });
  }

  static async getOwnerReviews(ownerId: string) {
    const places = await PlaceModel.find({ ownerId }).select('_id');
    const placeIds = places.map((p) => p._id);
    return ReviewModel.find({ placeId: { $in: placeIds } }).sort({ createdAt: -1 });
  }

  static async replyToReview(ownerId: string, reviewId: string, content: string) {
    const review = await ReviewModel.findById(reviewId).populate('placeId');
    if (!review) throw new Error('Review not found');

    const place: any = review.placeId;
    if (!place || place.ownerId.toString() !== ownerId) {
      throw new Error('Unauthorized to reply to this venue review');
    }

    review.ownerReply = {
      date: new Date(),
      content,
    };
    await review.save();
    return review;
  }

  static async getAnalytics(ownerId: string) {
    const listings = await PlaceModel.find({ ownerId });
    const totalListings = listings.length;
    const totalReviews = listings.reduce((acc, curr) => acc + (curr.reviewsCount || 0), 0);
    const avgRating = totalListings > 0
      ? Math.round((listings.reduce((acc, curr) => acc + (curr.rating || 0), 0) / totalListings) * 10) / 10
      : 0;

    return {
      totalListings,
      totalReviews,
      averageRating: avgRating,
      monthlyViews: totalListings * 1420 + 250,
      monthlyInteractions: totalListings * 310 + 64,
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

    return {
      totalUsers,
      totalOwners,
      totalPlaces,
      verifiedPlaces,
      pendingVerifications: totalPlaces - verifiedPlaces,
      totalReviews,
    };
  }

  static async getAllUsers() {
    return UserModel.find({}).select('-passwordHash').sort({ createdAt: -1 });
  }

  static async getAllBusinesses() {
    return PlaceModel.find({}).populate('ownerId', 'name email').sort({ createdAt: -1 });
  }

  static async verifyBusiness(placeId: string, isVerified: boolean) {
    return PlaceModel.findByIdAndUpdate(placeId, { isVerified }, { new: true });
  }

  static async deleteReview(reviewId: string) {
    return ReviewModel.findByIdAndDelete(reviewId);
  }
}

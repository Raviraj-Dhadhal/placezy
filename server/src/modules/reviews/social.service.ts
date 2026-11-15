import { ReviewModel, IReview } from './review.model';
import { PlaceModel } from '../places/place.model';
import { WishlistModel } from '../wishlist/wishlist.model';
import { NotificationModel } from '../notifications/notification.model';
import mongoose from 'mongoose';

export class SocialService {
  // Reviews
  static async createReview(userId: string, userName: string, userAvatar: string | undefined, data: { placeId: string; rating: number; content: string; tags?: string[] }): Promise<IReview> {
    const review = await ReviewModel.create({
      userId,
      placeId: data.placeId,
      userName,
      userAvatar,
      rating: data.rating,
      content: data.content,
      tags: data.tags || [],
    });

    // Recalculate average rating for place
    const reviews = await ReviewModel.find({ placeId: data.placeId });
    const avg = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    await PlaceModel.findByIdAndUpdate(data.placeId, {
      rating: Math.round(avg * 10) / 10,
      reviewsCount: reviews.length,
    });

    return review;
  }

  static async getPlaceReviews(placeId: string): Promise<IReview[]> {
    return ReviewModel.find({ placeId }).sort({ createdAt: -1 });
  }

  static async toggleLikeReview(reviewId: string, userId: string): Promise<IReview | null> {
    const review = await ReviewModel.findById(reviewId);
    if (!review) return null;

    const userObjId = new mongoose.Types.ObjectId(userId);
    const hasLiked = review.likedBy.some((id) => id.equals(userObjId));

    if (hasLiked) {
      review.likedBy = review.likedBy.filter((id) => !id.equals(userObjId));
      review.likes = Math.max(0, review.likes - 1);
    } else {
      review.likedBy.push(userObjId);
      review.likes += 1;
    }
    await review.save();
    return review;
  }

  // Wishlist
  static async toggleWishlist(userId: string, placeId: string): Promise<{ saved: boolean }> {
    const existing = await WishlistModel.findOne({ userId, placeId });
    if (existing) {
      await WishlistModel.deleteOne({ _id: existing._id });
      return { saved: false };
    } else {
      await WishlistModel.create({ userId, placeId });
      return { saved: true };
    }
  }

  static async getUserWishlist(userId: string) {
    return WishlistModel.find({ userId }).populate('placeId');
  }

  // Notifications
  static async getUserNotifications(userId: string) {
    return NotificationModel.find({ userId }).sort({ createdAt: -1 });
  }

  static async markNotificationRead(id: string, userId: string) {
    return NotificationModel.findOneAndUpdate({ _id: id, userId }, { read: true }, { new: true });
  }
}

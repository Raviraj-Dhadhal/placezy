import { ReviewModel, IReview } from './review.model';
import { PlaceModel } from '../places/place.model';
import { WishlistModel } from '../wishlist/wishlist.model';
import { NotificationModel } from '../notifications/notification.model';
import mongoose from 'mongoose';

export class SocialService {
  // ─── REVIEWS WORKFLOW ───────────────────────────────────────────────────

  /**
   * User submits a review:
   * Rule: It enters status: 'pending'. It does NOT update place rating until Admin approves it.
   */
  static async createReview(
    userId: string,
    userName: string,
    userAvatar: string | undefined,
    data: {
      placeId: string;
      rating: number;
      foodRating?: number;
      ambienceRating?: number;
      serviceRating?: number;
      title?: string;
      content: string;
      images?: string[];
      tags?: string[];
    }
  ): Promise<IReview> {
    let place = null;
    if (mongoose.Types.ObjectId.isValid(data.placeId)) {
      place = await PlaceModel.findById(data.placeId);
    }
    if (!place) {
      place = await PlaceModel.findOne({
        $or: [
          { slug: data.placeId },
          { slug: data.placeId.toLowerCase() },
          { name: new RegExp(`^${data.placeId}$`, 'i') },
        ],
      });
    }

    if (!place) {
      throw new Error('Place not found');
    }

    const review = await ReviewModel.create({
      userId,
      placeId: place._id,
      userName,
      userAvatar,
      rating: data.rating,
      foodRating: data.foodRating,
      ambienceRating: data.ambienceRating,
      serviceRating: data.serviceRating,
      title: data.title,
      content: data.content,
      images: data.images || [],
      tags: data.tags || [],
      status: 'pending', // Awaits admin moderation
    });

    // Notify admins/user about new pending review
    await NotificationModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      title: 'Review Submitted',
      message: `Your review for "${place.name}" is submitted and pending moderation.`,
      type: 'review',
    });

    return review;
  }

  /**
   * Public venue detail only retrieves APPROVED reviews
   */
  static async getApprovedPlaceReviews(placeInput: string): Promise<IReview[]> {
    let targetPlaceId: any = placeInput;
    if (!mongoose.Types.ObjectId.isValid(placeInput)) {
      const place = await PlaceModel.findOne({
        $or: [
          { slug: placeInput },
          { slug: placeInput.toLowerCase() },
          { name: new RegExp(`^${placeInput}$`, 'i') }
        ]
      });
      if (place) targetPlaceId = place._id;
    }
    return ReviewModel.find({ placeId: targetPlaceId, status: 'approved' }).sort({ createdAt: -1 });
  }

  /**
   * User checks their own reviews (including pending / rejected status)
   */
  static async getMyReviews(userId: string): Promise<IReview[]> {
    return ReviewModel.find({ userId }).populate('placeId').sort({ createdAt: -1 });
  }

  /**
   * Admin approves a review:
   * Recalculates the place's average rating and total reviews count dynamically.
   */
  static async approveReview(reviewId: string, adminId: string): Promise<IReview | null> {
    const review = await ReviewModel.findByIdAndUpdate(
      reviewId,
      {
        $set: {
          status: 'approved',
          moderatedBy: adminId,
          moderatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (review) {
      await this.recalculatePlaceRating(review.placeId.toString());

      // Notify the user who wrote the review
      await NotificationModel.create({
        userId: review.userId,
        title: 'Review Approved! 🎉',
        message: `Your review has been approved and is now live on Placezy.`,
        type: 'review',
      });
    }

    return review;
  }

  /**
   * Admin rejects a review with an explicit reason
   */
  static async rejectReview(reviewId: string, adminId: string, rejectionReason: string): Promise<IReview | null> {
    const review = await ReviewModel.findByIdAndUpdate(
      reviewId,
      {
        $set: {
          status: 'rejected',
          rejectionReason,
          moderatedBy: adminId,
          moderatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (review) {
      await this.recalculatePlaceRating(review.placeId.toString());

      // Notify user
      await NotificationModel.create({
        userId: review.userId,
        title: 'Review Update',
        message: `Your review could not be published: ${rejectionReason}`,
        type: 'review',
      });
    }

    return review;
  }

  /**
   * Recalculates average rating and review count from all APPROVED reviews only
   */
  static async recalculatePlaceRating(placeId: string): Promise<void> {
    const approvedReviews = await ReviewModel.find({ placeId, status: 'approved' });
    const count = approvedReviews.length;
    let avg = 0;

    if (count > 0) {
      const sum = approvedReviews.reduce((acc, curr) => acc + curr.rating, 0);
      avg = Math.round((sum / count) * 10) / 10;
    }

    await PlaceModel.findByIdAndUpdate(placeId, {
      rating: avg,
      reviewsCount: count,
    });
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

  // ─── WISHLIST WORKFLOW ───────────────────────────────────────────────────

  static async toggleWishlist(userId: string, placeInput: string): Promise<{ saved: boolean }> {
    // Resolve placeId: could be MongoDB _id or slug
    let targetPlaceId: mongoose.Types.ObjectId | null = null;
    if (mongoose.Types.ObjectId.isValid(placeInput)) {
      targetPlaceId = new mongoose.Types.ObjectId(placeInput);
    } else {
      const place = await PlaceModel.findOne({ slug: placeInput });
      if (place) {
        targetPlaceId = place._id as mongoose.Types.ObjectId;
      }
    }

    if (!targetPlaceId) {
      throw new Error('Place not found to wishlist');
    }

    const existing = await WishlistModel.findOne({ userId, placeId: targetPlaceId });
    if (existing) {
      await WishlistModel.deleteOne({ _id: existing._id });
      return { saved: false };
    } else {
      await WishlistModel.create({ userId, placeId: targetPlaceId });
      return { saved: true };
    }
  }

  static async getUserWishlist(userId: string) {
    const list = await WishlistModel.find({ userId }).populate('placeId').sort({ createdAt: -1 });
    return list
      .filter((item) => item.placeId != null)
      .map((item) => {
        const p: any = (item.placeId as any).toObject ? (item.placeId as any).toObject() : item.placeId;
        return {
          ...p,
          id: p._id?.toString() || p.slug,
          isWishlisted: true,
        };
      });
  }

  // ─── NOTIFICATIONS ───────────────────────────────────────────────────────

  static async getUserNotifications(userId: string) {
    return NotificationModel.find({ userId }).sort({ createdAt: -1 });
  }

  static async markNotificationRead(id: string, userId: string) {
    return NotificationModel.findOneAndUpdate({ _id: id, userId }, { read: true }, { new: true });
  }

  static async markAllNotificationsRead(userId: string) {
    return NotificationModel.updateMany({ userId, read: false }, { $set: { read: true } });
  }
}

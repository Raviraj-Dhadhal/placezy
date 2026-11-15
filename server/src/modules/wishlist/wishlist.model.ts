import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  placeId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    placeId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
  },
  { timestamps: true }
);

WishlistSchema.index({ userId: 1, placeId: 1 }, { unique: true });

export const WishlistModel = mongoose.model<IWishlist>('Wishlist', WishlistSchema);

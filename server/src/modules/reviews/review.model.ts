import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  placeId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  tags?: string[];
  ownerReply?: {
    date: Date;
    content: string;
  };
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    placeId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
    ownerReply: {
      date: { type: Date },
      content: { type: String },
    },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

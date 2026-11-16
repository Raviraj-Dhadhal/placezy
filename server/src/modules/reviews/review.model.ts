import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  placeId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userAvatar?: string;
  userGender?: 'female' | 'male';
  rating: number;
  foodRating?: number;
  ambienceRating?: number;
  serviceRating?: number;
  title?: string;
  content: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'flagged' | 'hidden';
  rejectionReason?: string;
  adminNote?: string;
  moderatedBy?: mongoose.Types.ObjectId;
  moderatedAt?: Date;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  tags?: string[];
  ownerReply?: {
    date: Date;
    content: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    placeId: { type: Schema.Types.ObjectId, ref: 'Place', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    userName: { type: String, required: true },
    userAvatar: { type: String },
    userGender: { type: String, enum: ['female', 'male'], default: 'female' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    foodRating: { type: Number, min: 1, max: 5 },
    ambienceRating: { type: Number, min: 1, max: 5 },
    serviceRating: { type: Number, min: 1, max: 5 },
    title: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'flagged', 'hidden'],
      default: 'pending',
      index: true,
    },
    rejectionReason: { type: String },
    adminNote: { type: String },
    moderatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    moderatedAt: { type: Date },
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

// Compound index to query approved reviews fast
ReviewSchema.index({ placeId: 1, status: 1, createdAt: -1 });

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

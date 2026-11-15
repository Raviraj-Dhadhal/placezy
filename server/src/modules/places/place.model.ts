import mongoose, { Schema, Document } from 'mongoose';

export interface IPlace extends Document {
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  address: string;
  city: string;
  imageUrl: string;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  cuisines: string[];
  features: string[];
  isVerified: boolean;
  openingStatus: string;
  phone?: string;
  description?: string;
  distanceKm?: number;
  latitude?: number;
  longitude?: number;
  ownerId?: mongoose.Types.ObjectId;
}

const PlaceSchema = new Schema<IPlace>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    address: { type: String, required: true },
    city: { type: String, default: 'Rajkot' },
    imageUrl: { type: String, required: true },
    priceLevel: { type: String, enum: ['$', '$$', '$$$', '$$$$'], default: '$$' },
    cuisines: [{ type: String }],
    features: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    openingStatus: { type: String, default: 'Open Now' },
    phone: { type: String },
    description: { type: String },
    distanceKm: { type: Number },
    latitude: { type: Number },
    longitude: { type: Number },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const PlaceModel = mongoose.model<IPlace>('Place', PlaceSchema);

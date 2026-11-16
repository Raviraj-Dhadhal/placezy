import mongoose, { Schema, Document } from 'mongoose';
import '../users/user.model';

export interface IPlace extends Document {
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  tagline?: string;
  rating: number;
  reviewsCount: number;
  address: string;
  locationDetails?: string;
  city: string;
  imageUrl: string;
  coverImage: string;
  galleryImages: string[];
  priceLevel: '₹' | '₹₹' | '₹₹₹' | 'Free Entry' | '$' | '$$' | '$$$' | '$$$$';
  cuisines: string[];
  features: string[];
  facilities: string[];
  isVerified: boolean;
  status: 'active' | 'pending' | 'suspended';
  openingStatus: string;
  timings?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  distanceKm?: number;
  latitude?: number;
  longitude?: number;
  location?: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  matchPercentage?: number;
  featured?: boolean;
  trending?: boolean;
  hiddenGem?: boolean;
  ownerId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    category: { type: String, required: true, index: true },
    subCategory: { type: String, default: 'General' },
    tagline: { type: String },
    rating: { type: Number, default: 0, index: true },
    reviewsCount: { type: Number, default: 0 },
    address: { type: String, required: true },
    locationDetails: { type: String },
    city: { type: String, default: 'Rajkot', index: true },
    imageUrl: { type: String, required: true },
    coverImage: { type: String },
    galleryImages: [{ type: String }],
    priceLevel: {
      type: String,
      enum: ['₹', '₹₹', '₹₹₹', 'Free Entry', '$', '$$', '$$$', '$$$$'],
      default: '₹₹',
    },
    cuisines: [{ type: String }],
    features: [{ type: String }],
    facilities: [{ type: String }],
    isVerified: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['active', 'pending', 'suspended'],
      default: 'active',
      index: true,
    },
    openingStatus: { type: String, default: 'Open Now' },
    timings: { type: String, default: '9:00 AM – 10:00 PM' },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    description: { type: String },
    distanceKm: { type: Number },
    latitude: { type: Number },
    longitude: { type: Number },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [70.8022, 22.3039] }, // [lng, lat]
    },
    matchPercentage: { type: Number, default: 85 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    hiddenGem: { type: Boolean, default: false },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Geospatial 2dsphere index for radius/nearby queries
PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ name: 'text', address: 'text', description: 'text' });

export const PlaceModel = mongoose.model<IPlace>('Place', PlaceSchema);

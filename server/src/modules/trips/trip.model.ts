import mongoose, { Schema, Document } from 'mongoose';

export interface ITripPlace {
  placeId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  dayNumber: number;
  time?: string;
  imageUrl?: string;
  address?: string;
}

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelersCount: number;
  pace?: string;
  interests?: string[];
  coverImage?: string;
  stopsCount: number;
  places: ITripPlace[];
  createdAt: Date;
}

const TripSchema = new Schema<ITrip>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    destination: { type: String, default: 'Rajkot, Gujarat' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    durationDays: { type: Number, default: 3 },
    travelersCount: { type: Number, default: 1 },
    pace: { type: String, default: 'Balanced' },
    interests: [{ type: String }],
    coverImage: { type: String, default: '/images/places/heritage-khambhalida.png' },
    stopsCount: { type: Number, default: 0 },
    places: [
      {
        placeId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        dayNumber: { type: Number, default: 1 },
        time: { type: String },
        imageUrl: { type: String },
        address: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const TripModel = mongoose.model<ITrip>('Trip', TripSchema);

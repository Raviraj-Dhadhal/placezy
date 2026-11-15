import { TripModel, ITrip } from './trip.model';

export class TripService {
  static async createTrip(userId: string, data: Partial<ITrip>): Promise<ITrip> {
    return TripModel.create({
      ...data,
      userId,
      stopsCount: data.places ? data.places.length : 0,
    });
  }

  static async getUserTrips(userId: string): Promise<ITrip[]> {
    return TripModel.find({ userId }).sort({ createdAt: -1 });
  }

  static async getTripById(tripId: string, userId: string): Promise<ITrip | null> {
    return TripModel.findOne({ _id: tripId, userId });
  }

  static async updateTripStops(tripId: string, userId: string, places: any[]): Promise<ITrip | null> {
    return TripModel.findOneAndUpdate(
      { _id: tripId, userId },
      { $set: { places, stopsCount: places.length } },
      { new: true }
    );
  }

  static async deleteTrip(tripId: string, userId: string): Promise<boolean> {
    const res = await TripModel.deleteOne({ _id: tripId, userId });
    return res.deletedCount > 0;
  }
}

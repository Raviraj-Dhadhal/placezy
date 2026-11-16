import { Response, NextFunction } from 'express';
import { TripService } from './trip.service';
import { AuthenticatedRequest } from '../../types';
import { sendResponse } from '../../utils/apiResponse.util';

export class TripController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const trip = await TripService.createTrip(req.user.userId, req.body);
      sendResponse(res, 201, true, 'Trip created successfully', trip);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const trips = await TripService.getUserTrips(req.user.userId);
      sendResponse(res, 200, true, 'Trips retrieved successfully', trips);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const tripId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const trip = await TripService.getTripById(tripId, req.user.userId);
      if (!trip) {
        sendResponse(res, 404, false, 'Trip not found');
        return;
      }
      sendResponse(res, 200, true, 'Trip details retrieved', trip);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const tripId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const trip = await TripService.updateTrip(tripId, req.user.userId, req.body);
      if (!trip) {
        sendResponse(res, 404, false, 'Trip not found');
        return;
      }
      sendResponse(res, 200, true, 'Trip updated successfully', trip);
    } catch (error) {
      next(error);
    }
  }

  static async updateStops(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const tripId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const trip = await TripService.updateTripStops(tripId, req.user.userId, req.body.places || []);
      sendResponse(res, 200, true, 'Trip stops updated successfully', trip);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendResponse(res, 401, false, 'Unauthorized');
        return;
      }
      const tripId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const success = await TripService.deleteTrip(tripId, req.user.userId);
      sendResponse(res, 200, true, success ? 'Trip deleted' : 'Trip not found', { deleted: success });
    } catch (error) {
      next(error);
    }
  }
}

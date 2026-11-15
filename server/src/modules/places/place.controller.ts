import { Request, Response, NextFunction } from 'express';
import { PlaceService } from './place.service';
import { sendResponse } from '../../utils/apiResponse.util';

export class PlaceController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const places = await PlaceService.getAll(req.query);
      sendResponse(res, 200, true, 'Places retrieved successfully', places);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const place = await PlaceService.getById(id);
      if (!place) {
        sendResponse(res, 404, false, 'Place not found');
        return;
      }
      sendResponse(res, 200, true, 'Place details retrieved successfully', place);
    } catch (error) {
      next(error);
    }
  }

  static async getNearby(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lat = parseFloat(req.query.lat as string) || 22.3039; // Rajkot center default
      const lng = parseFloat(req.query.lng as string) || 70.8022;
      const radius = parseFloat(req.query.radius as string) || 50;

      const nearbyPlaces = await PlaceService.getNearby(lat, lng, radius);
      sendResponse(res, 200, true, 'Nearby places retrieved successfully', nearbyPlaces);
    } catch (error) {
      next(error);
    }
  }

  static async searchSuggestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = (req.query.q as string) || '';
      const suggestions = await PlaceService.searchSuggestions(q);
      sendResponse(res, 200, true, 'Suggestions retrieved successfully', suggestions);
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await PlaceService.getCategories();
      sendResponse(res, 200, true, 'Categories taxonomy retrieved successfully', categories);
    } catch (error) {
      next(error);
    }
  }
}

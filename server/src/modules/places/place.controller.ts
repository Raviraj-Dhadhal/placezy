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
}

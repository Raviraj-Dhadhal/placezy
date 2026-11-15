import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthUserPayload } from '../types';

export const generateToken = (payload: AuthUserPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any,
  });
};

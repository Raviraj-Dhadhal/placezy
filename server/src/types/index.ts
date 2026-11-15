import { Request } from 'express';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserPayload;
}

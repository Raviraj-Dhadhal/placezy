import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'owner' | 'admin';
  avatar?: string;
  gender?: 'male' | 'female';
  interests: string[];
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'owner', 'admin'], default: 'user' },
    avatar: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    interests: [{ type: String }],
    city: { type: String, default: 'Rajkot' },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);

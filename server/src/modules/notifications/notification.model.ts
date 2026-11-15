import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'review' | 'system' | 'trip' | 'owner';
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['review', 'system', 'trip', 'owner'], default: 'system' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);

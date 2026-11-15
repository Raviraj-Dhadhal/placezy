import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  iconName: string;
  count: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    iconName: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);

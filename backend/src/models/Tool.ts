import mongoose from 'mongoose';
import { ICategory } from './Category';

export interface ITool extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  category: mongoose.Types.ObjectId | ICategory;
  componentCode: string;
  order: number;
  isActive: boolean;
}

const toolSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  componentCode: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<ITool>('Tool', toolSchema); 
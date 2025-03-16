import mongoose from 'mongoose';

export interface ITool {
  id: string;
  title: string;
  description: string;
}

export interface ICategory extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  color: string;
  tools: ITool[];
}

const toolSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
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
  color: {
    type: String,
    required: true,
    default: '#28a745', // Default green color
  },
  tools: [toolSchema],
}, {
  timestamps: true,
});

export const Category = mongoose.model<ICategory>('Category', categorySchema); 